import React from 'react';
import { Partical } from '../matcher';
import { RawLogger } from './RawLogger';
import { ErrorMatcher } from '../errorMatcher';

import styles from '../style/log.module.less';

export interface LogContent {
  particals: Partical[];
  style?: React.CSSProperties;
  linkify?: boolean;
  errorMatcher: ErrorMatcher;
}

export function LogContent({ particals, style, linkify, errorMatcher }: LogContent) {
  return (
    <pre id="log" className={styles.ansi} style={style}>
      {particals.map((partical, index) => {
        return (
          <RawLogger
            key={`logger-line-${index}`}
            foldable={partical.type === 'partical'}
            partical={partical}
            index={index}
            linkify={linkify}
            errorMatcher={errorMatcher}
          />
        );
      })}
    </pre>
  );
}
