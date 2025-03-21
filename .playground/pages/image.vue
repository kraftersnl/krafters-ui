<script setup lang="ts">
useHead({ title: 'Image | Krafters UI' });
</script>

<template>
  <div class="demo-page lazy-image-page">
    <h1>Image</h1>

    <Card>
      <Image src="jared.jpg" hash="LCBDc[tS_4D$${%2oft8RNM_RPt7" />

      <pre><code>{{ `<Image
  src="image.jpg"
  hash="ByFSxWW3ZJWjsxB"
  :aspect-ratio="3 / 2"
/>`}}</code>
      </pre>
    </Card>
  </div>
</template>

<style>
.lazy-image-page {
  .card {
    max-width: 640px;
  }
  .lazy-image {
    border-radius: var(--radius-sm);
  }
}
</style>
