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

        <Callout color="accent" icon="lightning-bolt">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Callout>
      </div>
    </Card>

    <Card>
      <h2>Chip</h2>
      <div class="chips-grid">
        <Chip icon="check" label="Default" />
        <Chip icon="check" label="Accent" color="accent" />
        <Chip icon="check" label="Blue" color="blue" />
        <Chip icon="check" label="Green" color="green" />
        <Chip icon="check" label="Red" color="red" />
        <Chip icon="check" label="Orange" color="orange" />
        <Chip icon="check" label="Yellow" color="yellow" />
      </div>

      <div class="chips-grid">
        <Chip icon="check" variant="outline" label="Default" />
        <Chip icon="check" variant="outline" label="Accent" color="accent" />
        <Chip icon="check" variant="outline" label="Blue" color="blue" />
        <Chip icon="check" variant="outline" label="Green" color="green" />
        <Chip icon="check" variant="outline" label="Red" color="red" />
        <Chip icon="check" variant="outline" label="Orange" color="orange" />
        <Chip icon="check" variant="outline" label="Yellow" color="yellow" />
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
  margin-inline-end: 1rem;
}
</style>
