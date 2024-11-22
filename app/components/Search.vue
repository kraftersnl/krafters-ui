<script setup lang="ts">
defineProps<{
  placeholder?: string;
}>();

const searchTerm = ref();

function handleSearch() {
  emit('submit', searchTerm.value);
}

function handleReset() {
  searchTerm.value = undefined;
  emit('reset', searchTerm.value);
}

const emit = defineEmits(['update:model-value', 'submit', 'reset']);
</script>

<template>
  <Form role="search" class="search-form" @submit="handleSearch">
    <div class="search-input-wrapper">
      <Input
        v-model="searchTerm"
        type="search"
        size="lg"
        icon="search"
        :placeholder="placeholder"
        :label="$t('general.search')"
        hide-label
        @update:model-value="emit('update:model-value', $event)"
      />

      <Button
        v-if="searchTerm"
        type="reset"
        :label="$t('general.reset')"
        hide-label
        icon="refresh"
        size="sm"
        variant="ghost"
        @click="handleReset"
      />
    </div>

    <Button
      type="submit"
      variant="primary"
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

  .form-field-wrapper {
    width: 100%;
  }

  .search-input-wrapper {
    position: relative;
  }

  input[type='search'] {
    &::-webkit-search-cancel-button {
      appearance: none;
    }
  }

  .button {
    &[type='reset'] {
      z-index: 1;
      position: absolute;
      right: 0.25rem;
      top: 0.25rem;
    }
  }
}
</style>
