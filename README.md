# Krafters UI

Accessible component library for [Nuxt 3](https://nuxt.com) in TypeScript.

Krafters UI is a [Nuxt Layer](https://nuxt.com/docs/getting-started/layers) in a public GitHub repository. It's published on [NPM](https://www.npmjs.com/package/@krafters/ui) for better version control.

## Installation

Refer to the layer with `extends` in `nuxt.config`:

### Extend from GitHub repository

```ts
defineNuxtConfig({
  extends: ['github:kraftersnl/krafters-ui'],
});
```

### Extend from NPM

First install the layer as a dependency by running `npm i @krafters/ui --save`

Then refer to the layer in `nuxt.config.ts`:

```ts
defineNuxtConfig({
  extends: '@krafters/ui',
});
```

## Development

- Run `npm i` to install dependencies
- Run `npm run dev` to start the development server on [localhost:3003](http://localhost:3003)
