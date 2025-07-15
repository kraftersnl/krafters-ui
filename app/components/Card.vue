<script setup lang="ts">
const {
  is = 'div',
  borderRadius = 'md',
  borderColor = 'card-border',
  borderWidth = 1,
  padding = '1.5rem 1.75rem',
  mobilePadding = '1.25rem 1.5rem',
  shadow = false,
} = defineProps<{
  is?: string;
  borderWidth?: number;
  borderRadius?: BorderRadius;
  borderColor?: string;
  shadow?: false | 1 | 2 | 3;
  padding?: string;
  mobilePadding?: string;
}>();

const computedStyle = computed(() => ({
  '--border-radius': `var(--radius-${borderRadius})`,
  '--border-color': `var(--color-${borderColor})`,
  '--border-width': `${borderWidth}px`,
  '--padding': padding,
  '--mobile-padding': mobilePadding,
  '--shadow': shadow && `var(--shadow-${shadow})`,
}));
</script>

<template>
  <component :is="is" class="card" :style="computedStyle">
    <slot />
  </component>
</template>

<style>
:where(.card) {
  position: relative;
  padding: var(--mobile-padding);
  background-color: var(--color-card-bg);
  border: var(--border-width, 1px) solid
    var(--border-color, var(--color-card-border));
  border-radius: var(--border-radius);
  box-shadow: var(--shadow, none);

  @media (min-width: 480px) {
    padding: var(--padding);
  }

  h1,
  h2,
  h3 {
    margin-block-start: 0;
  }
}
</style>
