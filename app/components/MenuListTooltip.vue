<script setup lang="ts">
defineProps<{
  item: MenuItem;
}>();
</script>

<template>
  <Tooltip
    v-if="item.disabled && item.tooltip"
    :icon="item.tooltipIcon"
    :label="item.label"
    class="menu-list-tooltip"
    icon-color="grey-graphic"
    icon-size="lg"
    :max-width="300"
    font-size="xxs"
  >
    <slot />
  </Tooltip>
</template>

<style>
.menu-list-tooltip {
  .tooltip-trigger-button {
  }
}
</style>
