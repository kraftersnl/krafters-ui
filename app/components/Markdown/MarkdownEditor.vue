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
  errorMessage,
  label,
  required,
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
        'stackoverflow-dark': {
          light:
            'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/stackoverflow-dark.min.css',
          dark: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/stackoverflow-dark.min.css',
        },
      },
    },
  },
});

onMounted(() => {
  if (autofocus) setTimeout(() => focusEditor(), 250);
});

const { locale } = useI18n();
const colorMode = useColorMode();

const content = defineModel<string>();
const markdownEditorRef = useTemplateRef<HTMLDivElement>('markdownEditor');

function focusEditor() {
  markdownEditorRef.value?.focus();
}

defineExpose({
  focusEditor,
});

const { t } = useI18n();

const computedErrorMessage = computed(() => {
  if (errorMessage) return errorMessage;
  if (required && !content.value) {
    return t('form.missing-value', { item: label });
  }
  return t('form.invalid-value');
});
</script>

<template>
  <ClientOnly>
    <div class="markdown-editor">
      <div
        :class="`label
        ${hideLabel ? 'visuallyhidden' : ''}
      `"
        @click="focusEditor()"
      >
        <span>{{ label }}</span>

        <Chip v-if="required" size="sm" :label="$t('form.required')" />
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
        :theme="colorMode.value === 'light' ? 'light' : 'dark'"
        code-theme="stackoverflow-dark"
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

          <span>{{ computedErrorMessage }}</span>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style>
.md-editor-resize-operate {
  background-color: var(--color-grey-graphic);
}

.markdown-editor {
  display: grid;
  flex-grow: 1;

  .md-editor {
    --md-bk-color: var(--color-input-bg) !important;
  }
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
