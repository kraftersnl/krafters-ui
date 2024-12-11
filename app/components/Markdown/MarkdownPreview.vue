<script setup lang="ts">
import { MdPreview, config } from 'md-editor-v3';
import { attrs } from '@mdit/plugin-attrs';
import { italicExtension, targetBlankExtension } from './extensions';
import 'md-editor-v3/lib/style.css';

defineProps<{
  content?: string;
  fontSize?: string;
}>();

const { locale } = useI18n();

config({
  markdownItConfig(md) {
    md.use(targetBlankExtension);
    md.use(italicExtension);
    md.use(attrs);
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
</script>

<template>
  <MdPreview
    v-bind="$attrs"
    :language="locale"
    :model-value="content"
    :theme="$colorMode.value === 'light' ? 'light' : 'dark'"
    preview-theme="krafters"
    :style="`--font-size: var(--font-size-${fontSize || 'md'})`"
  />
</template>

<style>
.md-editor-previewOnly {
  background-color: transparent;

  .md-editor-preview-wrapper {
    padding: 0;
  }
}
</style>
