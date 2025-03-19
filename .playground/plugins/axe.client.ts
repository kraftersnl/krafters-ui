import VueAxe from 'vue-axe';

export default defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.vueApp.use(VueAxe);
});
