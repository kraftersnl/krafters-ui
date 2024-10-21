<script setup lang="ts">
defineProps<{
  placeholder?: string;
}>();

const searchTerm = ref();

function handleSearch() {
  emit('submit', searchTerm.value);
}

const emit = defineEmits(['update:model-value', 'submit']);
</script>

<template>
  <Form role="search" class="search-form" @submit="handleSearch">
    <Input
      v-model="searchTerm"
      type="search"
      :placeholder="$t('general.search')"
      :label="$t('general.search')"
      hide-label
      @update:model-value="emit('update:model-value', $event)"
    />

    <Button
      type="submit"
      :label="$t('general.search')"
      icon="search"
      size="lg"
      hide-label
    />
  </Form>
</template>

<style>
.search-form {
  flex-grow: 1;
  display: grid;
  gap: 0.25rem;
  grid-template-columns: 1fr auto;

  .button {
    border-radius: var(--radius-sm);
    border: 1px solid var(--color-grey-graphic);
  }
}
</style>
