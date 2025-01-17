<script setup lang="ts">
import compressor from 'compressorjs';

const model = defineModel<File>();

const props = withDefaults(
  defineProps<{
    label: string;
    name?: string;
    id?: string;
    accept?: string;
    showInvalid?: boolean;
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

const fileInputRef = useTemplateRef<HTMLInputElement>('fileInput');
const imagePreview = ref<string>();
const dragover = ref(false);
const validity = ref(true);

defineExpose({
  validity,
});

const errorMessage = computed(() => {
  if (model.value) {
    if (model.value.size / 1024 > props.maxFileSize) {
      return t('files.too-big');
    }
  }
  return t('form-errors.not-filled-in', { item: props.label });
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
  // console.log(file?.type);

  imagePreview.value = undefined;

  if (!file) return;

  if (file.size / 1024 > props.maxFileSize) {
    validity.value = false;
  } else if (file && props.required) {
    validity.value = !!file;
  } else {
    validity.value = true;
  }

  if (file?.type?.includes('image')) {
    imagePreview.value = URL.createObjectURL(file);
  }

  if (file?.type?.includes('image') && !file?.type?.includes('gif')) {
    new compressor(file, {
      quality: props.quality,
      maxWidth: props.maxWidth,
      maxHeight: props.maxHeight,
      convertSize: props.convertSize,

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
  imagePreview.value = undefined;
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
      {{ $t('files.browse') }} (max. {{ maxFileSize / 1000 }} MB)
    </label>

    <div class="file-input">
      <input
        :id="id"
        ref="fileInput"
        :name="name"
        :required="required"
        :accept="accept"
        :aria-describedby="id && !validity ? `error-${id}` : ''"
        :class="`${showInvalid && !validity ? 'show-invalid' : ''}`"
        type="file"
        @dragover="handleDragOver"
        @dragleave="handleDragLeave"
        @drop="handleDragLeave"
        @change="handleInput"
      />

      <button
        tabindex="-1"
        type="button"
        :aria-labelledby="id"
        :disabled="disabled"
        :class="`
          file-input-button
          ${imagePreview ? 'has-image-preview' : ''}
          ${model ? 'has-file' : ''}
          ${dragover ? 'dragover' : ''}
        `"
      >
        <Icon :name="fileTypeIcon(model)" />
        <img
          v-if="imagePreview"
          :src="imagePreview"
          :alt="$t('files.example', { file: model?.name })"
        />
      </button>
    </div>

    <div v-if="model" class="file-preview" :aria-describedby="id">
      <span class="file-name">{{ model.name }}</span>
      <span class="file-size"> ({{ formatFileSize(model.size) }})</span>
      <Button
        :label="$t('general.delete')"
        hide-label
        icon="x"
        variant="danger"
        radius="full"
        size="xxs"
        @click="removeFile"
      />
    </div>

    <div
      :id="id ? `error-${id}` : undefined"
      class="error-wrapper"
      aria-live="polite"
    >
      <div class="error">
        <Icon name="heroicons-solid:exclamation" />

        <span v-if="!validity">{{ errorMessage }}</span>
      </div>
    </div>
  </div>
</template>

<style>
.file-input-wrapper {
  max-width: 100%;
}

.file-input-button {
  position: relative;
  min-height: 8rem;
  width: 100%;
  padding: 0;
  color: var(--color-grey-graphic);
  border-color: var(--color-grey-graphic);
  border-style: dashed;
  border-radius: var(--radius-md);
  background-color: transparent;
  outline: 3px solid transparent;

  .iconify {
    margin-inline: 6rem;
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
  word-break: break-all;
  margin-block: 0.25rem;
  font-size: var(--font-size-xs);
  color: var(--color-grey-text);

  .button {
    vertical-align: middle;
    margin-inline-start: 0.25rem;
  }
  .file-name {
    color: var(--color-text);
  }
}

.file-input {
  max-width: 320px;
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

.file-input-wrapper:has(.show-invalid) {
  .file-input-button {
    border-color: var(--color-red);
  }
  .error-wrapper .error {
    display: flex;
  }
}
</style>
