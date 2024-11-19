<script setup lang="ts">
const model = defineModel<string | number>();

const props = withDefaults(
  defineProps<{
    label?: string;
    placeholder?: string;
    id?: string;
    name?: string;
    pattern?: string;
    instruction?: string;
    errorMessage?: string;
    hideLabel?: boolean;
    required?: boolean;
    disabled?: boolean;
    autofocus?: boolean;
    autoresize?: boolean;
  }>(),
  {
    label: undefined,
    placeholder: undefined,
    id: () => useId(),
    name: undefined,
    pattern: undefined,
    instruction: undefined,
    errorMessage: undefined,
  },
);

const textareaInput = ref('');
const elementRef = useTemplateRef<HTMLTextAreaElement>('elementRef');

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  textareaInput.value = target.value;
  model.value = target.value;
}

function focusElement() {
  elementRef.value?.focus();
}

function resizeTextarea() {
  if (props.autoresize && elementRef.value) {
    elementRef.value.style.height = 'auto';

    const height = elementRef.value.scrollHeight;
    elementRef.value.style.height = `${height + 2}px`;
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
</script>

<template>
  <div class="form-field-wrapper textarea-wrapper">
    <label
      v-if="label"
      :for="props.id"
      :class="`${hideLabel ? 'visuallyhidden' : ''} ${disabled ? 'disabled' : ''}`"
    >
      <span>{{ label }}</span>

      <Chip v-if="required" size="sm" :label="$t('form-errors.required')">
        <span class="visuallyhidden">,</span>
      </Chip>
    </label>

    <textarea
      :id="id"
      ref="elementRef"
      v-model="model"
      :class="`textarea ${autoresize ? 'autoresize' : ''}`"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :pattern="pattern"
      :autofocus="autofocus"
      :name="name"
      :aria-describedby="`
        ${instruction ? `instruction-${id}` : ''}
        ${id && required ? `error-${id}` : ''}
      `"
      @input="handleInput"
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

        <span>
          {{ errorMessage || $t('form-errors.not-filled-in', { item: label }) }}
        </span>
      </div>
    </div>
  </div>
</template>

<style>
.textarea-wrapper {
  .textarea {
    background-color: var(--color-input-bg);
    min-height: 6rem;
    padding-inline-end: 1.5rem;

    &.autoresize {
      height: auto;
      overflow: auto;
    }
  }
}
</style>
