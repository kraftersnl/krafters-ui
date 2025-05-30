<script setup lang="ts">
import markdownit from 'markdown-it';
import { attrs } from '@mdit/plugin-attrs';
import { mark } from '@mdit/plugin-mark';
import { italicExtension, targetBlankExtension } from './extensions';

import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import 'highlight.js/lib/common';
import 'highlight.js/styles/stackoverflow-dark.css';

hljs.registerLanguage('css', css);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);

const {
  content,
  fontSize = 'md',
  ellipsisLines,
} = defineProps<{
  content: string;
  fontSize?: FontSize;
  ellipsisLines?: number;
}>();

const computedStyle = computed(() => ({
  '--font-size': fontSize && `var(--font-size-${fontSize})`,
  '--line-clamp': ellipsisLines && ellipsisLines,
}));

const md = markdownit({
  html: true,
  linkify: true,
  highlight: (str: string, lang: string) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre><code class="hljs">' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          '</code></pre>'
        );
      } catch (error) {
        console.log(error);
      }
    }

    return '<pre><code class="hljs">' + escapeHTML(str) + '</code></pre>';
  },
});

md.use(targetBlankExtension);
md.use(italicExtension);
md.use(attrs);
md.use(mark);

const preview = computed(() => md.render(content));
</script>

<template>
  <div
    :class="['krafters-markdown-preview', ellipsisLines && 'ellipsis']"
    :style="computedStyle"
    v-html="preview"
  />
</template>

<style>
.krafters-markdown-preview {
  &.ellipsis {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-clamp: var(--line-clamp);
    -webkit-line-clamp: var(--line-clamp);
    hyphens: none;
  }

  font-size: var(--font-size, inherit);

  code {
    font-size: smaller;
  }

  pre code.hljs {
    display: inline-block;
  }

  blockquote,
  pre,
  p,
  ul,
  ol {
    &:has(+ h2) {
      margin-block-end: 3rem;
    }
    &:has(+ h3) {
      margin-block-end: 2.5rem;
    }
    &:has(+ h4) {
      margin-block-end: 2rem;
    }
    &:has(+ h5) {
      margin-block-end: 1.5rem;
    }
    &:has(+ h6) {
      margin-block-end: 1rem;
    }
  }

  a {
    &[target='_blank']::after {
      content: '';
      display: inline-block;
      vertical-align: middle;
      width: 1em;
      height: 1em;
      margin-left: 0.2em;
      background-color: var(--color-grey-text);
      mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 1 0 0 2h2.586l-6.293 6.293a1 1 0 1 0 1.414 1.414L15 6.414V9a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1z"/><path d="M5 5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3a1 1 0 1 0-2 0v3H5V7h3a1 1 0 0 0 0-2z"/></svg>');
      mask-size: contain;
      mask-repeat: no-repeat;
    }

    &:hover {
      color: var(--color-accent);

      &::after {
        background-color: var(--color-accent);
      }
    }
  }
}
</style>
