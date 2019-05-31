export const washRegExp = '\x1b?[[0-9;]+[a-zA-Z]';

export type Matcher = [string, RegExp, RegExp, boolean?];
export type Partical = {
  label?: string;
  content: string;
  type: 'partical' | 'text';
  fold: boolean;
};

export class Spliter {
  constructor(public matchers: Matcher[]) {}

  execute(log: string) {
    const particals: Partical[] = [];
    let lastIndex = 0;

    for (let i = 0; i < this.matchers.length; i++) {
      const [name, regExpStart, regExpEnd, fold] = this.matchers[i];
      regExpStart.lastIndex = lastIndex;
      regExpEnd.lastIndex = lastIndex;
      const startMatch = regExpStart.exec(log);
      if (!startMatch) {
        continue;
      }

      const endMatch = regExpEnd.exec(log);
      if (!endMatch) {
        continue;
      }

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
        label: name,
        type: 'partical',
        content: log.substring(startPosition, cursor),
        fold: !!fold,
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

const matchers = [
  [
    '环境信息',
    new RegExp(`${washRegExp}Techless Function Job`, 'g'),
    new RegExp(`Hostname\/IP: .*${washRegExp}\n*`, 'g'),
    true,
  ],
  ['参数', new RegExp('Arguments:', 'g'), new RegExp(`${washRegExp}\n\n`, 'g'), true],
] as Matcher[];

export const defaultSpliters = new Spliter(matchers);
