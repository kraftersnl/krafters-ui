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

const options = {
  html: true,
  highlight: (str, lang) => {
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
};

const md = markdownit(options)
  .use(targetBlankExtension)
  .use(italicExtension)
  .use(attrs)
  .use(mark);

const props = defineProps<{
  content: string;
  fontSize?: FontSize;
}>();

const preview = computed(() => md.render(props.content));
</script>

<template>
  <div
    class="krafters-markdown-preview"
    :style="[fontSize && `--font-size: var(--font-size-${fontSize})`]"
    v-html="preview"
  />
</template>

<style>
.krafters-markdown-preview {
  font-size: var(--font-size, inherit);

  a[target='_blank']::after {
    content: '';
    display: inline-block;
    vertical-align: middle;
    width: 14px;
    height: 14px;
    margin-left: 4px;
    background-color: currentColor;
    -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/><path d="m21 3-9 9"/><path d="M15 3h6v6"/></svg>');
    mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/><path d="m21 3-9 9"/><path d="M15 3h6v6"/></svg>');
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
  }
}
</style>
