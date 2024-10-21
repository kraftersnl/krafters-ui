<script setup lang="ts">
import { computed } from 'vue';
import Multiselect from '@vueform/multiselect';

// https://github.com/vueform/multiselect#basic-props
const props = withDefaults(
  defineProps<{
    modelValue: unknown;
    mode?: 'single' | 'multiple' | 'tags';
    id?: string;
    label: string;
    placeholder?: string;
    hideLabel?: boolean;
    searchable?: boolean;
    disabled?: boolean;
    required?: boolean;
    showInvalid?: boolean;
    valueKey?: string;
    labelKey?: string;
    disabledKey?: string;
  }>(),
  {
    id: () => useId(),
    mode: 'multiple',
    placeholder: undefined,
    valueKey: 'value',
    labelKey: 'label',
    disabledKey: 'disabled',
  },
);

const computedModel = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const emit = defineEmits(['update:modelValue']);
// https://github.com/vueform/multiselect#events
</script>

<template>
  <div
    :class="`
      form-field-wrapper
      cardan-multiselect-container
    `"
  >
    <label :for="id" :class="hideLabel ? 'visuallyhidden' : ''">
      <span>{{ label }}</span>
      <Chip v-if="required" size="sm" :label="$t('form-errors.required')">
        <span class="visuallyhidden">,</span>
        <wbr class="visuallyhidden" />
      </Chip>
    </label>

    <Multiselect
      v-bind="$attrs"
      :id="id"
      v-model="computedModel"
      :mode="mode"
      :placeholder="placeholder"
      :searchable="searchable"
      :disabled="disabled"
      :required="required"
      :label="labelKey"
      :value-prop="valueKey"
      :disabled-prop="disabledKey"
      :aria-describedby="required ? `error-${id}` : undefined"
      :multiple-label="
        (values) =>
          `${values.length === 1 ? values[0][props.labelKey] : $t('multiselect.pages-selected', values.length)}`
      "
    >
      <!-- https://github.com/vueform/multiselect#slots -->
      <template #spinner>
        <slot name="spinner" />
      </template>

      <template #singlelabel="{ value }">
        <slot name="singlelabel" :value="value" />
      </template>

      <template #multiplelabel="{ values }">
        <slot name="label" :value="values" />
      </template>

      <template #clear="{ clear }">
        <slot name="clear" :clear="clear" />
      </template>

      <template #caret="{ handleCaretClick, isOpen }">
        <slot
          name="caret"
          :handle-caret-click="handleCaretClick"
          :is-open="isOpen"
        />
      </template>

      <template #option="{ option, isPointed, isSelected, search }">
        <slot
          name="option"
          :option="option"
          :is-pointed="isPointed"
          :is-selected="isSelected"
          :search="search"
        />
      </template>

      <template #tag="{ option, handleTagRemove }">
        <slot
          name="tag"
          :option="option"
          :handle-tag-remove="handleTagRemove"
        />
      </template>
    </Multiselect>

    <div
      v-if="required"
      :id="`error-${id}`"
      class="error-wrapper"
      aria-live="polite"
    >
      <div class="error">
        <Icon name="heroicons-solid:exclamation" />
        <span>{{ $t('form-errors.not-filled-in', { item: label }) }}</span>
      </div>
    </div>
  </div>
</template>

<style>
@import '@vueform/multiselect/themes/default.css';

:root {
  /* --ms-font-size: 1rem; */
  --ms-line-height: 1.25;
  --ms-bg: var(--color-select-bg);
  --ms-bg-disabled: var(--color-white);
  --ms-border-color: var(--color-grey-graphic);
  /* --ms-border-width: 1px; */
  --ms-border-color-active: var(--color-text);
  /* --ms-border-width-active: 1px; */
  --ms-radius: var(--radius-sm);
  --ms-py: 0.5rem;
  --ms-px: 0.875rem;
  /* --ms-ring-width: 3px; */
  --ms-ring-color: transparent;
  --ms-placeholder-color: var(--color-grey-graphic);
  --ms-max-height: 16rem;

  --ms-spinner-color: var(--color-accent);
  --ms-caret-color: var(--color-grey-graphic);
  --ms-clear-color: var(--color-grey-text);
  --ms-clear-color-hover: var(--color-text);

  /* --ms-tag-font-size: 0.875rem; */
  /* --ms-tag-line-height: 1.25rem; */
  --ms-tag-font-weight: 500;
  --ms-tag-bg: var(--color-accent-bg);
  --ms-tag-bg-disabled: var(--color-grey-bg);
  --ms-tag-color: var(--color-accent);
  --ms-tag-color-disabled: var(--color-grey-graphic);
  --ms-tag-radius: var(--radius-sm);
  /* --ms-tag-py: 0.125rem; */
  /* --ms-tag-px: 0.5rem; */
  /* --ms-tag-my: 0.25rem; */
  /* --ms-tag-mx: 0.25rem; */

  /* --ms-tag-remove-radius: 4px; */
  /* --ms-tag-remove-py: 0.25rem; */
  /* --ms-tag-remove-px: 0.25rem; */
  /* --ms-tag-remove-my: 0rem; */
  /* --ms-tag-remove-mx: 0.125rem; */

  --ms-dropdown-bg: var(--color-card-bg);
  --ms-dropdown-border-color: var(--color-accent);
  /* --ms-dropdown-border-width: 1px; */
  --ms-dropdown-radius: var(--radius-sm);

  /* --ms-group-label-py: 0.3rem; */
  /* --ms-group-label-px: 0.75rem; */
  /* --ms-group-label-line-height: 1.375; */
  --ms-group-label-bg: var(--color-white);
  --ms-group-label-color: var(--color-grey-text);
  --ms-group-label-bg-pointed: var(--color-grey-bg);
  --ms-group-label-color-pointed: var(--color-text);
  --ms-group-label-bg-disabled: var(--color-grey-bg);
  --ms-group-label-color-disabled: var(--color-grey-graphic);
  --ms-group-label-bg-selected: #059669;
  --ms-group-label-color-selected: #ffffff;
  --ms-group-label-bg-selected-pointed: #0c9e70;
  --ms-group-label-color-selected-pointed: #ffffff;
  --ms-group-label-bg-selected-disabled: #75cfb1;
  --ms-group-label-color-selected-disabled: #d1fae5;

  /* --ms-option-font-size: 1rem; */
  /* --ms-option-line-height: 1.375; */
  --ms-option-bg-pointed: var(--color-grey-bg);
  --ms-option-color-pointed: var(--color-text);
  --ms-option-bg-selected: var(--color-accent-bg);
  --ms-option-color-selected: var(--color-accent);
  --ms-option-bg-disabled: var(--color-grey-bg);
  --ms-option-color-disabled: var(--color-grey-graphic);
  --ms-option-bg-selected-pointed: var(--color-accent-bg);
  --ms-option-color-selected-pointed: var(--color-accent);
  /* --ms-option-bg-selected-disabled: #FFFFFF;
  --ms-option-color-selected-disabled: #D1FAE5;
  --ms-option-py: 0.5rem;
  --ms-option-px: 0.75rem;

  --ms-empty-color: #4B5563; */
}

.multiselect-fake-input {
  opacity: 0;
}

.invalid .cardan-multiselect-container:has(:invalid) {
  .error-wrapper .error {
    display: flex;
  }
}
</style>
