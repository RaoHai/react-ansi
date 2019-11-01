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
    const idx = config.module.rules.findIndex(
      r => r.test.toString() === '/\\.(svg)(\\?.*)?$/'
    )

    config.module.rules[idx] = {
      test: /\.svg$/,
      use: {
        loader: 'svg-url-loader',
        options: {
          encoding: 'base64'
        }
      },
    };

    return merge(config, {
      module: {
        rules: [
          { test: /\.txt$/, loader: 'raw-loader' },
        ],
      }
    })
  }
}
