import { ErrorMatcherPattern } from '../errorMatcher';
import { createContext } from 'react';

const errorRefs = new Map<HTMLDivElement, ErrorMatcherPattern[]>();

export function addRefs(errors: ErrorMatcherPattern[], ref: HTMLDivElement) {
  errorRefs.set(ref, errors);
}

export { errorRefs };

export const ErrorContext = createContext({
  refs: errorRefs,
  addRefs,
});
