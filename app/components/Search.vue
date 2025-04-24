<script setup lang="ts">
const model = defineModel<string | number>();

const searchInputRef = useTemplateRef('searchInput');

const { hideLabel = true } = defineProps<{
  label?: string;
  placeholder?: string;
  autocomplete?: string;
  autofocus?: boolean;
  hideLabel?: boolean;
  hideSubmitButton?: boolean;
}>();

function handleSearch() {
  emit('submit', model.value);
}

function handleReset() {
  model.value = '';
  emit('reset', model.value);
  searchInputRef.value?.focusElement();
}

function focusElement() {
  searchInputRef.value?.focusElement();
}

defineExpose({
  searchInputRef,
  focusElement,
});

const emit = defineEmits<{
  submit: [value?: string | number];
  reset: [value: string | number];
}>();
</script>

<template>
  <Form role="search" class="search-form" @submit="handleSearch">
    <div class="search-input-wrapper">
      <Input
        ref="searchInput"
        v-model="model"
        type="search"
        size="lg"
        :icon="hideLabel ? 'search' : undefined"
        :placeholder="placeholder"
        :label="label || $t('general.search')"
        :hide-label="hideLabel"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
      />

      <Button
        v-if="model"
        type="reset"
        :title="$t('general.reset')"
        icon="x"
        size="sm"
        icon-size="md"
        hide-label
        variant="ghost"
        @click="handleReset"
      />
    </div>

    <Button
      v-if="!hideSubmitButton"
      type="submit"
      :disabled="!model"
      variant="secondary"
      :label="$t('general.submit')"
      icon="search"
      size="lg"
      icon-size="lg"
      hide-label
    />
  </Form>
</template>

<style>
.search-form {
  flex-grow: 1;
  flex-basis: 240px;
  display: grid;
  align-items: end;
  gap: 0.5rem;

  &:has(.button[type='submit']) {
    grid-template-columns: 1fr auto;
  }

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
