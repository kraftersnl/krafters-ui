<script setup lang="ts">
useHead({ title: 'Markdown Editor | Krafters UI' });

const content = ref(
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat sednisi voluptatem perferendis facilis ab, aperiam mollitia neque deserunt expedita ea! Repudiandae quaerat, unde cupiditate libero fuga excepturi obcaecati. Sunt? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum, fuga. Nihil iste enim expedita repellat consequuntur officiis sequi illo provident ducimus voluptatem aliquam corrupti sapiente adipisci ex, fugit rerum necessitatibus.',
);
</script>

<template>
  <div class="demo-page markdown-demo">
    <h1>Markdown Editor</h1>

    <MarkdownEditor v-model="content" />

    <h2>Markdown Preview</h2>
    <MarkdownPreview :content="content" />
  </div>
</template>

<style>
.markdown-demo {
  margin-block-start: 1rem;

  h2 {
    margin-block-end: 0;
  }
}
</style>
