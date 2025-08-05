<script setup lang="ts">
const model = defineModel<boolean>();

const { id = useId(), variant = 'default' } = defineProps<{
  label: string;
  disabled?: boolean;
  id?: string;
  variant?: string;
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
    :class="['switch-button', `switch-button-variant--${variant}`]"
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
  border-radius: var(--radius-full);
  outline: 1px solid transparent;
  transition:
    border-color var(--duration-sm),
    background-color var(--duration-sm),
    opacity var(--duration-sm),
    outline-offset var(--duration-sm),
    outline-color var(--duration-sm);

  .switch {
    padding-block: 3px;
    padding-inline: 3px;
    background-color: var(--color-grey-graphic);
    width: 32px;
    height: 18px;
    border-radius: var(--radius-full);
    transition: background-color var(--duration-sm);
  }

  .switch-thumb {
    display: block;
    width: 12px;
    height: 12px;
    border-radius: var(--radius-full);
    background-color: var(--color-white);
    transform: translateX(0);
    transition-property: transform;
    transition-duration: var(--duration-md);
  }

  .switch-label {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    transition-property: color, font-weight;
    transition-duration: var(--duration-sm);
  }

  &:disabled {
    opacity: 0.35;
  }

  &:focus-visible {
    /* outline-offset: 2px; */
    outline-color: var(--focus-color);
    border-color: var(--focus-color);
  }

  &[aria-checked='true'] {
    --color-accent: var(--color-green-graphic);

    .switch-thumb {
      transform: translateX(14px);
    }

    .switch-label {
      color: var(--focus-color);
    }

    .switch {
      background-color: var(--color-cta, var(--color-accent));
    }
  }
}

.switch-button-variant--outline {
  background-color: var(--color-select-bg);
  border: 1px solid var(--color-grey-bg);
  padding-block: 0.35rem;
  padding-inline: 0.35rem 0.65rem;

  &:not(:disabled, :focus-visible):hover {
    border-color: var(--color-grey-graphic);
  }
}
</style>
