<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: File;
    label: string;
    name?: string;
    accept?: string;
    required?: boolean;
    disabled?: boolean;
    maxFileSize?: number;
  }>(),
  {
    modelValue: undefined,
    name: undefined,
    accept: undefined,
    maxFileSize: 5000,
  },
);

const { t } = useI18n();

const id = useId();
const imagePreview = ref<string>();
const dragover = ref(false);

const validity = computed(() => {
  if (!props.modelValue) {
    return false;
  } else if (props.modelValue.size / 1024 > props.maxFileSize) {
    return false;
  }
  return true;
});

function handleDragOver() {
  dragover.value = true;
}

function handleDragLeave() {
  dragover.value = false;
}

const errorMessage = computed(() => {
  if (props.modelValue) {
    if (props.modelValue.size / 1024 > props.maxFileSize) {
      return t('files.too-big', { size: props.maxFileSize / 1000 + 'MB' });
    }
  }
  return t('form-errors.not-filled-in', { item: props.label });
});

async function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;

  if (target.files?.length) {
    emit('update:model-value', target.files[0]);

    if (target.files[0].type.includes('image')) {
      imagePreview.value = URL.createObjectURL(target.files[0]);
    }
  }
}

watch(
  () => props.modelValue,
  () => {
    if (!props.modelValue) {
      imagePreview.value = undefined;
    }
  },
);

const emit = defineEmits(['update:model-value']);
</script>

<template>
  <div class="file-input-wrapper">
    <div class="file-input" :style="`background-image: url(${imagePreview})`">
      <input
        :id="id"
        :name="name"
        :required="required"
        :accept="accept"
        :class="`${validity ? 'valid' : 'invalid'}`"
        :aria-describedby="required ? `error-${id}` : undefined"
        type="file"
        @dragover="handleDragOver"
        @dragleave="handleDragLeave"
        @drop="handleDragLeave"
        @change="handleInput"
      />

      <button
        tabindex="-1"
        type="button"
        :disabled="disabled"
        :class="`
          file-input-button
          ${imagePreview ? 'has-image-preview' : ''}
          ${modelValue ? 'has-file' : ''}
          ${dragover ? 'dragover' : ''}
        `"
      >
        <Icon name="heroicons-solid:cloud-upload" />

        <label :for="id" class="file-input-label">
          <span class="browse">{{ $t('files.browse') }}</span>
          <span class="drop">{{ $t('files.or-drop-file') }}</span>

          <Ellipsis class="file-name">{{
            modelValue?.name || $t('files.no-file-selected')
          }}</Ellipsis>

          <span class="file-size">{{
            modelValue
              ? `(${formatFileSize(modelValue.size)})`
              : `(max. ${maxFileSize / 1000} MB)`
          }}</span>
        </label>
      </button>
    </div>

    <div
      v-if="!validity"
      :id="`error-${id}`"
      class="error-wrapper"
      aria-live="polite"
    >
      <div class="error">
        <Icon name="heroicons-solid:exclamation" />

        <span>{{ errorMessage }}</span>
      </div>
    </div>
  </div>
</template>

<style>
.file-input-wrapper {
  .preview-image {
    position: absolute;
  }
}

.file-input-button {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding-block: 1.5rem;
  padding-inline: 0.5rem;
  color: var(--color-accent);
  border-color: var(--color-grey-graphic);
  border-style: dashed;
  border-radius: var(--radius-md);
  background-color: var(--color-white);
  outline: 3px solid transparent;

  .iconify {
    font-size: 2rem;
  }

  .browse {
    padding-inline: 0.65rem;
    padding-block: 0.35rem;
    border-radius: var(--radius-full);
    background-color: var(--color-accent);
    color: var(--color-white);
    justify-self: center;
  }

  .drop {
    margin-block: 0.25rem 1.25rem;
  }

  .file-name,
  .file-size {
    opacity: 80%;
    font-weight: 500;
    white-space: pre;
  }

  &.has-image-preview {
    background-color: rgb(0 0 0 / 50%);
    color: white;
  }

  &.dragover {
    background-color: var(--color-accent-bg);
    border-color: var(--color-accent);
    color: var(--color-accent);
  }
}

.file-input-label {
  font-size: var(--font-size-xs);
  font-weight: 400;
  margin-block-start: 0.5rem;
  display: grid;
  gap: 0.25rem;
}

.file-input {
  position: relative;
  max-width: 320px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  input[type='file'] {
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    position: absolute;
    z-index: 1;
    inset: 0;
    border: 0;
    padding: 0;
    opacity: 0;
    width: 100%;
    height: 100%;

    &:hover + .file-input-button {
      border-color: var(--color-accent);
    }

    &:focus-visible + .file-input-button {
      border-color: var(--focus-color);
      outline-offset: 3px;
      outline-color: var(--focus-color);
    }
  }
}

/* .file-input-wrapper:has(.invalid) {
  .file-input-button {
    border-color: var(--color-red);
  }
  .error-wrapper .error {
    display: flex;
  }
} */
</style>
