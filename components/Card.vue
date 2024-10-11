<script setup lang="ts"></script>

<template>
  <div class="card">
    <slot />
  </div>
</template>

<style>
.card {
  position: relative;
  padding-block: 2rem;
  padding-inline: 2.5rem;
  background-color: var(--color-card-bg);
  border: 1px solid var(--color-grey-bg);
  border-radius: var(--radius-md);

  h1,
  h2,
  h3,
  h4 {
    margin-block-start: 0;
  }
}
</style>
