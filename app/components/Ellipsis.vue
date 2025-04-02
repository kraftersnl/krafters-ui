<script setup lang="ts">
const { lines = 1 } = defineProps<{
  lines?: number;
}>();
</script>

<template>
  <span
    :class="[
      'ellipsis',
      'ellipsis-variant--clamp',
      lines === 1 && 'ellipsis--1-line',
    ]"
    :style="{ '--line-clamp': lines }"
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
  -webkit-line-clamp: var(--line-clamp);
  line-clamp: var(--line-clamp);
  -webkit-hyphens: none;
  hyphens: none;
}
</style>
