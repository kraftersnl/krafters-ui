<script setup lang="ts">
import compressor from 'compressorjs';

const model = defineModel<File>();

const props = withDefaults(
  defineProps<{
    label: string;
    name?: string;
    id?: string;
    accept?: string;
    required?: boolean;
    disabled?: boolean;
    maxFileSize?: number;
    convertSize?: number;
    quality?: number;
    maxWidth?: number;
    maxHeight?: number;
  }>(),
  {
    name: undefined,
    id: () => useId(),
    accept: undefined,
    maxFileSize: 5000,
    convertSize: 500000,
    quality: 0.9,
    maxWidth: 1920,
    maxHeight: 1920,
  },
);

const { t } = useI18n();

const fileInputRef = useTemplateRef<HTMLInputElement>('fileInputRef');
const imagePreview = ref<string>();
const dragover = ref(false);

const validity = computed(() => {
  if (!model.value) {
    return false;
  } else if (model.value.size / 1024 > props.maxFileSize) {
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
  if (model.value) {
    if (model.value.size / 1024 > props.maxFileSize) {
      return t('files.too-big', { size: props.maxFileSize / 1000 + 'MB' });
    }
  }
  return t('form-errors.not-filled-in', { item: props.label });
});

async function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  if (!target.files?.length) return;

  const file = target.files[0];

  if (file.type.includes('image') && !file.type.includes('gif')) {
    new compressor(file, {
      quality: props.quality,
      maxWidth: props.maxWidth,
      maxHeight: props.maxHeight,
      convertSize: props.convertSize,
      success(result: File) {
        const compressedFile = new File([result], result.name, {
          type: result.type,
        });
        emit('update:model-value', compressedFile);
        imagePreview.value = URL.createObjectURL(compressedFile);
      },
    });
  } else {
    model.value = file;
    imagePreview.value = URL.createObjectURL(file);
  }
}

watch(
  () => model.value,
  () => {
    if (!model.value) {
      imagePreview.value = undefined;
      if (fileInputRef.value?.value) {
        fileInputRef.value.value = '';
      }
    }
  },
);

const emit = defineEmits(['update:model-value']);
</script>

<template>
  <div class="file-input-wrapper">
    <label :for="id" class="file-input-label">
      {{ $t('files.browse') }} (max. {{ maxFileSize / 1000 }} MB)
    </label>

    <div class="file-input">
      <input
        :id="id"
        ref="fileInputRef"
        :name="name"
        :required="required"
        :accept="accept"
        :class="`${validity ? 'valid' : 'invalid'}`"
        :aria-describedby="id && !validity ? `error-${id}` : ''"
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
          ${model ? 'has-file' : ''}
          ${dragover ? 'dragover' : ''}
        `"
      >
        <Icon name="heroicons-solid:document-add" />
        <img v-if="imagePreview" :src="imagePreview" />
      </button>
    </div>

    <div v-if="model" class="file-preview" :aria-describedby="id">
      <span class="file-name">
        {{ model.name }}
      </span>
      <span class="file-size"> ({{ formatFileSize(model.size) }}) </span>
    </div>

    <div
      v-if="!validity"
      :id="id ? `error-${id}` : undefined"
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
  label {
    font-size: var(--font-size-sm);
    font-weight: 400;
  }
}

.file-input-button {
  position: relative;
  padding: 0;
  height: 8rem;
  color: var(--color-grey-graphic);
  border-color: var(--color-grey-graphic);
  border-style: dashed;
  border-radius: var(--radius-md);
  max-width: 320px;
  background-color: transparent;
  outline: 3px solid transparent;

  .iconify {
    margin-inline: 4rem;
    font-size: 3rem;
  }

  &.has-image-preview {
    color: white;
    border: none;
    border-radius: var(--radius-xs);

    .iconify {
      display: none;
    }
  }

  &.dragover {
    background-color: var(--color-accent-bg);
    border-color: var(--color-accent);
    color: var(--color-accent);
  }
}

.file-preview {
  margin-block: 0.25rem;
  font-size: var(--font-size-xs);
  color: var(--color-grey-text);
  white-space: pre;
}

.file-input {
  padding-block-start: 0.25rem;
  position: relative;

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
      color: var(--color-accent);
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
