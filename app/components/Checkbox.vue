<script setup lang="ts">
const model = defineModel<boolean | (string | number)[]>();

const { id = useId() } = defineProps<{
  label?: string;
  title?: string;
  name?: string;
  value?: string | number;
  required?: boolean;
  disabled?: boolean;
  hideLabel?: boolean;
  tabindex?: string;
  id?: string;
}>();
</script>

<template>
  <div :class="`checkbox-wrapper ${disabled ? 'disabled' : ''}`">
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
      :class="`
        ${hideLabel ? 'visuallyhidden' : ''}
        ${disabled ? 'disabled' : ''}
      `"
    >
      <slot name="label" />

      <span v-if="label">{{ label }}</span>

      <Chip v-if="required" size="sm" :label="$t('form.required')" />
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
    padding-inline-start: 0.5rem;
    font-size: var(--font-size-sm);
  }

  input[type='checkbox'] {
    margin: 0;
    margin-top: 1px;
    width: 1rem;
    height: 1rem;
  }
}
</style>
