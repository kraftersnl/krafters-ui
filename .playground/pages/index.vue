<script setup lang="ts">
useHead({ title: 'Krafters UI' });
</script>

<template>
  <div class="demo-page changelog-page">
    <h1>Changelog</h1>

    <ChangelogEntry v="1.0.9" date="2025-01-26">
      <ul>
        <li>Add <code>triggerClass</code> prop to MobileMenu component</li>
        <li>Improve <code>required</code> prop for MarkdownEditor component</li>
        <li>
          Add <code>.label</code> helper class for easy swapping with native
          <code>label</code> element
        </li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.8" date="2025-01-24">
      <ul>
        <li>
          Add <code>label</code> and <code>hTag</code> props to MenuList
          component
        </li>
        <li>Add icon support for Tabs component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.7" date="2025-01-24">
      <ul>
        <li>Increase size for links in MobileMenu component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.6" date="2025-01-24">
      <ul>
        <li>Add <code>hideLabel</code> prop to Checkbox component</li>
        <li>Fix: show label in FileInput component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.5" date="2025-01-23">
      <ul>
        <li>Add <code>placeholderUrl</code> prop to FileInput component</li>
        <li>Expose <code>focusElement</code> in Input component</li>
        <li>
          Rename <code>navList</code> prop to <code>list</code> in MobileMenu
          component
        </li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.4" date="2025-01-22">
      <ul>
        <li>Add <code>iconSize</code> prop to Tooltip component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.3" date="2025-01-22">
      <ul>
        <li>
          Publish <code>@krafters/ui</code> package to
          <NuxtLink
            to="https://www.npmjs.com/package/@krafters/ui"
            target="_blank"
            external
            >NPM</NuxtLink
          >
        </li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.2" date="2025-01-20">
      <ul>
        <li>Add <code>position</code> prop to Dialog component</li>
        <li>Add animations to Dialog component</li>
        <li>Add <code>loading</code> prop to Popover component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry version="1.0.1" date="2025-01-09">
      <ul>
        <li>Fix aria-live for FileInput component</li>
      </ul>
    </ChangelogEntry>

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
