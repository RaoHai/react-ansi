module.exports = {
  plugins: [
    'gatsby-plugin-typescript',
  ],
  onCreateWebpackConfig: ({
    stage,
    rules,
    loaders,
    plugins,
    actions,
  }) => {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /\.txt$/,
            loader: 'raw-loader'
          },
          {
            test: /\.svg$/,
            use: {
              loader: 'svg-url-loader',
              options: {
                encoding: 'base64'
              }
            },
          }
        ]
      }
    });
  },
}
