<script setup lang="ts">
useHead({ title: 'Markdown Editor' });

const content = ref(
  'Rich Text Editor for markdown that comes with `<MarkdownEditor>` and `<MarkdownPreview>` components. Krafters UI offers a wrapper for [md-editor-v3](https://github.com/imzbf/md-editor-v3).\n\n```vue\n<MarkdownEditor v-model="content" label="Markdown Editor" />\n```',
);
</script>

<template>
  <div class="demo-page markdown">
    <h1>Markdown components</h1>
    <p>Rich text editor and markdown parser.</p>

    <p class="c-grey-text fs-xs mbe-2">
      <span class="flex-wrapper" style="--gap: 0.35rem">
        <Icon name="mdi:github" size="1rem" />
        <Button
          to="https://github.com/imzbf/md-editor-v3"
          label="md-editor-v3"
          variant="link"
          target="_blank"
          external
        />
      </span>
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
