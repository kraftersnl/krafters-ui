<script setup lang="ts">
const {
  is = 'div',
  borderRadius = 'md',
  borderColor = 'card-border',
  backgroundColor = undefined,
  borderWidth = 1,
  paddingBlock = '1.25rem',
  paddingInline = '1.5rem',
  shadow = false,
} = defineProps<{
  is?: string;
  borderWidth?: number;
  borderRadius?: BorderRadius;
  borderColor?: string;
  backgroundColor?: string;
  shadow?: false | 1 | 2 | 3;
  paddingBlock?: string;
  paddingInline?: string;
}>();

const computedStyle = computed(() => ({
  '--border-radius': `var(--radius-${borderRadius})`,
  '--border-color': `var(--color-${borderColor})`,
  '--border-width': `${borderWidth}px`,
  '--card-padding-block': paddingBlock,
  '--card-padding-inline': paddingInline,
  '--card-shadow': shadow && `var(--shadow-${shadow})`,
  '--color-card-bg': backgroundColor && `var(--color-${backgroundColor})`,
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
  box-shadow: var(--card-shadow, none);
  background-color: var(--color-card-bg);
  border-radius: var(--border-radius);
  border: var(--border-width, 1px) solid
    var(--border-color, var(--color-card-border));
  padding-block: var(--card-padding-block);
  padding-inline: var(--card-padding-inline);

  @media (max-width: 479px) {
    --card-padding-block: 1.25rem !important;
    --card-padding-inline: 1rem !important;
  }

  h1,
  h2,
  h3 {
    margin-block-start: 0;
  }
}
</style>
