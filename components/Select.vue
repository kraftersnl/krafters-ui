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
  <div :class="`form-field-wrapper select-size--${size}`">
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

    <select
      :id="id"
      ref="elementRef"
      class="select"
      :value="modelValue"
      :name="name"
      :required="required"
      :disabled="disabled"
      :autofocus="autofocus"
      :multiple="multiple"
      :aria-describedby="id && required ? `error-${id}` : undefined"
      @change="handleChange"
    >
      <option v-if="placeholder" disabled value="">
        {{ placeholder }}
      </option>

      <slot v-if="$slots.default" />

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
.form-field-wrapper {
  .select {
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
</style>
