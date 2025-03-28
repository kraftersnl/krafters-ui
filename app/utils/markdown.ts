import type { ToolbarNames, Footers } from 'md-editor-v3';

export function escapeHTML(value?: string) {
  return value
    ?.replace(/&/g, '&amp;')
    ?.replace(/</g, '&lt;')
    ?.replace(/>/g, '&gt;')
    ?.replace(/"/g, '&quot;')
    ?.replace(/'/g, '&#x27;');
}

export const footers: Footers[] = [
  // 'markdownTotal',
  // '=',
  // 'scrollSwitch',
];

export const toolbars: ToolbarNames[] = [
  'bold',
  // 'underline',
  'italic',
  // 'strikeThrough',
  '-',
  // 'title',
  // 'sub',
  // 'sup',
  'unorderedList',
  'orderedList',
  'quote',
  // 'task',
  '-',
  'codeRow',
  'code',
  // 'link',
  // 'image',
  // 'table',
  // 'mermaid',
  // 'katex',
  '-',
  'revoke',
  'next',
  // 'save',
  '=',
  // 'prettier',
  'pageFullscreen',
  // 'fullscreen',
  'preview',
  // 'previewOnly',
  // 'htmlPreview',
  // 'catalog',
  // 'github',
];
