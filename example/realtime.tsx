import { useEffect, useState } from "react";

//@ts-ignore
import log from './log.txt';

const logs = log.split('\n');
export default function RealTime({ children }) {
  const [pos, setPos] = useState(5);

  let timeout;

  useEffect(() => {
    timeout = setTimeout(() => {
      setPos(pos => pos > logs.length ? 5 : pos + 1);
    }, 1000);

    return () => clearTimeout(timeout);
  });

  return children({ log: logs.slice(0, pos).join('\n') });
}