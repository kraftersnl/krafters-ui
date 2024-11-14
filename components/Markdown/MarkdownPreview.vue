<script setup lang="ts">
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const props = defineProps<{
  content?: string;
}>();
</script>

<template>
  <ClientOnly>
    <MdPreview
      v-bind="props"
      :model-value="content"
      :theme="$colorMode.value === 'light' ? 'light' : 'dark'"
      preview-theme="krafters"
    />
  </ClientOnly>
</template>

<style>
.md-editor-previewOnly {
  background-color: transparent;

  .md-editor-preview-wrapper {
    padding: 0;
  }
}
</style>
