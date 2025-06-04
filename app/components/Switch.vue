<script setup lang="ts">
const model = defineModel<boolean>();

const { id = useId() } = defineProps<{
  label: string;
  disabled?: boolean;
  id?: string;
}>();

function handleClick() {
  model.value = !model.value;
}
</script>

<template>
  <button
    :id="id"
    type="button"
    role="switch"
    class="switch-button"
    :aria-checked="model"
    :disabled="disabled"
    :value="String(model)"
    @click="handleClick"
  >
    <span class="switch">
      <span class="switch-thumb" role="presentation" />
    </span>

    <span class="switch-label">
      {{ label }}
    </span>
  </button>
</template>

<style>
.switch-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: max-content;
  -webkit-tap-highlight-color: transparent;
  background: transparent;
  text-align: left;
  color: inherit;
  font: inherit;
  border: none;
  padding-inline: 0;
  border-radius: var(--radius-lg);
  outline: 2px solid transparent;
  transition:
    background-color var(--duration-sm),
    opacity var(--duration-sm),
    outline-offset var(--duration-sm),
    outline-color var(--duration-sm);

  .switch {
    padding-block: 3px;
    padding-inline: 3px;
    background-color: var(--color-grey-graphic);
    width: 40px;
    height: 22px;
    border-radius: var(--radius-full);
    transition: background-color var(--duration-sm);
  }

  .switch-thumb {
    display: block;
    width: 16px;
    height: 16px;
    border-radius: var(--radius-full);
    background-color: var(--color-white);
    transform: translateX(0);
    transition-property: transform;
    transition-duration: var(--duration-md);
  }

  .switch-label {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    padding-inline: var(--size-4xs);
    transition-property: color, font-weight;
    transition-duration: var(--duration-sm);
  }

  &:hover {
    .switch {
      background-color: var(--color-grey-text);
    }
  }

  &:disabled {
    opacity: 0.35;
  }

  &:focus-visible {
    outline-offset: 2px;
    outline-color: var(--focus-color);
  }

  &[aria-checked='true'] {
    .switch-thumb {
      transform: translateX(18px);
    }
    .switch-label {
      color: var(--focus-color);
    }
    .switch {
      background-color: var(--color-accent);
    }
  }
}
</style>
