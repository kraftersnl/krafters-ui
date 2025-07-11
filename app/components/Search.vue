<script setup lang="ts">
const model = defineModel<string | number>();

const searchInputRef = useTemplateRef('searchInput');

const {
  hideLabel = true,
  label = undefined,
  placeholder = undefined,
  autocomplete = undefined,
  size = 'lg',
} = defineProps<{
  label?: string;
  placeholder?: string;
  autocomplete?: string;
  autofocus?: boolean;
  hideLabel?: boolean;
  size?: InputSize;
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

const computedSize = computed(() => {
  if (size === 'lg') return 'sm';
  if (size === 'md') return 'xs';
  if (size === 'sm') return 'xs';
  return 'sm';
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
        :size="size"
        :icon="hideLabel ? 'material-symbols:search-rounded' : undefined"
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
        icon="material-symbols:close-rounded"
        :size="computedSize"
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
      :label="$t('general.submit')"
      icon="material-symbols:search-rounded"
      :size="size"
      icon-size="lg"
      hide-label
    />
  </Form>
</template>

<style>
.search-form {
  --column-gap: 0rem;
  flex-grow: 1;
  flex-basis: 240px;
  display: grid;
  align-content: start;
  align-items: end;

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
    /* border-inline-end-color: transparent; */
    border-start-end-radius: 0;
    border-end-end-radius: 0;
    z-index: 1;

    &:focus-visible {
      outline-color: transparent;
      border-color: var(--color-accent);
      /* border-inline-end-color: transparent; */
    }
  }

  .button {
    &[type='submit'] {
      /* color: var(--color-white); */
      /* background-color: var(--color-accent); */
      border-color: var(--color-grey-graphic);
      min-width: 2rem;
      border-end-start-radius: 0;
      border-start-start-radius: 0;
      margin-inline-start: -1px;
    }

    &[type='reset'] {
      z-index: 1;
      position: absolute;
      right: 0.25rem;
      bottom: 0.25rem;
    }
  }
}
</style>
