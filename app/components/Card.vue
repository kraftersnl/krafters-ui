<script setup lang="ts">
const {
  is = 'div',
  borderWidth = 1,
  borderRadius = 'md',
  borderColor = 'card-border',
  shadow = 1,
  padding = '1.5rem 2rem',
  mobilePadding = '1.25rem 1.5rem',
} = defineProps<{
  is?: string;
  borderWidth?: number;
  borderRadius?: BorderRadius;
  borderColor?: string;
  shadow?: false | 1 | 2 | 3;
  padding?: string;
  mobilePadding?: string;
}>();
</script>

<template>
  <component
    :is="is"
    class="card"
    :style="`
      --border-width: ${borderWidth}px;
      --border-radius: var(--radius-${borderRadius});
      --border-color: var(--color-${borderColor});
      --mobile-padding: ${mobilePadding};
      --padding: ${padding};
      ${shadow ? `--shadow: var(--shadow-${shadow});` : ''}
    `"
  >
    <slot />
  </component>
</template>

<style>
.card {
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
  h3,
  h4 {
    margin-block-start: 0;
  }
}
</style>
