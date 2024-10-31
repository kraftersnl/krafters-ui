<script setup lang="ts">
import { computed } from 'vue';
import Multiselect from '@vueform/multiselect';

const { t } = useI18n();

// https://github.com/vueform/multiselect#basic-props
const props = withDefaults(
  defineProps<{
    modelValue: unknown;
    mode?: 'single' | 'multiple' | 'tags';
    id?: string;
    label: string;
    placeholder?: string;
    name?: string;
    hideLabel?: boolean;
    hideSelected?: boolean;
    closeOnSelect?: boolean;
    searchable?: boolean;
    disabled?: boolean;
    required?: boolean;
    showInvalid?: boolean;
    valueKey?: string;
    labelKey?: string;
    disabledKey?: string;
    itemsSelectedLabel?: string;
  }>(),
  {
    id: () => useId(),
    mode: 'multiple',
    placeholder: undefined,
    name: undefined,
    hideSelected: false,
    closeOnSelect: false,
    searchable: true,
    valueKey: 'value',
    labelKey: 'label',
    disabledKey: 'disabled',
    itemsSelectedLabel: undefined,
  },
);

const computedModel = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const msTemplateRef = useTemplateRef('multiselect');

function formatMultipleLabels(values) {
  if (values.length === 1) {
    return values[0][props.labelKey];
  }
  return `${values.length} ${props.itemsSelectedLabel || t('multiselect.items-selected')}`;
}

function selectAll() {
  msTemplateRef.value?.selectAll();
}

defineExpose({
  selectAll,
});

const emit = defineEmits(['update:modelValue']);
// https://github.com/vueform/multiselect#events
</script>

<template>
  <div
    :class="`
      form-field-wrapper
      krafters-multiselect
    `"
  >
    <label
      :for="id"
      :class="`${hideLabel ? 'visuallyhidden' : ''} ${disabled ? 'disabled' : ''}`"
    >
      <span>{{ label }}</span>
      <Chip v-if="required" size="sm" :label="$t('form-errors.required')">
        <span class="visuallyhidden">,</span>
        <wbr class="visuallyhidden" />
      </Chip>
    </label>

    <Multiselect
      v-bind="$attrs"
      :id="id"
      ref="multiselect"
      v-model="computedModel"
      :locale="$i18n.locale"
      :hide-selected="hideSelected"
      :close-on-select="closeOnSelect"
      :mode="mode"
      :placeholder="placeholder"
      :searchable="searchable"
      :disabled="disabled"
      :required="required"
      :label="labelKey"
      :value-prop="valueKey"
      :disabled-prop="disabledKey"
      :aria-describedby="id && required ? `error-${id}` : undefined"
      :multiple-label="formatMultipleLabels"
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
        <button type="button" class="clear-button" @mousedown="clear">
          <Icon name="heroicons-solid:x" />
          <span class="visuallyhidden">{{ $t('general.clear') }}</span>
        </button>

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
        <div class="tag-wrapper">
          <span>{{ option[labelKey] }}</span>

          <button
            type="button"
            class="clear-button"
            @click="(e) => handleTagRemove(option, e)"
          >
            <Icon name="heroicons-solid:x" />
            <span class="visuallyhidden">{{ $t('general.clear') }}</span>
          </button>
        </div>
        <slot
          name="tag"
          :option="option"
          :handle-tag-remove="handleTagRemove"
        />
      </template>
    </Multiselect>

    <div
      v-if="required"
      :id="id ? `error-${id}` : undefined"
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
  --ms-line-height: 1.125;
  --ms-bg: var(--color-select-bg);
  --ms-bg-disabled: var(--color-white);
  --ms-border-color: var(--color-grey-graphic);
  /* --ms-border-width: 1px; */
  --ms-border-color-active: var(--focus-color);
  /* --ms-border-width-active: 1px; */
  --ms-radius: var(--radius-sm);
  --ms-py: 0.5rem;
  --ms-px: 0.875rem;
  --ms-ring-width: 1px;
  --ms-ring-color: var(--focus-color);
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
  --ms-dropdown-border-color: var(--focus-color);
  --ms-dropdown-border-width: 1px;
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
  --ms-group-label-bg-selected: var(--color-green-bg);
  --ms-group-label-color-selected: var(--color-green-text);
  --ms-group-label-bg-selected-pointed: var(--color-green);
  --ms-group-label-color-selected-pointed: #ffffff;
  /* --ms-group-label-bg-selected-disabled: #75cfb1; */
  /* --ms-group-label-color-selected-disabled: #d1fae5; */

  /* --ms-option-font-size: 1rem; */
  /* --ms-option-line-height: 1.375; */
  --ms-option-bg-pointed: var(--color-grey-bg);
  --ms-option-color-pointed: var(--color-text);
  --ms-option-bg-selected: var(--color-green-bg);
  --ms-option-color-selected: var(--color-green-text);
  --ms-option-bg-disabled: var(--color-grey-bg);
  --ms-option-color-disabled: var(--color-grey-graphic);
  --ms-option-bg-selected-pointed: var(--color-red-bg);
  --ms-option-color-selected-pointed: var(--color-red);
  /* --ms-option-bg-selected-disabled: #FFFFFF;
  --ms-option-color-selected-disabled: #D1FAE5;
  --ms-option-py: 0.5rem;
  --ms-option-px: 0.75rem;

  --ms-empty-color: #4B5563; */
}

.multiselect-wrapper {
  min-height: 0;
}

.multiselect-caret {
  margin-inline: 0.25rem 0.75rem;
}

.multiselect-tags {
  margin-block: 0.25rem;
  gap: 0.25rem;
}

.krafters-multiselect {
  .clear-button {
    padding: 0.25rem;
    z-index: 0;
    aspect-ratio: 1;
    display: inline-grid;
    place-content: center;
    border-radius: var(--radius-full);
    border: none;
    background-color: transparent;

    &:hover {
      background-color: var(--color-grey-bg);
    }
  }

  .tag-wrapper {
    display: inline-flex;
    border-radius: var(--radius-sm);
    color: var(--color-accent);
    background-color: var(--color-accent-bg);
    font-size: var(--font-size-xs);
    font-weight: 500;
    padding-block: 0.125rem;
    padding-inline-start: 0.5rem;
  }
}

.multiselect-fake-input {
  opacity: 0;
}

.multiselect.is-active.is-open {
  box-shadow: none;
}

.invalid .krafters-multiselect:has(:invalid) {
  .error-wrapper .error {
    display: flex;
  }
}
</style>
