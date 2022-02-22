import { Matcher, Partical } from "../matcher";

export const washRegExp = '\x1b?[[0-9;]+[a-zA-Z]';

export class Spliter {
  constructor(public matchers: Matcher[]) {}

  execute(log: string) {
    const particals: Partical[] = [];
    let lastIndex = 0;
    for (let i = 0; i < this.matchers.length; i++) {
      const { regexStart, regexEnd, label, matcherOptions } = this.matchers[i];
      regexStart.lastIndex = lastIndex;
      regexEnd.lastIndex = lastIndex;
      const startMatch = regexStart.exec(log);
      if (!startMatch) {
        continue;
      }

      const endMatch = regexEnd.exec(log);
      if (!endMatch) {
        continue;
      }

      const textLabel = label.indexOf('$') === 0 ? startMatch[
        parseInt(label.replace('$', ''), 10)
      ] : label;
      const startPosition = startMatch.index;
      const endPosition = endMatch.index;
      const cursor = endPosition + endMatch[0].length;
      if (startPosition > lastIndex) {
        particals.push({
          type: 'text',
          content: log.substring(lastIndex, startPosition),
          fold: false,
        });
      }

      particals.push({
        label: textLabel,
        type: 'partical',
        content: log.substring(startPosition, cursor),
        fold: !!matcherOptions.defaultFold,
      });
      lastIndex = cursor;
    }

    if (lastIndex < log.length) {
      particals.push({
        type: 'text',
        content: log.substring(lastIndex),
        fold: false,
      });
    }

    return particals;
  }
}

export const defaultMatchers = [
  new Matcher(
    /travis_fold:start:\w+\n(^.*$)/gm,
    /travis_fold:end:\w+\n(^.*$)/gm,
    '$1',
    {
      defaultFold: true,
    }
  )
] as Matcher[];

export const defaultSpliters = new Spliter(defaultMatchers);
