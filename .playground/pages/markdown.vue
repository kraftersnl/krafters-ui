<script setup lang="ts">
useHead({ title: 'Markdown Editor' });

const content = ref(
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat sednisi voluptatem perferendis facilis ab, aperiam mollitia neque deserunt expedita ea! Repudiandae quaerat, unde cupiditate libero fuga excepturi obcaecati. Sunt? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum, fuga. Nihil iste enim expedita repellat consequuntur officiis sequi illo provident ducimus voluptatem aliquam corrupti sapiente adipisci ex, fugit rerum necessitatibus.',
);
</script>

<template>
  <div class="demo-page markdown">
    <h1>Markdown components</h1>

    <p>
      Markdown Editor for Vue 3 that come with <code>{{ `<MarkdownEditor>` }}</code> and
       <code>{{ `<MarkdownPreview>` }}</code> components.
    </p>

    <p class="c-grey-text fs-xs mbe-2">
      Krafters UI uses
      <Button
        to="https://github.com/imzbf/md-editor-v3"
        label="md-editor-v3"
        variant="link"
        target="_blank"
        external
      />
      for these components.
    </p>

    <div>
      <MarkdownEditor v-model="content" label="Markdown Editor" />
    </div>

    <Card class="mbs-2">
      <h2>Markdown Preview</h2>
      <MarkdownPreview :content="content" />
    </Card>
  </div>
</template>

<style>
.demo-page.markdown {
  h2 {
    margin-block-end: 0;
  }
}
</style>
