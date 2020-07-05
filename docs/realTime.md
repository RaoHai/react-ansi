# Realtime

```jsx
import React from 'react';
import ReactAnsi from 'react-ansi';
import RealTime from './realtime.tsx';

export default () => (
  <RealTime>
    {({ log }) => <ReactAnsi
      log={log}
      bodyStyle={{ maxHeight: 300, overflowY: 'auto' }}
      autoScroll
    />}
  </RealTime>
);
```