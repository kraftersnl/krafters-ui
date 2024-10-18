<script setup lang="ts">
const file = ref<File>();
const isOpen = ref(false);
</script>

<template>
  <ThemeSelect />
  <LanguageSelect />

  <Accordion v-model="isOpen" arrow>
    <template #trigger>Accordion Trigger</template>

    <template #content>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa omnis id
      odio! Esse veritatis modi quaerat non praesentium, voluptatibus
      repudiandae quae quos autem doloribus ad perspiciatis eos recusandae
      sapiente nisi.
    </template>
  </Accordion>

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
