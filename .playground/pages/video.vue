<script setup lang="ts">
useHead({ title: 'Video Player | Krafters UI' });

const youtube = ref('https://youtube.com/watch?v=2oiBKSjOOFE');
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
    max-width: 640px;
    display: grid;
    gap: 1rem;

    h2 {
      margin-block-end: 0;
    }
  }
}
</style>
