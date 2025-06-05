<script setup lang="ts">
const model = defineModel<boolean | (string | number)[]>();

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
      'checkbox-wrapper',
      disabled && 'disabled',
      `checkbox-variant--${variant}`,
    ]"
  >
    <input
      :id="id"
      v-model="model"
      :name="name"
      :value="value"
      :disabled="disabled"
      :tabindex="tabindex"
      type="checkbox"
    />

    <label
      :for="id"
      :title="title"
      :class="[hideLabel && 'visuallyhidden', disabled && 'disabled']"
    >
      <slot name="label" />

      <span v-if="label">{{ label }}</span>

      <Chip v-if="required" size="xs" :label="$t('form.required')" />
    </label>

    <slot name="default" />
  </div>
</template>

<style>
.checkbox-wrapper {
  display: flex;

  &.disabled {
    opacity: 0.35;
  }

  label {
    font-size: var(--font-size-sm);
    padding-inline-start: 0.5rem;
  }

  input[type='checkbox'] {
    margin: 0;
    width: 1.125rem;
    height: 1.125rem;
  }
}

.checkbox-variant--krafters {
  align-items: center;
  gap: 0.25rem;

  input[type='checkbox'] {
    appearance: none;
    width: 1.5rem;
    height: 1.5rem;
    position: relative;
    border-radius: var(--radius-sm);

    &::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      border: 1.5px solid var(--color-grey-text);
      box-shadow: 0 1.5px 0 0 var(--color-grey-text);
      border-radius: inherit;
      background-color: var(--color-card-bg);
      outline: 2px solid transparent;
      transition-property:
        box-shadow, border-color, outline-offset, outline-color;
      transition-duration: var(--duration-sm);
    }

    &:checked::before {
      border-color: var(--color-accent);
      box-shadow: 0 1.5px 0 0 var(--color-accent);
    }

    &:focus-visible::before {
      border-color: var(--color-accent);
      box-shadow: 0 1.5px 0 0 var(--color-accent);
    }

    &:checked::after {
      content: '';
      display: inline-block;
      width: 1.25rem;
      height: 1.25rem;
      position: absolute;
      inset: 0;
      margin: auto;
      background-color: var(--color-accent);
      mask-image: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.8568 7.39978L20.5033 7.7533L9.90371 18.3539L9.55019 18.7074L3.14297 12.3002L5.2748 10.1683L9.54922 14.4427L18.3715 5.62146L18.725 5.26794L20.8568 7.39978Z" fill="red" stroke="red"/></svg>');
      mask-size: contain;
      mask-repeat: no-repeat;
    }
  }
}
</style>
