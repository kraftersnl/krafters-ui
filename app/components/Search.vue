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
  position: relative;
  flex-grow: 1;
  flex-basis: 240px;
  display: grid;
  align-content: end;
  align-items: end;

  &:has(.button[type='submit']) {
    grid-template-columns: 1fr auto;
  }

  .form-field-wrapper {
    width: 100%;
  }

  .search-input-wrapper {
    display: flex;
  }

  input[type='search'] {
    padding-inline-end: 4.25rem;

    &::-webkit-search-cancel-button {
      appearance: none;
    }
  }

  .button {
    &[type='submit'] {
      position: absolute;
      z-index: 1;
      right: 0;
      bottom: 0;
      color: var(--color-white);
      background-color: var(--color-text);
      border-color: var(--color-text);
      min-width: 2rem;
      border-end-start-radius: 0;
      border-start-start-radius: 0;
      margin-inline-start: -1px;
      outline-offset: -1px;
      transition-duration: 0s;

      &:focus-visible {
        background-color: var(--color-black);
        outline-offset: 1px;
        z-index: 1;
      }

      &:disabled {
        opacity: 1;
        color: var(--color-grey-graphic);
        background-color: var(--color-grey-bg);
      }
    }

    &[type='reset'] {
      z-index: 1;
      position: absolute;
      right: 2.75rem;
      bottom: 0.25rem;
    }
  }

  &:has(input[type='search']:focus-visible) {
    .button[type='submit'] {
      border-color: var(--focus-color);

      &:not(:disabled) {
        background-color: var(--focus-color);
      }
    }
  }

  .input-size--sm {
    + .button[type='reset'] {
      bottom: 0.25rem;
      right: 2.25rem;
    }
  }
  .input-size--md {
    + .button[type='reset'] {
      bottom: 0.375rem;
      right: 2.5rem;
    }
  }
  .input-size--lg {
    + .button[type='reset'] {
      bottom: 0.25rem;
      right: 2.75rem;
    }
  }
}
</style>
