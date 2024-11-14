<script setup lang="ts">
import { MdEditor, config } from 'md-editor-v3';
import { attrs } from '@mdit/plugin-attrs';
import { italicBoldExtension, targetBlankExtension } from './extensions';
import 'md-editor-v3/lib/style.css';

config({
  markdownItConfig(md) {
    md.use(italicBoldExtension);
    md.use(targetBlankExtension);
    md.use(attrs);
  },
});

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    label?: string;
    placeholder?: string;
    id?: string;
    errorMessage?: string;
    required?: boolean;
  }>(),
  {
    modelValue: undefined,
    label: undefined,
    placeholder: undefined,
    errorMessage: undefined,
    id: () => useId(),
  },
);

const content = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:model-value', value),
});

const markdownEditor = useTemplateRef<HTMLDivElement>('markdownEditor');

function focusEditor() {
  markdownEditor.value?.focus();
}

defineExpose({
  focusEditor,
});

const emit = defineEmits(['update:model-value']);
</script>

<template>
  <ClientOnly>
    <div class="markdown-editor form-field-wrapper">
      <div v-if="label" class="label">{{ label }}</div>

      <MdEditor
        ref="markdownEditor"
        v-model.trim="content"
        language="en-US'"
        no-upload-img
        :preview="false"
        :footers="footers"
        :toolbars="toolbars"
        :placeholder="placeholder"
        :theme="$colorMode.value === 'light' ? 'light' : 'dark'"
      />

      <textarea
        v-if="required"
        v-model="content"
        :required="required"
        class="visuallyhidden"
        aria-hidden="true"
      />

      <div
        v-if="required"
        :id="id && required ? `error-${id}` : undefined"
        class="error-wrapper"
        aria-live="polite"
      >
        <div class="error">
          <Icon name="heroicons-solid:exclamation" />

          <span>
            {{
              errorMessage || $t('form-errors.not-filled-in', { item: label })
            }}
          </span>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style>
.md-editor-resize-operate {
  background-color: var(--color-grey-graphic);
}

.md-editor {
  height: auto;
  border-radius: var(--radius-sm);
}

.md-editor-content {
  min-height: 10rem;
}

.invalid {
  .textarea {
    &:invalid {
      border-color: var(--color-red);
      outline: 1px solid var(--color-red);
    }
  }

  .markdown-editor:has(:invalid) {
    .error-wrapper .error {
      display: flex;
    }
  }
}
</style>
