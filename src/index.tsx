/**
 * An foldable ansi logger for react
 * Inspired by ansi-to-react: https://github.com/nteract/nteract/blob/master/packages/ansi-to-react
 */
import React, { useRef, useEffect, useState } from 'react';
import { _ } from './utils/i18n';
import { Spliter, defaultMatchers } from './Spliter';

import styles from './log.module.less';
import { RawLogger } from './RawLogger';
import { Matcher } from './matcher';

export interface FoldableLoggerProps {
  log: string;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  matchers?: Matcher[];
  autoScroll?: boolean;
  showHeader?: boolean;
}

export default function FoldableLogger({
  style,
  bodyStyle,
  log,
  matchers = defaultMatchers,
  autoScroll = false,
  showHeader = true,
}: FoldableLoggerProps) {
  const [autoScrollFlag, setAutoScrollFlag] = useState(autoScroll);
  const bodyRef = useRef<HTMLDivElement>(null);
  const spliter = React.useMemo(() => new Spliter(matchers), [matchers]);

  const foldedLogger = spliter.execute(log);

  useEffect(() => {
    if (autoScrollFlag && bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [log, matchers, bodyRef.current]);

  // Event listener: if user scrolling log content, then pause auto scroll
  // resume: scroll to bottom
  const pauseOrResumeScrolling = React.useCallback(() => {
    if (!bodyRef.current) {
      return;
    }

    const { scrollHeight, scrollTop, offsetHeight } = bodyRef.current;
    setAutoScrollFlag(scrollHeight - (scrollTop + offsetHeight) < 50);
  }, [bodyRef.current]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.addEventListener('scroll', pauseOrResumeScrolling);
    }
    return () => {
      bodyRef.current && bodyRef.current.removeEventListener('scroll', pauseOrResumeScrolling);
    }
  }, [bodyRef.current, pauseOrResumeScrolling]);

  function scrollBodyToTop() {
    if (!bodyRef.current) {
      return;
    }
    bodyRef.current.scrollTop = 0;
  }

  return (
    <div className={styles.logMain} style={style}>
      {showHeader ? <div className={styles.logHeader}>
        <button className={styles.rawLog}>
          {_('rawLog')}
        </button>
      </div> : null}

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
