<script setup lang="ts">
const model = defineModel<boolean | string | number>();

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
  <div :class="['radio-wrapper', disabled && 'disabled']">
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

      <!-- <Chip v-if="required" size="sm" :label="$t('form.required')" /> -->
    </label>

    <slot name="default" />
  </div>
</template>

<style>
.radio-wrapper {
  display: flex;

  &.disabled {
    opacity: 0.35;
  }

  label {
    font-size: var(--font-size-sm);
    padding-inline-start: 0.4rem;
  }

  input[type='radio'] {
    margin: 0;
    margin-block-start: 1px;
    width: 1.1rem;
    height: 1rem;
  }
}
</style>
