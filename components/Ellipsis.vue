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
}

.ellipsis-variant--clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: var(--webkit-line-clamp);
  -webkit-line-clamp: var(--webkit-line-clamp);
}
</style>
