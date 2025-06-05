<script setup lang="ts">
const {
  modelValue = undefined,
  label = undefined,
  required = undefined,
  errorMessage = undefined,
  min = undefined,
  max = undefined,
  pattern = undefined,
  icon = undefined,
  name = undefined,
  title = undefined,
  autocomplete = undefined,
  placeholder = undefined,
  minlength = undefined,
  maxlength = undefined,
  ariaDescribedby = undefined,
  instruction = undefined,
  tabindex = undefined,
  variant = 'default',
  type = 'text',
  size = 'md',
  id = useId(),
} = defineProps<{
  modelValue?: string | number;
  label?: string;
  id?: string;
  name?: string;
  title?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
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
  ariaDescribedby?: string;
  instruction?: string;
  errorMessage?: string;
  tabindex?: string;
  variant?: 'default' | 'krafters';
}>();

const { t } = useI18n();

const computedErrorMessage = computed(() => {
  if (errorMessage) return errorMessage;
  if (required && !modelValue) {
    return t('form.missing-value', { item: label });
  }
  return t('form.invalid-value');
});

const computedIcon = computed(() => {
  if (icon?.includes(':')) {
    return icon;
  }
  return `heroicons-solid:${icon}`;
});

const inputMode = computed(() => {
  if (type === 'email') return 'email';
  if (type === 'tel') return 'tel';
  if (type === 'url') return 'url';
  if (type === 'number') return 'decimal';
  return 'text';
});

const inputPattern = computed(() => {
  if (pattern) return pattern;
  if (type === 'tel') return '^[0-9]+$';
  return undefined;
});

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;

  if (type === 'number') {
    if (Number(target.value) < Number(min)) {
      return;
    }
    if (Number(target.value) > Number(max)) {
      return;
    }
  }
  emit('update:model-value', target.value);
}

const inputRef = useTemplateRef<HTMLInputElement>('input');

function focusElement() {
  inputRef.value?.focus();
}

defineExpose({
  inputRef,
  focusElement,
});

const emit = defineEmits<{
  'update:model-value': [value: string | number];
  focus: [value: Event];
  blur: [value: Event];
}>();
</script>

<template>
  <div
    :class="[
      'form-field-wrapper',
      `input-size--${size}`,
      `input-variant--${variant}`,
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

    <input
      :id="id"
      ref="input"
      class="input"
      :value="modelValue"
      :name="name"
      :title="title"
      :type="type || 'text'"
      :autocomplete="autocomplete"
      :inputmode="inputMode"
      :pattern="inputPattern"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :autofocus="autofocus"
      :placeholder="placeholder"
      :minlength="minlength"
      :maxlength="maxlength"
      :min="min"
      :max="max"
      :tabindex="tabindex"
      :aria-describedby="`
        ${ariaDescribedby || ''}
        ${instruction ? `instruction-${id}` : ''}
        ${id ? `error-${id}` : ''}
      `"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
      @input="handleInput"
    />

    <Icon v-if="icon" :name="computedIcon" />

    <div
      :id="id ? `error-${id}` : undefined"
      class="error-wrapper"
      aria-live="polite"
    >
      <div class="error">
        <Icon name="heroicons-solid:exclamation" />

        <span>{{ computedErrorMessage }}</span>
      </div>
    </div>

    <p v-if="instruction" :class="`instruction-${id}`">
      {{ instruction }}
    </p>
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
      z-index: 1;
      left: 0.5rem;
      color: var(--color-grey-text);
    }
  }
}

.input-size--sm {
  .input {
    height: 2rem;
    padding-inline: 0.5rem;

    + .iconify {
      top: 2em;
    }
  }

  &:has(label.visuallyhidden) {
    .input + .iconify {
      top: 0.5em;
    }
  }
}

.input-size--md {
  .input {
    height: 2.25rem;
    padding-inline: 0.5rem;

    + .iconify {
      top: 2.125em;
    }
  }

  &:has(label.visuallyhidden) {
    .input + .iconify {
      top: 0.65em;
    }
  }
}

.input-size--lg {
  .input {
    height: 2.5rem;
    padding-inline: 0.65rem;

    + .iconify {
      top: 2.3em;
    }
  }

  &:has(label.visuallyhidden) {
    .input + .iconify {
      top: 0.75em;
    }
  }
}

.input-size--xl {
  .input {
    height: 3rem;
    padding-inline: 0.75rem;

    + .iconify {
      top: 2em;
    }
  }

  &:has(label.visuallyhidden) {
    .input + .iconify {
      top: 0.65em;
    }
  }
}

.input-variant--krafters {
  label {
    color: var(--color-grey-text);
    font-weight: var(--font-weight-bold);
  }
  &:focus-within {
    label {
      color: var(--color-text);
    }
  }

  .input {
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
