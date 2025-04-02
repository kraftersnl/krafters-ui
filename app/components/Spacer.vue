<script setup lang="ts">
const { size = 'md' } = defineProps<{
  size?: string;
}>();
</script>

<template>
  <span
    :class="['spacer', `spacer-size--${size}`]"
    :style="`--size: var(--size-${size})`"
  />
</template>

<style>
.spacer {
  display: block;
  height: var(--size);
}
</style>
