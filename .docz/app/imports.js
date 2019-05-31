export const imports = {
  'example/index.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "example-index" */ 'example/index.mdx'
    ),
}
