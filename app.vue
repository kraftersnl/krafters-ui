<script setup lang="ts">
const file = ref<File>();
const selection = ref();
const isOpen = ref(false);

const list = [
  {
    id: 1,
    name: 'First item',
  },
  {
    id: 2,
    name: 'Second item',
  },
  {
    id: 3,
    name: 'Third item',
  },
];
</script>

<template>
  <div class="playground">
    <h1 class="visuallyhidden">Playground</h1>
    <ThemeSelect />
    <LanguageSelect />
    <br />

    <!-- <Accordion v-model="isOpen" arrow>
      <template #trigger>Accordion Trigger</template>

      <template #content>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa omnis id
        odio! Esse veritatis modi quaerat non praesentium, voluptatibus
        repudiandae quae quos autem doloribus ad perspiciatis eos recusandae
        sapiente nisi.
      </template>
    </Accordion> -->

    <Form>
      <MultiSelect
        v-model="selection"
        required
        searchable
        :options="list"
        value-key="id"
        label-key="name"
        label="MultiSelect Label"
      />
      <!-- <Input required label="Input" /> -->

      <FileInput v-model="file" required name="file" label="File Upload" />

      <Button type="submit" label="Submit" />
    </Form>
  </div>
</template>

<style>
.playground {
  margin: 2rem;
  max-width: 600px;

  > * {
    margin-block: 1rem;
  }
}
</style>
