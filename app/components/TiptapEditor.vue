<script setup lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';

import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';

const editor = ref();
const content = defineModel<string>();

watch(content, () => {
  const isSame = editor.value?.getHTML() === content.value;

  // const isSameJSON = JSON.stringify(editor.value?.getJSON()) === JSON.stringify(content.value)

  if (isSame) return;

  editor.value?.commands.setContent(content.value, false);
});

onMounted(
  () =>
    (editor.value = new Editor({
      content: content.value,
      extensions: [
        Markdown,
        StarterKit.configure({
          heading: {
            levels: [2, 3, 4],
          },
        }),
      ],
      onUpdate: () => emit('update:model-value', editor.value?.getHTML()),
    })),
);

const emit = defineEmits<{
  'update:model-value': [value: string];
}>();

onBeforeUnmount(() => editor.value?.destroy());
</script>

<template>
  <ClientOnly>
    <editor-content v-model="content" :editor="editor" />
  </ClientOnly>
</template>
