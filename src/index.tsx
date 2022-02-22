/**
 * An foldable ansi logger for react
 * Inspired by ansi-to-react: https://github.com/nteract/nteract/blob/master/packages/ansi-to-react
 */
import React, { useRef, useEffect, useState, useCallback } from 'react';
import produce, { enableMapSet } from 'immer';
import { _ } from './utils/i18n';
import { Spliter, defaultMatchers } from './model/Spliter';

import { Matcher } from './matcher';
import { ErrorMatcher, defaultErrorMatchers, ErrorMatcherPatterns, ErrorMatcherPattern } from './errorMatcher';
import { LogContent } from './component/LogContent';
import { ErrorContext, errorRefs } from './model/ErrorContext';

import styles from './style/log.module.less';

enableMapSet();

const MemorizedLogContent = React.memo(LogContent);

export { Matcher, ErrorContext, errorRefs };
export interface FoldableLoggerProps {
  log: string;
  useLog?: () => string;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  logStyle?: React.CSSProperties;
  matchers?: Matcher[];
  errorMatchers?: ErrorMatcherPatterns;
  autoScroll?: boolean;
  showHeader?: boolean;
  linkify?: boolean;
  children: ({
    hasError,
    errors,
  }: {
    hasError: boolean;
    errors: Map<HTMLDivElement, ErrorMatcherPattern[]>;
  }) => JSX.Element;
}

export default function FoldableLogger({
  style,
  bodyStyle,
  logStyle = {},
  log,
  useLog,
  children,
  matchers = defaultMatchers,
  errorMatchers = defaultErrorMatchers,
  autoScroll = false,
  showHeader = false,
  linkify = true,
}: FoldableLoggerProps) {
  const [autoScrollFlag, setAutoScrollFlag] = useState(autoScroll);
  const bodyRef = useRef<HTMLDivElement>(null);
  const spliter = React.useMemo(() => new Spliter(matchers), [matchers]);
  const errorMatcher = React.useMemo(() => new ErrorMatcher(errorMatchers), [errorMatchers]);
  const [errors, setErrors] = useState(new Map<HTMLDivElement, ErrorMatcherPattern[]>());

  const setErrorRefs = useCallback((error: ErrorMatcherPattern[], ref: HTMLDivElement) => {
    setErrors(err => produce(err, draft => {
      draft.set(ref as any, error);
    }));
  }, [setErrors]);

  const foldedLogger = React.useMemo(() => spliter.execute(log), [spliter, log]);

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
    <ErrorContext.Provider value={{ setErrorRefs }}>
      <div className={`${styles.logMain} ${errors.size ? styles.hasError : ''}`} style={style}>
        {showHeader ? <div className={styles.logHeader}>
          <button className={styles.rawLog}>
            {_('rawLog')}
          </button>
        </div> : null}

        <div className={styles.logBody} style={bodyStyle} ref={bodyRef}>
          {/* <Search defaultSearch /> */}
          <MemorizedLogContent
            particals={foldedLogger}
            style={logStyle}
            linkify={linkify}
            errorMatcher={errorMatcher}
          />
        </div>
        <div className={styles.logFooter} onClick={scrollBodyToTop}>
          <a className={styles.backToTop}>{_('top')}</a>
        </div>
      </div>
      {errors.size && children ? children({ hasError: !!errors.size, errors }) : null}
    </ErrorContext.Provider>
  );
}
