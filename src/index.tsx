/**
 * An foldable ansi logger for react
 * Inspired by ansi-to-react: https://github.com/nteract/nteract/blob/master/packages/ansi-to-react
 */
import React, { useRef } from 'react';
import { _ } from './utils/i18n';
import { defaultSpliters } from './Spliter';

import styles from './log.module.less';
import { RawLogger } from './RawLogger';

export interface FoldableLoggerProps {
  log: string;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
}

export default function FoldableLogger({
  style,
  bodyStyle,
  log,
}: FoldableLoggerProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const foldedLogger = defaultSpliters.execute(log);

  function scrollBodyToTop() {
    if (!bodyRef.current) {
      return;
    }
    bodyRef.current.scrollTop = 0;
  }

  return (
    <div className={styles.logMain} style={style}>
      <div className={styles.logHeader}>
        <button className={styles.rawLog}>
          {_('rawLog')}
        </button>
      </div>

      <div className={styles.logBody} style={bodyStyle} ref={bodyRef}>
        <pre id="log" className={styles.ansi}>
          {foldedLogger.map((partical, index) => {
            return (
              <RawLogger
                key={`logger-line-${index}`}
                foldable={partical.type === 'partical'}
                partical={partical}
                index={index}
              />
            );
          })}
        </pre>
      </div>
      <div className={styles.logFooter} onClick={scrollBodyToTop}>
        <a className={styles.backToTop}>Top</a>
      </div>
    </div>
  );
}
