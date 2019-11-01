import React from 'react'
import { Link, Router, Routes, useDataServer } from 'docz'
import { hot } from 'react-hot-loader'
import Theme from 'docz-theme-default'

import { imports } from './imports'
import database from './db.json'
import Wrapper from 'example/wrapper.tsx'

const Root = () => {
  useDataServer('ws://127.0.0.1:60506')
  return (
    <Theme wrapper={Wrapper} linkComponent={Link} db={database}>
      <Routes imports={imports} />
    </Theme>
  )
}

export default hot(module)(Root)
