<script setup lang="ts">
import md from '~/../README.md?raw';

useHead({ title: 'Getting Started' });
</script>

<template>
  <div class="demo-page getting-started-page">
    <MarkdownPreview :content="md" />
  </div>
</template>

<style>
.getting-started-page {
}
</style>
