<script setup lang="ts">
// import '@github/markdown-toolbar-element';

defineProps<{
  textareaId: string;
}>();
</script>

<template>
  <markdown-toolbar :for="textareaId">
    <md-bold>bold</md-bold>
    <!-- <md-header>header</md-header>
    <md-italic>italic</md-italic>
    <md-code>code</md-code>
    <md-link>link</md-link>
    <md-unordered-list>unordered-list</md-unordered-list>
    <md-ordered-list>ordered-list</md-ordered-list>
    <md-image>image</md-image>
    <md-task-list>task-list</md-task-list>
    <md-mention>mention</md-mention>
    <md-ref>ref</md-ref>
    <button data-md-button>Custom button</button> -->
  </markdown-toolbar>
</template>

<style></style>
