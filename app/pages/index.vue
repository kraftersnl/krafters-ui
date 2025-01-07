<script setup lang="ts">
import ChangelogEntry from '../ChangelogEntry.vue';

useHead({ title: 'Krafters UI' });
</script>

<template>
  <div class="demo-page changelog-page">
    <h1>Changelog</h1>

    <ChangelogEntry version="1.0.0" date="2025-01-07">
      <ul>
        <li>Add documentation for existing components</li>
        <li>Add RadioGroup component</li>
        <li>Add <code>is</code> prop to Card component</li>
        <li>Add <code>size</code> prop to MultiSelect component</li>
        <li>
          Add <code>@mdit/plugin-mark</code> to MarkdownEditor and
          MarkdownPreview components
        </li>
      </ul>
    </ChangelogEntry>
  </div>
</template>

<style></style>
