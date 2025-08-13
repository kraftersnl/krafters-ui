<script setup lang="ts">
import compressor from 'compressorjs';

const model = defineModel<File>();

const {
  label,
  required,
  maxFileSize = 5000,
  convertSize = 500000,
  quality = 0.9,
  maxWidth = 1920,
  maxHeight = 1920,
  name = undefined,
  placeholderUrl = undefined,
  accept = undefined,
  id = useId(),
} = defineProps<{
  label: string;
  name?: string;
  placeholderUrl?: string;
  id?: string;
  accept?: string;
  showInvalid?: boolean;
  required?: boolean;
  disabled?: boolean;
  autofocus?: boolean;
  maxFileSize?: number;
  convertSize?: number;
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
}>();

const { t } = useI18n();

const fileInputRef = useTemplateRef<HTMLInputElement>('fileInput');
const imagePreview = ref(placeholderUrl);
const dragover = ref(false);
const validity = ref(true);

defineExpose({
  validity,
});

const computedErrorMessage = computed(() => {
  if (model.value) {
    if (model.value.size / 1024 > maxFileSize) {
      return t('files.too-big');
    }
  }
  return t('form.missing-value', { item: label });
});

function handleDragOver() {
  dragover.value = true;
}

function handleDragLeave() {
  dragover.value = false;
}

async function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  if (!target.files?.length) return;

  const file = target.files[0];

  imagePreview.value = undefined;

  if (!file) return;

  if (file.size / 1024 > maxFileSize) {
    validity.value = false;
  } else if (file && required) {
    validity.value = !!file;
  } else {
    validity.value = true;
  }

  if (file?.type?.includes('image')) {
    imagePreview.value = URL.createObjectURL(file);
  }

  if (file?.type?.includes('image') && !file?.type?.includes('gif')) {
    new compressor(file, {
      quality: quality,
      maxWidth: maxWidth,
      maxHeight: maxHeight,
      convertSize: convertSize,

      success(result: File) {
        const compressedFile = new File([result], result.name, {
          type: result.type,
        });
        model.value = compressedFile;
      },
    });
  } else {
    model.value = file;
  }
}

function removeFile() {
  model.value = undefined;
  if (imagePreview.value) URL.revokeObjectURL(imagePreview.value);
  fileInputRef.value?.focus();
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
</script>

<template>
  <div class="file-input-wrapper">
    <label :for="id" class="file-input-label">
      <span>
        {{ label || $t('files.browse') }} (max. {{ maxFileSize / 1000 }} MB)
      </span>

      <Chip v-if="required" size="xs" :label="$t('form.required')" />
    </label>

    <div class="file-input">
      <input
        :id="id"
        ref="fileInput"
        type="file"
        :name="name"
        :required="required"
        :autofocus="autofocus"
        :accept="accept"
        :disabled="disabled"
        :aria-describedby="id && !validity ? `error-${id}` : ''"
        :class="[showInvalid && !validity && 'show-invalid']"
        @dragover="handleDragOver"
        @dragleave="handleDragLeave"
        @drop="handleDragLeave"
        @change="handleInput"
      />

      <button
        tabindex="-1"
        type="button"
        :class="[
          'file-input-button',
          imagePreview && 'has-image-preview',
          model && 'has-file',
          dragover && 'dragover',
        ]"
      >
        <Icon :name="fileTypeIcon(model)" />

        <span class="visuallyhidden">{{ label }}</span>

        <img
          v-if="imagePreview"
          :src="imagePreview"
          :alt="$t('files.example', { file: model?.name || label })"
          class="preview-image"
        />
      </button>
    </div>

    <div v-if="model" class="file-preview" :aria-describedby="id">
      <span class="file-name">{{ model.name }}</span>

      <span class="file-size"> ({{ formatFileSize(model.size) }})</span>

      <Button
        :label="$t('general.delete')"
        hide-label
        icon="material-symbols:close-rounded"
        variant="danger"
        radius="full"
        size="xs"
        @click="removeFile"
      />
    </div>

    <div
      :id="id ? `error-${id}` : undefined"
      class="error-wrapper"
      aria-live="polite"
    >
      <div class="error">
        <Icon name="material-symbols:warning-rounded" />

        <span v-if="!validity">{{ computedErrorMessage }}</span>
      </div>
    </div>
  </div>
</template>

<style>
.file-input-wrapper {
  max-width: 100%;

  &:has(input:disabled) {
    opacity: 35%;
    pointer-events: none;
  }
}

.file-input-button {
  position: relative;
  min-height: 8rem;
  width: 100%;
  padding: 0;
  color: var(--color-grey-graphic);
  border: 1.5px dashed var(--color-grey-graphic);
  border-radius: var(--radius-md);
  background-color: transparent;
  outline: 1px solid transparent;

  .iconify {
    margin-inline: 6rem;
    font-size: var(--font-size-xxxl);
  }

  .preview-image {
    border-radius: var(--radius-md);
  }

  &.has-image-preview {
    max-width: max-content;
    color: white;
    border: none;

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
  word-break: break-all;
  margin-block: 0.35em;
  font-size: var(--font-size-xs);
  color: var(--color-grey-text);

  .button {
    margin-inline-start: 0.5em;
  }

  .file-name {
    color: var(--color-text);
  }
}

.file-input {
  position: relative;

  input[type='file'] {
    -webkit-tap-highlight-color: transparent;
    position: absolute;
    z-index: 1;
    inset: 0;
    border: 0;
    padding: 0;
    opacity: 0;
    width: 100%;
    height: 100%;

    &:focus-visible {
      + .file-input-button {
        outline-color: var(--focus-color);
        border-color: var(--focus-color);
        border-style: solid;

        .iconify {
          color: var(--focus-color);
        }
      }
    }

    &:hover:not(:disabled) {
      + .file-input-button {
        color: var(--color-accent-graphic);
        border-color: var(--color-accent-graphic);
      }

      &:focus-visible + .file-input-button {
        outline-color: var(--color-accent-graphic);

        .iconify {
          color: var(--focus-accent-graphic);
        }
      }
    }

    &:hover:not(:disabled) + .has-image-preview {
      outline: 1.5px dashed var(--color-black);
      outline-offset: 1.5px;
    }
  }
}

.file-input-wrapper:has(.show-invalid) {
  .file-input-button {
    border-color: var(--color-red-graphic);
  }

  .error-wrapper .error {
    display: flex;
  }
}
</style>
