<script setup lang="ts">
import md from '~/data/demo.md?raw';

useHead({ title: 'Markdown components' });

const content = ref(md);
const ellipsisLines = ref(0);
const fontSize = ref<FontSize>('md');
const fontSizeOptions: { value: FontSize; label: string }[] = [
  {
    value: 'lg',
    label: 'lg',
  },
  {
    value: 'md',
    label: 'md',
  },
  {
    value: 'sm',
    label: 'sm',
  },
  {
    value: 'xs',
    label: 'xs',
  },
  {
    value: 'xxs',
    label: 'xxs',
  },
];
</script>

<template>
  <div class="demo-page markdown">
    <h1>Markdown components</h1>
    <p>Rich Text Editor and markdown parser component.</p>

    <Card class="mbs-2">
      <div class="section-topbar">
        <h2>Markdown Preview</h2>

        <Popover icon="solar:settings-bold">
          <div class="popover-settings-content">
            <h2 class="mbe-1">Props</h2>

            <div class="props-wrapper">
              <Select
                v-model="fontSize"
                :options="fontSizeOptions"
                label="fontSize"
                size="sm"
              />
              <Input
                v-model.number="ellipsisLines"
                type="number"
                label="ellipsisLines"
                :min="0"
              />

              <code
                >{{`<MarkdownPreview
                  :font-size="${fontSize}"
                  :ellipsis-lines="${ellipsisLines}"
                />`}}</code
              >
            </div>
          </div>
        </Popover>
      </div>

      <MarkdownPreview
        :content="content"
        :font-size="fontSize"
        :ellipsis-lines="ellipsisLines"
      />
    </Card>

    <Card class="mbs-2">
      <h2>Markdown Editor</h2>
      <MarkdownEditor v-model="content" label="Markdown Editor" hide-label />
    </Card>

    <Card class="mbs-2">
      <h2>Markdown Preview (old)</h2>
      <MarkdownPreviewOld :content="content" />
    </Card>
  </div>
</template>

<style></style>
