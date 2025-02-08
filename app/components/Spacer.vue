<script setup lang="ts">
const { size = 'md' } = defineProps<{
  size?: string;
}>();
</script>

<template>
  <span
    :class="`
      spacer
      spacer-size--${size}
    `"
  />
</template>

<style>
.spacer-size--xxs {
  height: 0.25rem;
}
.spacer-size--xs {
  height: 0.5rem;
}
.spacer-size--sm {
  height: 1rem;
}
.spacer-size--md {
  height: 1.25rem;
}
.spacer-size--lg {
  height: 1.5rem;
}
.spacer-size--xl {
  height: 2rem;
}
.spacer-size--xl {
  height: 2.5rem;
}
</style>
