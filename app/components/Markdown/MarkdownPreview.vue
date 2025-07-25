<script setup lang="ts">
import markdownit from 'markdown-it';
import { attrs } from '@mdit/plugin-attrs';
import { mark } from '@mdit/plugin-mark';
import {
  swatchExtension,
  italicExtension,
  targetBlankExtension,
} from './extensions';

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
  ellipsisLines = undefined,
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

md.use(swatchExtension);
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
.dark-mode {
  .krafters-markdown-preview {
    pre code {
      border-color: var(--color-grey-bg);
    }
  }
}

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

  pre code {
    border: 1px solid transparent;

    &.hljs {
      display: inline-block;
    }
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
    overflow-wrap: anywhere;

    &[target='_blank']::after {
      content: '';
      display: inline-block;
      vertical-align: middle;
      width: 1em;
      height: 1em;
      margin-inline: 0.25em 0.1em;
      background-color: var(--color-grey-text);
      mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6q.425 0 .713.288T12 4t-.288.713T11 5H5v14h14v-6q0-.425.288-.712T20 12t.713.288T21 13v6q0 .825-.587 1.413T19 21zM19 6.4L10.4 15q-.275.275-.7.275T9 15t-.275-.7t.275-.7L17.6 5H15q-.425 0-.712-.288T14 4t.288-.712T15 3h5q.425 0 .713.288T21 4v5q0 .425-.288.713T20 10t-.712-.288T19 9z"/></svg>');
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
