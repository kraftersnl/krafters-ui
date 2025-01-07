<script setup lang="ts">
const model = defineModel<string | number>();

const { hideLabel = true } = defineProps<{
  label?: string;
  placeholder?: string;
  hideLabel?: boolean;
}>();

function handleSearch() {
  emit('submit', model.value);
}

function handleReset() {
  model.value = '';
  emit('reset', model.value);
}

const emit = defineEmits(['update:model-value', 'submit', 'reset']);
</script>

<template>
  <Form role="search" class="search-form" @submit="handleSearch">
    <div class="search-input-wrapper">
      <Input
        v-model="model"
        type="search"
        size="lg"
        :icon="hideLabel ? 'search' : undefined"
        :placeholder="placeholder"
        :label="label || $t('general.search')"
        :hide-label="hideLabel"
        @update:model-value="emit('update:model-value', $event)"
      />

      <Button
        v-if="model"
        type="reset"
        :title="$t('general.reset')"
        icon="refresh"
        size="sm"
        variant="ghost"
        @click="handleReset"
      />
    </div>

    <Button
      type="submit"
      variant="primary"
      :label="$t('general.submit')"
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
  align-items: end;
  gap: 0.5rem;
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
      bottom: 0.25rem;
    }
  }
}
</style>
