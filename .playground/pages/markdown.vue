<script setup lang="ts">
useHead({ title: 'Markdown Editor | Krafters UI' });

const content = ref(
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat sednisi voluptatem perferendis facilis ab, aperiam mollitia neque deserunt expedita ea! Repudiandae quaerat, unde cupiditate libero fuga excepturi obcaecati. Sunt? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum, fuga. Nihil iste enim expedita repellat consequuntur officiis sequi illo provident ducimus voluptatem aliquam corrupti sapiente adipisci ex, fugit rerum necessitatibus.',
);
</script>

<template>
  <div class="demo-page markdown-demo">
    <div>
      <h1>Markdown Editor</h1>
      <MarkdownEditor v-model="content" hide-label />
    </div>

    <Card>
      <h2>Markdown Preview</h2>
      <MarkdownPreview :content="content" />
    </Card>
  </div>
</template>

<style>
.markdown-demo {
  display: grid;
  gap: 1rem;

  h2 {
    margin-block-end: 0;
  }
}
</style>
