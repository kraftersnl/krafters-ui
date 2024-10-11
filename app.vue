<script setup lang="ts">
const file = ref<File>();
</script>

<template>
  <ThemeSelect />
  <!-- <LanguageSelect /> -->

  <Form>
    <!-- <Input required label="Input" /> -->
    <FileInput v-model="file" required name="file" label="File Upload" />
    <Button type="submit" label="Submit" />
  </Form>
</template>

<style>
body {
  margin: 2rem;
}
</style>
