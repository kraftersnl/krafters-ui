<script setup lang="ts">
const model = defineModel<boolean | string | number>();

const {
  id = useId(),
  variant = 'default',
  label = undefined,
  title = undefined,
  name = undefined,
  value = undefined,
  tabindex = undefined,
} = defineProps<{
  label?: string;
  title?: string;
  name?: string;
  value?: string | number;
  required?: boolean;
  disabled?: boolean;
  hideLabel?: boolean;
  tabindex?: string;
  id?: string;
  variant?: 'default' | 'krafters';
}>();
</script>

<template>
  <div
    :class="[
      'radio-wrapper',
      disabled && 'disabled',
      `radio-variant--${variant}`,
    ]"
  >
    <input
      :id="id"
      v-model="model"
      :name="name"
      :value="value"
      :disabled="disabled"
      :required="required"
      :tabindex="tabindex"
      type="radio"
    />

    <label
      :for="id"
      :title="title"
      :class="[hideLabel && 'visuallyhidden', disabled && 'disabled']"
    >
      <slot name="label" />

      <span v-if="label">{{ label }}</span>
    </label>

    <slot name="default" />
  </div>
</template>

<style>
.radio-wrapper {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition-property: opacity;
  transition-duration: var(--duration-sm);

  &.disabled {
    opacity: 0.35;
  }

  label {
    font-size: var(--font-size-sm);
    padding-inline-start: 0.5rem;
  }

  input[type='radio'] {
    appearance: none;
    margin: 0;
    width: 1.25rem;
    height: 1.25rem;
    position: relative;
    border-radius: var(--radius-full);

    &::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      border: 1px solid var(--color-grey-text);
      border-radius: inherit;
      background-color: var(--color-card-bg);
      outline: 2px solid transparent;
      transition-property: border-color, outline-offset, outline-color;
      transition-duration: var(--duration-sm);
    }

    &:checked::before {
      border-color: var(--color-accent);
    }

    &:focus-visible::before {
      border-color: var(--color-accent);
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      margin: auto;
      width: 0.875rem;
      height: 0.875rem;
      box-shadow: inset 0 0 0 0 transparent;
      border-radius: var(--radius-full);
      transition-property: box-shadow;
      transition-duration: var(--duration-sm);
    }

    &:checked::after {
      box-shadow: inset 0 0 0 8px var(--color-accent);
    }
  }
}

.radio-variant--krafters {
  input[type='radio'] {
    width: 1.5rem;
    height: 1.5rem;

    &::before {
      border-width: 1.5px;
    }
    &::after {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>
