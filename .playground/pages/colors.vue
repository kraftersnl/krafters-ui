<script setup lang="ts">
useHead({ title: 'Colors' });
</script>

<template>
  <div class="demo-page">
    <h1>Colors</h1>

    <Card>
      <h2>Primary</h2>
      <div class="color-swatches-grid">
        <ColorSwatch color="accent" />
        <ColorSwatch color="accent-bg" />
        <ColorSwatch color="accent-text" />
      </div>

      <h2>Neutral</h2>
      <div class="color-swatches-grid">
        <ColorSwatch color="white" />
        <ColorSwatch color="grey-bg" />
        <ColorSwatch color="grey-graphic" />
        <ColorSwatch color="grey-text" />
        <ColorSwatch color="text" />
        <ColorSwatch color="black" />
      </div>

      <h2>Base</h2>
      <div class="color-swatches-grid">
        <ColorSwatch color="red" />
        <ColorSwatch color="orange" />
        <ColorSwatch color="yellow" />
        <ColorSwatch color="green" />
        <ColorSwatch color="blue" />
        <ColorSwatch color="purple" />
      </div>

      <h2>Base background</h2>
      <div class="color-swatches-grid">
        <ColorSwatch color="red-bg" />
        <ColorSwatch color="orange-bg" />
        <ColorSwatch color="yellow-bg" />
        <ColorSwatch color="green-bg" />
        <ColorSwatch color="blue-bg" />
        <ColorSwatch color="purple-bg" />
      </div>

      <h2>Base text</h2>
      <div class="color-swatches-grid">
        <ColorSwatch color="red-text" />
        <ColorSwatch color="orange-text" />
        <ColorSwatch color="yellow-text" />
        <ColorSwatch color="green-text" />
        <ColorSwatch color="blue-text" />
        <ColorSwatch color="purple-text" />
      </div>
    </Card>
  </div>
</template>

<style>
.color-swatches-grid {
  margin-block: 1rem 3rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  padding-inline: 1rem;
}
</style>
