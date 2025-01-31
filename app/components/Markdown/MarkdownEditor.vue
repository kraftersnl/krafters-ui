<script setup lang="ts">
import { MdEditor, config } from 'md-editor-v3';
import { attrs } from '@mdit/plugin-attrs';
import { mark } from '@mdit/plugin-mark';
import { italicExtension, targetBlankExtension } from './extensions';
import 'md-editor-v3/lib/style.css';

const {
  id = useId(),
  preview = false,
  autofocus,
} = defineProps<{
  label?: string;
  placeholder?: string;
  id?: string;
  preview?: boolean;
  required?: boolean;
  hideLabel?: boolean;
  autofocus?: boolean;
  errorMessage?: string;
}>();

config({
  markdownItConfig(md) {
    md.use(targetBlankExtension);
    md.use(italicExtension);
    md.use(attrs);
    md.use(mark);
  },
  editorExtensions: {
    highlight: {
      css: {
        atom: {
          light:
            'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-dark.min.css',
          dark: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-dark.min.css',
        },
      },
    },
  },
});

onMounted(() => {
  if (autofocus) setTimeout(() => focusEditor(), 250);
});

const { locale } = useI18n();

const content = defineModel<string>();

const markdownEditorRef = useTemplateRef<HTMLDivElement>('markdownEditor');

function focusEditor() {
  markdownEditorRef.value?.focus();
}

defineExpose({
  focusEditor,
});
</script>

<template>
  <ClientOnly>
    <div class="markdown-editor form-field-wrapper">
      <div
        :class="`label
        ${hideLabel ? 'visuallyhidden' : ''}
      `"
        @click="focusEditor()"
      >
        <span>{{ label }}</span>

        <Chip v-if="required" size="sm" :label="$t('form-errors.required')">
          <span class="visuallyhidden">,</span>
        </Chip>
      </div>

      <MdEditor
        ref="markdownEditor"
        v-model.trim="content"
        :language="locale"
        no-upload-img
        :preview="preview"
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

.show-invalid .markdown-editor:has(:invalid) {
  .error-wrapper .error {
    display: flex;
  }
}
</style>
