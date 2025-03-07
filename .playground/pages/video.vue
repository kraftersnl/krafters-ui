<script setup lang="ts">
useHead({ title: 'Skeleton loading | Krafters UI' });

const youtube = ref('https://youtube.com/watch?v=4gPXn45d_8g');
const vimeo = ref('https://vimeo.com/132733629');
</script>

<template>
  <div class="demo-page video-page">
    <h1>VideoPlayer</h1>

    <Card>
      <h2>YouTube</h2>

      <VideoPlayer :url="youtube" />
      <Input v-model="youtube" label="URL" hide-label />
    </Card>

    <Card>
      <h2>Vimeo</h2>

      <VideoPlayer :url="vimeo" />
      <Input v-model="vimeo" label="URL" hide-label />
    </Card>
  </div>
</template>

<style>
.video-page {
  .card {
    display: grid;
    gap: 1rem;

    h2 {
      margin-block-end: 0;
    }
  }
}
</style>
