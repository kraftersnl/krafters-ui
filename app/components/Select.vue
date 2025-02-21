<script setup lang="ts">
const model = defineModel<string | number | boolean>();

const props = withDefaults(
  defineProps<{
    label: string;
    name?: string;
    options?: any[];
    placeholder?: string;
    placeholderValue?: string | number;
    size?: 'sm' | 'md' | 'lg';
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
  }>(),
  {
    name: undefined,
    options: undefined,
    placeholder: undefined,
    placeholderValue: '',
    size: 'md',
    valueKey: 'value',
    labelKey: 'label',
    disabledKey: 'disabled',
    noOptionsLabel: 'select.no-options',
    ariaDescribedby: undefined,
    instruction: undefined,
    errorMessage: undefined,
    tabindex: undefined,
    color: undefined,
  },
);

const id = useId();
</script>

<template>
  <div
    :class="`
      form-field-wrapper
      select-size--${size}
      ${color ? `select-color--${color}` : ''}
      ${showInvalid ? 'show-invalid' : ''}
    `"
  >
    <label
      :for="id"
      :class="`
        ${hideLabel ? 'visuallyhidden' : ''}
        ${disabled ? 'disabled' : ''}
      `"
    >
      <span>{{ label }}</span>

      <Chip v-if="required" size="sm" :label="$t('form-errors.required')" />
    </label>

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
    >
      <template v-if="!options?.length">
        <option selected disabled :value="placeholderValue">
          {{ $t(noOptionsLabel) }}
        </option>
      </template>
      <option v-else-if="placeholder" hidden :value="placeholderValue">
        {{ placeholder }}
      </option>

      <slot v-if="$slots.default" />

      <template v-else>
        <option
          v-for="option in options"
          :key="option[props.valueKey] + '-' + id"
          :value="option[props.valueKey]"
          :disabled="option[props.disabledKey]"
          :lang="option.lang"
        >
          {{ option[props.labelKey] }}
        </option>
      </template>
    </select>

    <p v-if="instruction" :class="`instruction-${id}`">
      {{ instruction }}
    </p>

    <div
      v-if="required"
      :id="id ? `error-${id}` : undefined"
      class="error-wrapper"
      aria-live="polite"
    >
      <div class="error">
        <Icon name="heroicons-solid:exclamation" />

        <span>
          {{ errorMessage || $t('form-errors.not-filled-in', { item: label }) }}
        </span>
      </div>
    </div>
  </div>
</template>

<style>
.form-field-wrapper {
  .select {
    accent-color: var(--color-text);
    background-color: var(--color-select-bg);
  }
}

.select-size--sm .select {
  height: 2rem;
  padding-inline: 0.5rem;
}

.select-size--md .select {
  height: 2.25rem;
  padding-inline: 0.5rem;
}

.select-size--lg .select {
  height: 2.5rem;
  padding-inline: 0.65rem;
}

.select-color--blue .select {
  color: var(--color-blue-text);
  accent-color: var(--color-blue-text);
  border-color: var(--color-blue);
  background-color: var(--color-blue-bg);
}

.select-color--green .select {
  color: var(--color-green-text);
  accent-color: var(--color-green-text);
  border-color: var(--color-green);
  background-color: var(--color-green-bg);
}

.select-color--orange .select {
  color: var(--color-orange-text);
  accent-color: var(--color-orange-text);
  border-color: var(--color-orange);
  background-color: var(--color-orange-bg);
}

.select-color--red .select {
  color: var(--color-red-text);
  accent-color: var(--color-red-text);
  border-color: var(--color-red);
  background-color: var(--color-red-bg);
}
</style>
