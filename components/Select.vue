<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: string | number | undefined;
    label: string;
    name?: string;
    options?: any[];
    placeholder?: string;
    valueKey?: string;
    labelKey?: string;
    disabledKey?: string;
    required?: boolean;
    disabled?: boolean;
    hideLabel?: boolean;
  }>(),
  {
    modelValue: undefined,
    name: undefined,
    options: undefined,
    placeholder: undefined,
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
  <div class="form-field-wrapper select">
    <label :for="id" :class="hideLabel ? 'visuallyhidden' : ''">
      <span>{{ label }}</span>

      <Chip v-if="required" size="sm" :label="$t('form-errors.required')">
        <span class="visuallyhidden">,</span>
        <wbr class="visuallyhidden" />
      </Chip>
    </label>

    <div class="select">
      <select
        :id="id"
        ref="elementRef"
        :value="modelValue"
        :name="name"
        :disabled="disabled"
        :required="required"
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
  </div>
</template>

<style>
.form-field-wrapper.select {
  select {
    background-color: var(--color-select-bg);
  }
}
</style>
