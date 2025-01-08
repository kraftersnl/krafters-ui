<script setup lang="ts">
useHead({ title: 'Alert messages | Krafters UI' });
</script>

<template>
  <div class="demo-page">
    <h1>Alerts</h1>

    <Card>
      <h2>Callout</h2>
      <div class="callouts-grid">
        <Callout color="red" role="alert">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Callout>

        <Callout color="orange">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Callout>

        <Callout color="green">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Callout>

        <Callout color="blue">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Callout>
      </div>
    </Card>

    <Card>
      <h2>Chip</h2>
      <div class="chips-grid">
        <Chip label="Default" />
        <Chip label="Accent" color="accent" />
        <Chip label="Blue" color="blue" />
        <Chip label="Green" color="green" />
        <Chip label="Red" color="red" />
        <Chip label="Orange" color="orange" />
        <Chip label="Yellow" color="yellow" />
      </div>

      <div class="chips-grid">
        <Chip variant="outline" label="Default" />
        <Chip variant="outline" label="Accent" color="accent" />
        <Chip variant="outline" label="Blue" color="blue" />
        <Chip variant="outline" label="Green" color="green" />
        <Chip variant="outline" label="Red" color="red" />
        <Chip variant="outline" label="Orange" color="orange" />
        <Chip variant="outline" label="Yellow" color="yellow" />
      </div>
    </Card>
  </div>
</template>

<style>
.chips-grid {
  margin-block-start: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.callouts-grid {
  display: inline-grid;
  gap: 1rem;
}
</style>
