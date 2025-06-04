<script setup lang="ts">
const model = defineModel<string | number>();

const {
  label = undefined,
  placeholder = undefined,
  pattern = undefined,
  ariaDescribedby = undefined,
  name = undefined,
  instruction = undefined,
  errorMessage = undefined,
  variant = 'default',
  required,
  autoresize,
  id = useId(),
} = defineProps<{
  label?: string;
  placeholder?: string;
  id?: string;
  name?: string;
  pattern?: string;
  ariaDescribedby?: string;
  instruction?: string;
  errorMessage?: string;
  showInvalid?: boolean;
  hideLabel?: boolean;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  autofocus?: boolean;
  autoresize?: boolean;
  variant?: 'default' | 'krafters';
}>();

const { t } = useI18n();

const computedErrorMessage = computed(() => {
  if (errorMessage) return errorMessage;
  if (required && !model.value) {
    return t('form.missing-value', { item: label });
  }
  return t('form.invalid-value');
});

const textareaInput = ref('');
const textareaRef = useTemplateRef<HTMLTextAreaElement>('textarea');

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  textareaInput.value = target.value;
  model.value = target.value;
}

function focusElement() {
  textareaRef.value?.focus();
}

function resizeTextarea() {
  if (autoresize && textareaRef.value) {
    textareaRef.value.style.height = 'auto';

    const height = textareaRef.value.scrollHeight;
    textareaRef.value.style.height = `${height + 2}px`;
  }
}

onMounted(() => {
  window.addEventListener('resize', resizeTextarea);
  resizeTextarea();
});

watch(textareaInput, () => {
  resizeTextarea();
});

onUnmounted(() => window.removeEventListener('resize', resizeTextarea));

defineExpose({
  focusElement,
});

const emit = defineEmits<{
  blur: [value: Event];
  paste: [value: Event];
}>();
</script>

<template>
  <div
    :class="[
      'form-field-wrapper',
      'textarea-wrapper',
      `textarea-variant--${variant}`,
      showInvalid && 'show-invalid',
    ]"
  >
    <label
      v-if="label"
      :for="id"
      :class="[hideLabel && 'visuallyhidden', disabled && 'disabled']"
    >
      <span>{{ label }}</span>

      <Chip v-if="required" size="xs" :label="$t('form.required')" />
    </label>

    <textarea
      :id="id"
      ref="textarea"
      v-model="model"
      :class="['textarea', autoresize && 'autoresize']"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :pattern="pattern"
      :autofocus="autofocus"
      :name="name"
      :aria-describedby="`
        ${ariaDescribedby || ''}
        ${instruction ? `instruction-${id}` : ''}
        ${id && required ? `error-${id}` : ''}
      `"
      @input="handleInput"
      @blur="emit('blur', $event)"
      @paste="emit('paste', $event)"
    />

    <p v-if="instruction" :class="`instruction-${id}`">
      {{ instruction }}
    </p>

    <div
      v-if="required"
      :id="id && required ? `error-${id}` : undefined"
      class="error-wrapper"
      aria-live="polite"
    >
      <div class="error">
        <Icon name="heroicons-solid:exclamation" />

        <span>{{ computedErrorMessage }}</span>
      </div>
    </div>
  </div>
</template>

<style>
.textarea-wrapper {
  .textarea {
    background-color: var(--color-input-bg);
    min-height: 8rem;
    padding-inline-end: 1.5rem;

    &.autoresize {
      height: auto;
      overflow: auto;
    }
  }
}

.textarea-variant--krafters {
  label {
    color: var(--color-grey-text);
    font-weight: var(--font-weight-bold);
  }
  &:focus-within {
    label {
      color: var(--color-text);
    }
  }

  .textarea {
    border-width: 1.5px;
    box-shadow: 0 1.5px 0 0 var(--color-grey-graphic);

    &:focus {
      outline: none;
      border-color: var(--color-accent);
      box-shadow: 0 1.5px 0 0 var(--color-accent);
    }
  }
}
</style>
