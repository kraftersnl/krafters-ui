# Krafters UI

Accessible Vue component library for [Nuxt](https://nuxt.com) in TypeScript.

Krafters UI is a [Nuxt Layer](https://nuxt.com/docs/getting-started/layers) in a public repository. You can extend from the [GitHub repository](https://github.com/kraftersnl/krafters-ui).

## Development

- Run `pnpm i` to install dependencies
- Run `pnpm run dev` to start the development server on [localhost:3003](http://localhost:3003)

## How toextend from Krafters UI layer in your project

### Extend from GitHub repository

Configuration below extends from main branch of repository:

```ts
defineNuxtConfig({
  extends: ['github:kraftersnl/krafters-ui'],
});
```
