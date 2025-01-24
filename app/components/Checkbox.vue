<script setup lang="ts">
const model = defineModel<boolean | (string | number)[]>();

defineProps<{
  label?: string;
  title?: string;
  name?: string;
  value?: string | number;
  required?: boolean;
  disabled?: boolean;
  hideLabel?: boolean;
}>();

const id = useId();
</script>

<template>
  <div :class="`checkbox-wrapper ${disabled ? 'disabled' : ''}`">
    <input
      :id="id"
      v-model="model"
      :name="name"
      :value="value"
      :disabled="disabled"
      type="checkbox"
    />

    <label
      :for="id"
      :title="title"
      :class="`
        ${hideLabel ? 'visuallyhidden' : ''}
        ${disabled ? 'disabled' : ''}
      `"
    >
      <slot name="label" />

      <span v-if="label">{{ label }}</span>

      <Chip v-if="required" size="sm" :label="$t('form-errors.required')">
        <span class="visuallyhidden">,</span>
      </Chip>
    </label>

    <slot name="default" />
  </div>
</template>

<style>
.checkbox-wrapper {
  display: inline-flex;

  &.disabled {
    opacity: 0.35;
  }

  label {
    padding-inline-start: 0.5rem;
    font-size: var(--font-size-sm);
  }

  input[type='checkbox'] {
    margin: 0;
    margin-top: 1px;
    width: 1rem;
    height: 1rem;

    &:not(:disabled) {
      cursor: pointer;
    }
  }
}
</style>
