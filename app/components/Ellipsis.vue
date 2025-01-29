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
    class="ellipsis ellipsis-variant--clamp"
    :style="`--webkit-line-clamp: ${lines ?? 1}`"
  >
    <slot />
  </span>
</template>

<style>
.ellipsis {
  overflow: hidden;
  display: block;
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
