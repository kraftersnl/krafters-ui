<script setup lang="ts">
const { locale } = useI18n();

defineProps<{
  v: string;
  date: string;
}>();
</script>

<template>
  <Card class="changelog-entry">
    <h2>{{ v }}</h2>

    <time :datetime="date">
      {{ d(date, 'long', locale) }}
    </time>

    <slot />
  </Card>
</template>

<style>
.changelog-entry {
  h2 {
    margin-block-end: 0;
  }

  time {
    color: var(--color-grey-text);
    font-size: var(--font-size-xs);
  }

  p,
  ul {
    margin-block-end: 0;
  }
}
</style>
