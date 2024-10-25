<script setup lang="ts">
const selection = ref();

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
  <h1>Playground</h1>

  <ThemeSelect />
  <LanguageSelect />
  <br /><br />

  <Search />

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
  </Form>

  <!-- <Accordion v-model="isOpen" arrow>
    <template #trigger>Accordion Trigger</template>

    <template #content>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa omnis id
      odio! Esse veritatis modi quaerat non praesentium, voluptatibus
      repudiandae quae quos autem doloribus ad perspiciatis eos recusandae
      sapiente nisi.
    </template>
  </Accordion> -->

  <!-- <Form>
    <Input required label="Input" />
    <FileInput v-model="file" required name="file" label="File Upload" />
    <Button type="submit" label="Submit" />
  </Form> -->
</template>

<style>
body {
  margin: 2rem;
}

.accordion-wrapper {
  max-width: 240px;
}
</style>
