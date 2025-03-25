# Krafters UI

Accessible Vue component library for [Nuxt 3](https://nuxt.com) in TypeScript.

Krafters UI is a [Nuxt Layer](https://nuxt.com/docs/getting-started/layers) in a public repository. It's published on NPM for better version control. You can extend from the [GitHub repository](https://github.com/kraftersnl/krafters-ui) or `@krafters/ui` [NPM package](https://github.com/kraftersnl/krafters-ui).

## Installation

### Extend from GitHub repository

Refer to the layer with `extends` in nuxt.config.ts:

```ts
defineNuxtConfig({
  extends: ['github:kraftersnl/krafters-ui'],
});
```

### Extend from NPM

First, install the package as a dependency by running `pnpm i @krafters/ui`.

Then refer to the layer with `extends` in nuxt.config.ts:

```ts
defineNuxtConfig({
  extends: ['@krafters/ui'],
});
```

## Development

- Run `pnpm i` to install dependencies
- Run `pnpm run dev` to start the development server on [localhost:3003](http://localhost:3003)
