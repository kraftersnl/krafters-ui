<script setup lang="ts">
useHead({ title: 'Text components' });

const lines = ref(1);
const text = ref(
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi est, amet quae placeat odit officia inventore rerum ad pariatur a minima quos ut deleniti aperiam qui eligendi id dolores distinctio. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa consectetur corrupti ad blanditiis ratione tempora modi labore, esse facilis in eos distinctio aperiam repellendus ab earum qui commodi officiis eveniet. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore similique ex quisquam ab eum deserunt odit ipsum, natus maiores dignissimos ratione nemo. Ab rem laborum ratione nobis nihil dolor quia.',
);

const size = ref<ChipSize>('md');
const fontSize = ref<FontSize>('xs');
const iconSize = ref<FontSize>('md');
const sizeOptions: { value: FontSize; label: string }[] = [
  {
    value: 'xl',
    label: 'xl',
  },
  {
    value: 'lg',
    label: 'lg',
  },
  {
    value: 'md',
    label: 'md',
  },
  {
    value: 'sm',
    label: 'sm',
  },
  {
    value: 'xs',
    label: 'xs',
  },
];
</script>

<template>
  <div class="demo-page text-components-page">
    <h1>Text components</h1>

    <div class="card-cols">
      <Card>
        <div class="section-topbar">
          <h2>Callout</h2>

          <Popover icon="cog">
            <div class="popover-settings-content">
              <h2 class="mbe-1">Props</h2>

              <div class="props-wrapper">
                <Select
                  v-model="fontSize"
                  :options="sizeOptions"
                  label="fontSize"
                  size="sm"
                />
                <Select
                  v-model="iconSize"
                  :options="sizeOptions"
                  label="fontSize"
                  size="sm"
                />

                <code
                  >{{`<Callout
                    :font-size="${fontSize}"
                    :icon-size="${iconSize}"
                  />`}}</code
                >
              </div>
            </div>
          </Popover>
        </div>

        <div class="callouts-grid">
          <Callout
            :font-size="fontSize"
            :icon-size="iconSize"
            color="red"
            role="alert"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Callout>

          <Callout :font-size="fontSize" :icon-size="iconSize" color="orange">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Callout>

          <Callout :font-size="fontSize" :icon-size="iconSize" color="green">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Callout>

          <Callout :font-size="fontSize" :icon-size="iconSize" color="blue">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Callout>

          <Callout
            :font-size="fontSize"
            :icon-size="iconSize"
            color="accent"
            icon="lightning-bolt"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Callout>
        </div>
      </Card>

      <Card
        ><div class="section-topbar">
          <h2>Chip</h2>

          <Popover icon="cog">
            <div class="popover-settings-content">
              <h2 class="mbe-1">Props</h2>

              <div class="props-wrapper">
                <Select
                  v-model="size"
                  :options="sizeOptions"
                  label="fontSize"
                  size="sm"
                />

                <code>{{`<Chip :size="${fontSize}" />`}}</code>
              </div>
            </div>
          </Popover>
        </div>

        <div class="chips-grid">
          <Chip :size="size" icon="check" label="Default" />
          <Chip :size="size" icon="check" label="Accent" color="accent" />
          <Chip :size="size" icon="check" label="Blue" color="blue" />
          <Chip :size="size" icon="check" label="Green" color="green" />
          <Chip :size="size" icon="check" label="Red" color="red" />
          <Chip :size="size" icon="check" label="Orange" color="orange" />
          <Chip :size="size" icon="check" label="Yellow" color="yellow" />
        </div>

        <div class="chips-grid">
          <Chip :size="size" icon="check" variant="outline" label="Default" />
          <Chip
            :size="size"
            icon="check"
            variant="outline"
            label="Accent"
            color="accent"
          />
          <Chip
            :size="size"
            icon="check"
            variant="outline"
            label="Blue"
            color="blue"
          />
          <Chip
            :size="size"
            icon="check"
            variant="outline"
            label="Green"
            color="green"
          />
          <Chip
            :size="size"
            icon="check"
            variant="outline"
            label="Red"
            color="red"
          />
          <Chip
            :size="size"
            icon="check"
            variant="outline"
            label="Orange"
            color="orange"
          />
          <Chip
            :size="size"
            icon="check"
            variant="outline"
            label="Yellow"
            color="yellow"
          />
        </div>
      </Card>
    </div>

    <Card>
      <div class="section-topbar">
        <h2>Ellipsis</h2>

        <Popover icon="cog" :max-width="480">
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
.text-components-page {
  .section-topbar {
    margin-block-end: 1.5rem;
  }
}

.chips-grid {
  margin-inline-end: 2rem;
  display: inline-flex;
  flex-direction: column;
  gap: 0.5rem;

  > * {
    max-width: max-content;
  }
}

.callouts-grid {
  display: inline-grid;
  gap: 1rem;
  margin-inline-end: 1rem;
}
</style>
