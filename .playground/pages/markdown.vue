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

    <Card class="mbs-2">
      <h2>Markdown Editor</h2>
      <MarkdownEditor v-model="content" label="Markdown Editor" hide-label />
    </Card>

    <Card class="mbs-2">
      <div class="section-topbar">
        <h2>Markdown Preview</h2>

        <Popover icon="cog">
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
      <h2>Markdown Preview (old)</h2>
      <MarkdownPreviewOld :content="content" />
    </Card>

    <!-- <Card>
      <MarkdownKrafters v-model="content" label="Custom Markdown Editor" />
    </Card> -->
  </div>
</template>

<style></style>
