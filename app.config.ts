export default defineAppConfig({
  myLayer: {
    name: 'UI',
  },
});

declare module '@nuxt/schema' {
  interface AppConfigInput {
    myLayer?: {
      name?: string;
    };
  }
}
