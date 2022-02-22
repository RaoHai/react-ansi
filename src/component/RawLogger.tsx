import React, { useState, ReactNode, useEffect, useContext } from 'react';
import Anser, { AnserJsonEntry } from 'anser';
import { escapeCarriageReturn } from 'escape-carriage';
import { Partical } from '../matcher';
import { ErrorMatcher, ErrorMatcherPattern } from '../errorMatcher';

import styles from '../style/log.module.less';
import { ErrorContext } from '../model/ErrorContext';

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
  errorMatcher,
  index = 0,
  foldable = false,
  useClasses = false,
  linkify = false,
}: {
  partical: Partical;
  errorMatcher: ErrorMatcher;
  index: number;
  foldable?: boolean;
  useClasses?: boolean;
  linkify?: boolean;
}) {
  const { setErrorRefs } = useContext(ErrorContext);
  const lineProps = { useClasses, linkify, errorMatcher };
  const [fold, setFold] = useState(partical.fold);

  const lines = React.useMemo(() => {
    const lines = partical.content.split('\n').map(line => {
      return ansiToJSON(line).reduce((prev, bundle, index) => {
        const content = convertBundleIntoReact(useClasses, linkify, bundle, index);
        const errors = errorMatcher.match(bundle);
        return {
          content: prev.content.concat([content]),
          errors: prev.errors.concat(errors),
        }
      }, {
        content: [] as any,
        errors: [] as ErrorMatcher['patterns'],
      });
    });

    return lines.map((line, index) => (
      <Line
        {...lineProps}
        line={line.content}
        errors={line.errors}
        index={index}
        saveRef={setErrorRefs}
      />
    ));
  }, [partical, styles, useClasses, linkify, errorMatcher]);

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

  return <>{lines}</>;
}

export function Line({
  line,
  errors,
  index,
  saveRef,
}: {
  line: string;
  errors: ErrorMatcher['patterns'],
  index: number,
  saveRef: (errors: ErrorMatcherPattern[], ref: HTMLDivElement) => void;
}) {

  const ref = React.createRef<HTMLDivElement>();

  useEffect(() => {
    if (errors.length && ref.current && saveRef) {
      saveRef(errors, ref.current);
    }
  }, [ref.current, errors]);

  return (
    <div className={`${styles.logLine} ${errors.length ? styles.error : ''}`} key={index} ref={ref}>
      <a className={styles.lineNo} />
      {line}
    </div>
  );
}
