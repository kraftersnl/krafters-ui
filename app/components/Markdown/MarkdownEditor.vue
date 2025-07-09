<script setup lang="ts">
import { MdEditor, config } from 'md-editor-v3';
import { attrs } from '@mdit/plugin-attrs';
import { mark } from '@mdit/plugin-mark';
import {
  swatchExtension,
  italicExtension,
  targetBlankExtension,
} from './extensions';
import 'md-editor-v3/lib/style.css';

const {
  id = useId(),
  preview = false,
  autofocus,
  disabled,
  label = undefined,
  placeholder = undefined,
  errorMessage = undefined,
  instruction = undefined,
  required,
} = defineProps<{
  label?: string;
  placeholder?: string;
  id?: string;
  preview?: boolean;
  required?: boolean;
  hideLabel?: boolean;
  autofocus?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  instruction?: string;
}>();

config({
  markdownItConfig(md) {
    md.use(swatchExtension);
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

const emit = defineEmits<{
  blur: [value: Event];
}>();
</script>

<template>
  <ClientOnly>
    <div class="markdown-editor">
      <div
        :class="['label', hideLabel && 'visuallyhidden']"
        @click="focusEditor()"
      >
        <span>{{ label }}</span>

        <Chip v-if="required" size="xs" :label="$t('form.required')" />
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
        :disabled="disabled"
        :theme="colorMode.value === 'light' ? 'light' : 'dark'"
        code-theme="stackoverflow-dark"
        :aria-describedby="`${instruction ? `instruction-${id}` : ''}`"
        @blur="emit('blur', $event)"
      />

      <p v-if="instruction" :class="`instruction-${id}`">
        {{ instruction }}
      </p>

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
          <Icon name="material-symbols:warning-rounded" />

          <span>{{ computedErrorMessage }}</span>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style>
.md-editor-preview {
  font-size: var(--font-size) !important;
  word-break: break-word !important;

  p {
    white-space: normal;
  }
  ol {
    list-style-position: outside !important;
    padding-inline-start: 2rem !important;
  }
  ul {
    list-style-position: outside !important;
    padding-inline-start: 1.25rem !important;
  }

  &.default-theme {
    ol,
    ul {
      margin: 0 !important;
      > li {
        margin: 0 !important;
        > ul,
        > ol {
          margin-block-end: 0.5rem !important;
        }
      }
    }
  }
}

.md-editor,
.md-editor-preview.krafters-theme {
  --md-color: var(--color-text) !important;
  --md-bk-color-outstand: var(--color-grey-bg) !important;
  --md-border-color: var(--color-grey-graphic) !important;
  --md-border-active-color: var(--focus-color) !important;

  a {
    --md-theme-link-color: var(--color-text);
    --md-theme-link-hover-color: var(--color-accent);
    text-decoration: underline;
    transition-duration: var(--duration-sm);
  }

  code {
    line-height: var(--line-height, 1.5);
    --md-theme-code-inline-color: var(--color-text);
    --md-theme-code-inline-bg-color: var(--color-grey-bg);

    &[data-color]::before {
      display: inline-block;
      content: '';
      width: 1em;
      height: 1em;
      border: 1px solid var(--color-card-bg);
      border-radius: var(--radius-full);
      vertical-align: middle;
      margin-inline-end: 0.25rem;
      margin-block-start: -2px;
      background-color: var(--color);
    }
  }

  blockquote {
    --md-theme-quote-color: var(--color-text);
    --md-theme-quote-bg-color: var(--color-accent-bg);
    --md-theme-quote-border: 5px solid var(--color-accent);
  }
}

.md-editor-toolbar-wrapper .md-editor-toolbar-item {
  cursor: default !important;
}

.md-editor-toolbar-item svg.md-editor-icon {
  width: 1.5rem;
  height: 1.5rem;
}

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
  border-radius: var(--radius-md);
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
