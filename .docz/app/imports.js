export const imports = {
  'example/index.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "example-index" */ 'example/index.mdx'
    ),
  'example/realTime.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "example-real-time" */ 'example/realTime.mdx'
    ),
}
