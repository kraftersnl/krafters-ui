<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: string | undefined;
    label?: string;
    name?: string;
    hideLabel?: boolean;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    id?: string;
    autoresize?: boolean;
  }>(),
  {
    label: undefined,
    name: undefined,
    placeholder: undefined,
    id: () => useId(),
  },
);

const textareaInput = ref('');

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  textareaInput.value = target.value;
  emit('update:modelValue', target.value);
}

const elementRef = ref<HTMLTextAreaElement>();

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

const emit = defineEmits(['update:modelValue']);
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
        <wbr class="visuallyhidden" />
      </Chip>
    </label>

    <textarea
      :id="id"
      ref="elementRef"
      :class="`textarea ${autoresize ? 'autoresize' : ''}`"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :name="name"
      :aria-describedby="required ? `error-${id}` : undefined"
      @input="handleInput"
    />

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
