# Client for Shopify app template

We use RemixJS for the app frontend. You can use whatever framework you want but
 we like RemixJS.

## Development

From your terminal:

```sh
pnpm install
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
pnpm dev:start
```

Then run the app in production mode:

```sh
pnpm prod:start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Framework used

- [Remix Docs](https://remix.run/docs)
