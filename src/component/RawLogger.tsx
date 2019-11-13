import React, { useState, ReactNode } from 'react';
import Anser, { AnserJsonEntry } from 'anser';
import { escapeCarriageReturn } from 'escape-carriage';
import styles from '../style/log.module.less';
import { Partical } from '../matcher';

const LINK_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

/**
 * Create a class string.
 * @name createClass
 * @function
 * @param {AnserJsonEntry}.
 * @return {String} class name(s)
 */
function createClass(bundle: AnserJsonEntry) {
  let classNames: string = '';

  if (!bundle.bg && !bundle.fg) {
    return '';
  }
  if (bundle.bg) {
    classNames += bundle.bg + ' ';
  }
  if (bundle.fg) {
    classNames += bundle.fg + ' ';
  }

  classNames = classNames.substring(0, classNames.length - 1);
  return classNames;
}

/**
 * Create the style attribute.
 * @name createStyle
 * @function
 * @param {AnserJsonEntry}.
 * @return {Object} returns the style object
 */
function createStyle(bundle: AnserJsonEntry) {
  const style: { backgroundColor?: string; color?: string } = {};
  if (bundle.bg) {
    style.backgroundColor = `rgb(${bundle.bg})`;
  }
  if (bundle.fg) {
    style.color = `rgb(${bundle.fg})`;
  }

  return style;
}

function isEmpty(style: null | object) {
  return !style || Object.keys(style).length === 0
};

function ansiToJSON(input: string, useClasses = false) {
  input = escapeCarriageReturn(input);
  return Anser.ansiToJson(input, {
    json: true,
    remove_empty: true,
    use_classes: useClasses,
  });
}

function convertBundleIntoReact(
  useClasses: boolean,
  linkify: boolean,
  bundle: AnserJsonEntry,
  key: number
) {
  const style = useClasses ? null : createStyle(bundle);
  const className = useClasses ? createClass(bundle) : '';

  let content: ReactNode[] | string = bundle.content;
  if (linkify) {
    content = bundle.content.split(/(\s+)/).reduce(
      (words, word, index) => {
        if (index % 2 === 1) {
          words.push(word);
          return words;
        }

        const matches = LINK_REGEX.exec(word);
        if (!matches) {
          words.push(word);
          return words;
        }

        const matchedUrl = matches[0];
        words.push(<>
          {word.substring(0, matches.index)}
          <a key={index} href={matchedUrl} target="_blank" rel="noopener noreferer">
            {matchedUrl}
          </a>
          {word.substring(matches.index + matchedUrl.length)}
        </>)

        return words;
      }, [] as React.ReactNode[],
    );
  }


  if (!isEmpty(style) || className) {
    return <span style={style || {}} key={key}>{content}</span>;
  }

  return content;
}

export function RawLogger({
  partical,
  index = 0,
  foldable = false,
  useClasses = false,
  linkify = false,
}: {
  partical: Partical;
  index: number;
  foldable?: boolean;
  useClasses?: boolean;
  linkify?: boolean;
}) {
  const [fold, setFold] = useState(partical.fold);

  const lines = (
    <>
      {partical.content.split('\n').map((line, index) => {
        return (
          <div className={styles.logLine} key={index}>
            <a className={styles.lineNo} />
            {ansiToJSON(line).map(convertBundleIntoReact.bind(null, useClasses, linkify))}
          </div>
        );
      })}
    </>
  );

  if (foldable) {
    return (
      <div className={fold ? styles.fold : styles.foldOpen}>
        <div
          key={`folder-placeholder-${index}`}
          className={styles.foldLine}
          onClick={() => setFold(!fold)}
        >
          {partical.label ?
            ansiToJSON(partical.label).map(convertBundleIntoReact.bind(null, useClasses, linkify))
          : null}
        </div>
        {lines}
      </div>
    );
  }

  return lines;
}
