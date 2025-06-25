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
      margin-inline: 0.25em 0.1em;
      background-color: var(--color-grey-text);
      mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path d="M13 22c4.055-.008 6.178-.107 7.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536C19.071 2 16.714 2 12 2S4.929 2 3.464 3.464C2.107 4.822 2.008 6.944 2 11"/><path stroke-linejoin="round" d="m3 21l8-8m0 0H5m6 0v6"/></g></svg>');
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
