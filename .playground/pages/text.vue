<script setup lang="ts">
useHead({ title: 'Text components' });

const lines = ref(1);
const text = ref(
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi est, amet quae placeat odit officia inventore rerum ad pariatur a minima quos ut deleniti aperiam qui eligendi id dolores distinctio. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa consectetur corrupti ad blanditiis ratione tempora modi labore, esse facilis in eos distinctio aperiam repellendus ab earum qui commodi officiis eveniet. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore similique ex quisquam ab eum deserunt odit ipsum, natus maiores dignissimos ratione nemo. Ab rem laborum ratione nobis nihil dolor quia.',
);
</script>

<template>
  <div class="demo-page">
    <h1>Text components</h1>

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

    <Card>
      <div class="section-topbar">
        <h2>Ellipsis</h2>

        <Popover icon="cog" hide-label :max-width="480">
          <div class="popover-settings-content">
            <h2>Props</h2>

            <div class="props-wrapper">
              <Input v-model.number="lines" type="number" label="lines" />
              <Textarea v-model="text" label="text" />
              <code>{{`<Ellipsis :lines="${lines}"></Ellipsis>`}}</code>
            </div>
          </div>
        </Popover>
      </div>

      <Ellipsis :lines="lines">{{ text }}</Ellipsis>
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
