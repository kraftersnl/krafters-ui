<script setup lang="ts">
import { MdPreview, config } from 'md-editor-v3';
import { attrs } from '@mdit/plugin-attrs';
import { mark } from '@mdit/plugin-mark';
import { italicExtension, targetBlankExtension } from './extensions';
import 'md-editor-v3/lib/style.css';

const { fontSize = 'md' } = defineProps<{
  content?: string;
  fontSize?: FontSize;
}>();

const colorMode = useColorMode();
const { locale } = useI18n();

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
</script>

<template>
  <MdPreview
    v-bind="$attrs"
    :model-value="content"
    :language="locale"
    :theme="colorMode.value === 'light' ? 'light' : 'dark'"
    code-theme="stackoverflow-dark"
    preview-theme="krafters"
    :style="`--font-size: var(--font-size-${fontSize})`"
  />
</template>

<style>
.md-editor-previewOnly {
  --md-bk-color: transparent !important;

  .md-editor-preview-wrapper {
    padding: 0;
  }
}
</style>
