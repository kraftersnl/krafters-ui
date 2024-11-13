<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: string | number | undefined;
    label: string;
    name?: string;
    options?: any[];
    placeholder?: string;
    size?: 'sm' | 'md' | 'lg';
    valueKey?: string;
    labelKey?: string;
    disabledKey?: string;
    required?: boolean;
    disabled?: boolean;
    autofocus?: boolean;
    multiple?: boolean;
    hideLabel?: boolean;
    noOptionsLabel?: string;
    instruction?: string;
    errorMessage?: string;
    color?: BaseColor;
  }>(),
  {
    modelValue: undefined,
    name: undefined,
    options: undefined,
    placeholder: undefined,
    size: 'md',
    valueKey: 'value',
    labelKey: 'label',
    disabledKey: 'disabled',
    noOptionsLabel: 'select.no-options',
    instruction: undefined,
    errorMessage: undefined,
    color: undefined,
  },
);

const id = useId();

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
}

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div
    :class="`
      form-field-wrapper
      select-size--${size}
      ${color ? `select-color--${color}` : ''}
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

      <Chip v-if="required" size="sm" :label="$t('form-errors.required')">
        <span class="visuallyhidden">,</span>
        <wbr class="visuallyhidden" />
      </Chip>
    </label>

    <select
      :id="id"
      ref="elementRef"
      class="select"
      :value="modelValue"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :autofocus="autofocus"
      :multiple="multiple"
      :aria-describedby="`
        ${instruction ? `instruction-${id}` : ''}
        ${id && required ? `error-${id}` : ''}
      `"
      @change="handleChange"
    >
      <option v-if="placeholder" hidden value="">
        {{ placeholder }}
      </option>

      <slot v-if="$slots.default" />

      <template v-else-if="!options?.length">
        <option selected disabled value="">
          {{ $t(noOptionsLabel) }}
        </option>
      </template>

      <template v-else>
        <option
          v-for="option in options"
          :key="option[props.valueKey] + '-' + id"
          :value="option[props.valueKey]"
          :disabled="option[props.disabledKey]"
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
