---
hero:
  title: 🖥️ React Ansi
  desc: A foldable and searchable ansi log viewer for React.
  actions:
    - text: Getting Started
      link: /usage
footer: Open-source MIT Licensed | Copyright © 2020<br />Powered by [dumi](https://d.umijs.org)
---

<p align="center">
  <a href="https://github.com/RaoHai/react-ansi">
    <img src="https://github.com/RaoHai/react-ansi/workflows/Node%20CI/badge.svg" alt="github action" />
  </a>

  <a href="https://www.npmjs.com/package/react-ansi">
    <img src="https://img.shields.io/npm/v/react-ansi.svg" alt="NPM" />
  </a>

  <a href="https://standardjs.com">
    <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="JavaScript Style Guide" />
  </a>

  <a href="https://david-dm.org/RaoHai/react-ansi">
    <img src="https://david-dm.org/RaoHai/react-ansi.svg" alt="Dependencies" />
  </a>

  <a href="https://travis-ci.org/RaoHai/react-ansi">
    <img src="https://api.travis-ci.org/RaoHai/react-ansi.svg?branch=master" alt="Ci" />
  </a>

  <a href="https://coveralls.io/github/RaoHai/react-ansi?branch=master">
    <img src="https://coveralls.io/repos/github/RaoHai/react-ansi/badge.svg?branch=master" alt="Coverage Status" />
  </a>
</p>

![log](https://user-images.githubusercontent.com/566097/67918532-b1245700-fbd7-11e9-9e9b-ed129b49d377.gif)

## Highlights

- Fast and smooth
- Foldable logs
- Automatic scrolling
- Errors detecting and fast navigator
- Regex search

## Install

```bash
npm install --save react-ansi
```

## Usage

```
import * as React from 'react'

import ReactAnsi from 'react-ansi'

function Example() {
  return (
    <ReactAnsi log={"hello world"} />
  )
}
```

## License

MIT © [RaoHai](https://github.com/RaoHai)
