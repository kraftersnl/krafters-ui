<script setup lang="ts">
withDefaults(
  defineProps<{
    lines?: number;
  }>(),
  { lines: 1 },
);
</script>

<template>
  <span
    :class="`ellipsis ellipsis-variant--${lines ? 'clamp' : 'nowrap'}`"
    :style="`--webkit-line-clamp: ${lines}`"
  >
    <slot />
  </span>
</template>

<style>
.ellipsis {
  overflow: hidden;
  display: block;
}

.ellipsis-variant--nowrap {
  white-space: nowrap;
  text-overflow: ellipsis;
}

.ellipsis-variant--clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: var(--webkit-line-clamp);
  -webkit-line-clamp: var(--webkit-line-clamp);
  /* word-break: break-word; */
}
</style>
