<script setup lang="ts">
withDefaults(
  defineProps<{
    lines?: number;
  }>(),
  { lines: undefined },
);
</script>

<template>
  <span
    :class="`ellipsis
      ellipsis-variant--clamp
${lines === 1 ? 'ellipsis--1-line' : ''}
    `"
    :style="`--webkit-line-clamp: ${lines ?? 1}`"
  >
    <slot mdc-unwrap="p" />
  </span>
</template>

<style>
.ellipsis {
  overflow: hidden;
  display: block;
}

.ellipsis--1-line {
  word-break: break-all;
}

.ellipsis-variant--clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--webkit-line-clamp);
  line-clamp: var(--webkit-line-clamp);
  -webkit-hyphens: none;
  hyphens: none;
}
</style>
