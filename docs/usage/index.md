## Basic Usage

```jsx
import React from 'react';
import ReactAnsi from 'react-ansi';
import log from '../log.txt';

export default () => (
  <ReactAnsi log={log} bodyStyle={{ maxHeight: 500, overflowY: 'auto' }} autoScroll />
);
```
