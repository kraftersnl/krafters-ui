<script setup lang="ts">
const { locale, setLocale } = useI18n();

const prefersDutch = computed(() => locale.value.startsWith('nl'));
const prefersEnglish = computed(() => locale.value.startsWith('en'));

watch(
  () => locale,
  () => {
    useHead({
      htmlAttrs: {
        lang: prefersDutch.value ? 'nl' : 'en',
      },
    });
  },
);
</script>

<template>
  <div class="language-select">
    <h3>{{ $t('general.language') }}</h3>
    <div class="button-group">
      <button lang="en" :aria-current="prefersEnglish" @click="setLocale('en')">
        English
      </button>

      <button lang="nl" :aria-current="prefersDutch" @click="setLocale('nl')">
        Nederlands
      </button>
    </div>
  </div>
</template>

<style>
.language-select {
  padding-block: 1rem;

  h3 {
    font-size: var(--font-size-xs);
    font-weight: 400;
    color: var(--color-grey-text);
    margin-bottom: 0.5rem;
  }

  button {
    background-color: transparent;
    border: 1px solid var(--color-accent-bg);
    border-radius: var(--radius-sm);
    font-weight: 500;
    font-size: var(--font-size-xs);
    padding-block: 0.25rem;
    padding-inline: 0.5rem;
    color: var(--color-accent-text);

    &:hover {
      color: var(--color-accent);
    }

    &[aria-current='true'] {
      color: var(--color-accent);
      background-color: var(--color-accent-bg);
    }
  }
}
</style>
