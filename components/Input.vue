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
    icon?: string;
    size?: 'sm' | 'md' | 'lg';
    minlength?: number;
    maxlength?: number;
    hideLabel?: boolean;
    showInvalid?: boolean;
    min?: number | string;
    max?: number | string;
    instruction?: string;
    errorMessage?: string;
  }>(),
  {
    modelValue: undefined,
    id: () => useId(),
    name: undefined,
    type: 'text',
    autocomplete: undefined,
    pattern: undefined,
    placeholder: undefined,
    icon: undefined,
    size: 'md',
    minlength: undefined,
    maxlength: undefined,
    min: undefined,
    max: undefined,
    instruction: undefined,
    errorMessage: undefined,
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
      :aria-describedby="`
        ${instruction ? `instruction-${id}` : ''}
        ${id && (required || min || max) ? `error-${id}` : ''}
      `"
      @input="handleInput"
    />

    <Icon v-if="icon" :name="'heroicons-solid:' + icon" />

    <p v-if="instruction" :class="`instruction-${id}`">
      {{ instruction }}
    </p>

    <div
      v-if="required || min || max"
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
  .input {
    background-color: var(--color-input-bg);

    &:has(+ .iconify) {
      padding-inline-start: 1.75rem;
    }

    + .iconify {
      position: absolute;
      left: 0.5rem;
      color: var(--color-grey-text);
    }
  }

  [class*='instruction'] {
    margin-top: 0.5rem;
    font-size: var(--font-size-xs);
    color: var(--color-grey-text);
  }
}

.input-size--sm .input {
  height: 2rem;
  padding-inline: 0.5rem;

  + .iconify {
    bottom: 0.5em;
  }
}

.input-size--md .input {
  height: 2.25rem;
  padding-inline: 0.5rem;

  + .iconify {
    bottom: 0.6em;
  }
}

.input-size--lg .input {
  height: 2.5rem;
  padding-inline: 0.65rem;

  + .iconify {
    bottom: 0.7em;
  }
}
</style>
