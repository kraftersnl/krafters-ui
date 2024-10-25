<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: string | number | undefined;
    label: string;
    id?: string;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    autofocus?: boolean;
    type?: string;
    autocomplete?: string;
    pattern?: string;
    placeholder?: string;
    size?: 'sm' | 'md' | 'lg';
    minlength?: number;
    maxlength?: number;
    hideLabel?: boolean;
    showInvalid?: boolean;
    min?: number | string;
    max?: number | string;
  }>(),
  {
    modelValue: undefined,
    id: () => useId(),
    name: undefined,
    type: 'text',
    autocomplete: undefined,
    pattern: undefined,
    placeholder: undefined,
    size: 'md',
    minlength: undefined,
    maxlength: undefined,
    min: undefined,
    max: undefined,
  },
);

const inputMode = computed(() => {
  if (props.type === 'email') return 'email';
  if (props.type === 'tel') return 'tel';
  if (props.type === 'url') return 'url';
  if (props.type === 'number') return 'decimal';
  return 'text';
});

const inputPattern = computed(() => {
  if (props.pattern) return props.pattern;
  if (props.type === 'tel') return '^[0-9]+$';
  return undefined;
});

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;

  if (props.type === 'number') {
    if (typeof props.min === 'number' && Number(target.value) < props.min) {
      return;
    }
    if (typeof props.max === 'number' && Number(target.value) > props.max) {
      return;
    }
  }
  emit('update:modelValue', target.value);
}

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div
    :class="`form-field-wrapper input-size--${size} ${showInvalid ? 'show-invalid' : ''}`"
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

    <input
      :id="id"
      ref="elementRef"
      class="input"
      :value="modelValue"
      :name="name"
      :type="type || 'text'"
      :autocomplete="autocomplete"
      :inputmode="inputMode"
      :pattern="inputPattern"
      :required="required"
      :disabled="disabled"
      :autofocus="autofocus"
      :placeholder="placeholder"
      :minlength="minlength"
      :maxlength="maxlength"
      :min="min"
      :max="max"
      :aria-describedby="id && required ? `error-${id}` : undefined"
      @input="handleInput"
    />

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
  .input {
    background-color: var(--color-input-bg);
  }
}

.input-size--sm .input {
  height: 2rem;
  padding-inline: 0.5rem;
}

.input-size--md .input {
  height: 2.25rem;
  padding-inline: 0.5rem;
}

.input-size--lg .input {
  height: 2.5rem;
  padding-inline: 0.65rem;
}
</style>
