import { css } from 'docz-plugin-css'
import merge from 'webpack-merge';

export default {
  title: 'Docz Typescript',
  codeSandbox: false,
  typescript: true,
  plugins: [
    css({
      preprocessor: 'less',
      cssmodules: true,
    }),
  ],
  wrapper: 'example/wrapper.tsx',
  modifyBundlerConfig: config => {
    return merge(config, {
      module: {
        rules: [
          { test: /\.txt$/, loader: 'raw-loader' }
        ]
      }
    })
  }
}
