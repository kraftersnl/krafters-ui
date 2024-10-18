<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: string | undefined;
    label?: string;
    name?: string;
    required?: boolean;
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
  <div class="form-field-wrapper textarea">
    <label v-if="label" :for="props.id">
      <span>{{ label }}</span>

      <Chip v-if="required" size="sm" :label="$t('form-errors.required')">
        <span class="visuallyhidden">,</span>
        <wbr class="visuallyhidden" />
      </Chip>
    </label>

    <textarea
      :id="id"
      ref="elementRef"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :name="name"
      :class="autoresize ? 'autoresize' : ''"
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
.form-field-wrapper.textarea {
  textarea {
    background-color: var(--color-input-bg);
    min-height: 6rem;

    &.autoresize {
      height: auto;
      overflow: auto;
      resize: none;
    }
  }
}
</style>
