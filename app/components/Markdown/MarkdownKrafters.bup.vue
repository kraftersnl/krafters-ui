<script setup lang="ts">
const model = defineModel<string>();

const { id = useId(), label } = defineProps<{
  id?: string;
  label?: string;
}>();
</script>

<template>
  <div class="krafters-markdown-editor form-field-wrapper">
    <!-- <MarkdownToolbar :textarea-id="id" /> -->

    <label v-if="label" :for="id">
      <span>{{ label }}</span>
    </label>

    <textarea :id="id" v-model="model" class="textarea markdown-textarea" />

    <!-- <MarkdownPreview :content="model" /> -->
  </div>
</template>

<style>
.krafters-markdown-editor {
  display: grid;

  .markdown-textarea {
    width: 100%;
    min-height: 16rem;
    background-color: var(--color-input-bg);
    font-family: monospace;
    font-size: 0.8rem;
  }
}
</style>
