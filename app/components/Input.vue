<script setup lang="ts">
const model = defineModel<string | number>();

const props = withDefaults(
  defineProps<{
    label: string;
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
  }>(),
  {
    id: () => useId(),
    name: undefined,
    title: undefined,
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
    ariaDescribedby: undefined,
    instruction: undefined,
    errorMessage: undefined,
    tabindex: undefined,
  },
);

const computedIcon = computed(() => {
  if (props.icon?.includes(':')) {
    return props.icon;
  }
  return `heroicons-solid:${props.icon}`;
});

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
  model.value = target.value;
}

const inputRef = useTemplateRef<HTMLTextAreaElement>('input');

function focusElement() {
  inputRef.value?.focus();
}

defineExpose({
  inputRef,
  focusElement,
});

const emit = defineEmits(['focus', 'blur']);
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

      <Chip v-if="required" size="sm" :label="$t('form-errors.required')" />
    </label>

    <input
      :id="id"
      ref="input"
      v-model="model"
      class="input"
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

        <span>
          {{ errorMessage || $t('form-errors.not-filled-in', { item: label }) }}
        </span>
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

  [class*='instruction'] {
    margin-block: 0.25rem;
    font-size: var(--font-size-xs);
    color: var(--color-grey-text);
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
</style>
