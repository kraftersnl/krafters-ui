<script setup lang="ts">
const model = defineModel<string | number | boolean>();

const {
  label = undefined,
  name = undefined,
  errorMessage = undefined,
  placeholder = undefined,
  options = undefined,
  noOptionsLabel = undefined,
  ariaDescribedby = undefined,
  instruction = undefined,
  tabindex = undefined,
  color = undefined,
  required,
  variant = 'default',
  placeholderValue = '',
  size = 'md',
  valueKey = 'value',
  labelKey = 'label',
  disabledKey = 'disabled',
  id = useId(),
} = defineProps<{
  label?: string;
  name?: string;
  options?: any[];
  placeholder?: string;
  placeholderValue?: string | number;
  size?: InputSize;
  valueKey?: string;
  labelKey?: string;
  disabledKey?: string;
  hideLabel?: boolean;
  showInvalid?: boolean;
  required?: boolean;
  disabled?: boolean;
  autofocus?: boolean;
  multiple?: boolean;
  noOptionsLabel?: string;
  ariaDescribedby?: string;
  instruction?: string;
  errorMessage?: string;
  tabindex?: string;
  color?: BaseColor;
  id?: string;
  variant?: InputVariant;
}>();

const computedErrorMessage = computed(() => {
  if (errorMessage) return errorMessage;
  if (required && !model.value) {
    return $t('form.missing-value', { item: label });
  }
  return $t('form.invalid-value');
});
</script>

<template>
  <div
    :class="[
      'form-field-wrapper',
      `select-size--${size}`,
      `select-variant--${variant}`,
      color && `select-color--${color}`,
      showInvalid && 'show-invalid',
    ]"
  >
    <label
      :for="id"
      :class="[hideLabel && 'visuallyhidden', disabled && 'disabled']"
    >
      <span>{{ label }}</span>

      <Chip v-if="required" size="xs" :label="$t('form.required')" />
    </label>

    <div class="select-wrapper">
      <select
        :id="id"
        ref="elementRef"
        v-model="model"
        class="select"
        :name="name"
        :required="required"
        :disabled="disabled"
        :autofocus="autofocus"
        :multiple="multiple"
        :tabindex="tabindex"
        :aria-describedby="`
          ${ariaDescribedby || ''}
          ${instruction ? `instruction-${id}` : ''}
          ${id && required ? `error-${id}` : ''}
        `"
        size="1"
      >
        <template v-if="!options?.length">
          <option selected disabled :value="placeholderValue">
            {{ noOptionsLabel || $t('select.no-options') }}
          </option>
        </template>
        <option v-else-if="placeholder" hidden :value="placeholderValue">
          {{ placeholder }}
        </option>

        <slot v-if="$slots.default" />

        <template v-else>
          <option
            v-for="option in options"
            :key="option[valueKey] + '-' + id"
            :value="option[valueKey]"
            :disabled="option[disabledKey]"
            :lang="option.lang"
          >
            {{ option[labelKey] }}
          </option>
        </template>
      </select>

      <Icon
        name="material-symbols:keyboard-arrow-down-rounded"
        class="select-arrow"
      />
    </div>

    <p v-if="instruction" :id="`instruction-${id}`" class="instruction">
      {{ instruction }}
    </p>

    <div
      v-if="required"
      :id="id ? `error-${id}` : undefined"
      class="error-wrapper"
      aria-live="polite"
    >
      <div class="error">
        <Icon name="material-symbols:warning-rounded" />

        <span>{{ computedErrorMessage }}</span>
      </div>
    </div>
  </div>
</template>

<style>
.form-field-wrapper {
  .select-wrapper {
    display: grid;
    grid-template-columns: 1fr auto;
  }

  .select {
    -webkit-appearance: none;
    appearance: none;
    margin-inline-end: 1em;
    grid-row: 1;
    grid-column: 1 / -1;
    accent-color: var(--color-text);
    background-color: var(--color-input-bg);
  }

  .select-arrow {
    color: inherit;
    pointer-events: none;
    height: 100%;
    margin-inline-end: 0.5em;
    grid-row: 1;
    grid-column: 2;
  }
}

.select-size--sm .select {
  height: 2rem;
  padding-inline: 0.5em;
}

.select-size--md .select {
  height: 2.25rem;
  padding-inline: 0.5em;
}

.select-size--lg .select {
  height: 2.5rem;
  padding-inline: 0.65em;
}

.select-color--blue {
  .select {
    color: var(--color-blue-text);
    accent-color: var(--color-blue-text);
    border-color: var(--color-blue-graphic);
    background-color: var(--color-blue-bg);
  }

  .select-arrow {
    color: var(--color-blue-graphic);
  }
}

.select-color--green {
  .select {
    color: var(--color-green-text);
    accent-color: var(--color-green-text);
    border-color: var(--color-green-graphic);
    background-color: var(--color-green-bg);
  }

  .select-arrow {
    color: var(--color-green-graphic);
  }
}

.select-color--orange {
  .select {
    color: var(--color-orange-text);
    accent-color: var(--color-orange-text);
    border-color: var(--color-orange-graphic);
    background-color: var(--color-orange-bg);
  }

  .select-arrow {
    color: var(--color-orange-graphic);
  }
}

.select-color--red {
  .select {
    color: var(--color-red-text);
    accent-color: var(--color-red-text);
    border-color: var(--color-red-graphic);
    background-color: var(--color-red-bg);
  }

  .select-arrow {
    color: var(--color-red-graphic);
  }
}

.select-variant--krafters {
  label {
    color: var(--color-grey-text);
    font-weight: var(--font-weight-bold);
  }
  &:focus-within {
    label {
      color: var(--color-text);
    }
  }

  .select {
    border-radius: var(--radius-sm);
    border-width: 1.5px;
    border-color: var(--color-grey-text);
    box-shadow: 0 1.5px 0 0 var(--color-grey-text);

    &:focus {
      outline-color: transparent;
      border-color: var(--color-accent);
      box-shadow: 0 1.5px 0 0 var(--color-accent);
    }
  }
}
</style>
