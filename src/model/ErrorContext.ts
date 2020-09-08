import { ErrorMatcherPattern } from '../errorMatcher';
import { createContext } from 'react';

const errorRefs = new Map<HTMLDivElement, ErrorMatcherPattern[]>();

export function setErrorRefs(errors: ErrorMatcherPattern[], ref: HTMLDivElement) {
  errorRefs.clear();
  errorRefs.set(ref, errors);
}

export { errorRefs };

export const ErrorContext = createContext({
  setErrorRefs,
});
