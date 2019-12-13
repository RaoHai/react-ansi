module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-less`,
      options: {
        cssLoaderOptions: {
          camelCase: false,
        },
      },
    },
  ]
}
