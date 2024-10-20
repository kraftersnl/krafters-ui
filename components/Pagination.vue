<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    page: number;
    lastPage: number;
    total: number;
    perPage: number;
    pageSizes?: number[];
    loading?: boolean;
  }>(),
  {
    pageSize: 10,
    pageSizes: () => [10, 20, 50, 100],
  },
);

const { t } = useI18n();

const currentPage = computed({
  get: () => props.page,
  set: (value: number) => emit('update:page', value),
});

const computedPageSize = computed({
  get: () => props.perPage,
  set: (value: number) => emit('update:per-page', value),
});

const computedPageSizes = computed(() => {
  const sizes: { value: number; label: string }[] = [];
  props.pageSizes.map((item) => {
    sizes.push({
      value: item,
      label: `${item} ${t('pagination.per-page')}`,
    });
  });
  return sizes;
});

function goToPage(pageNumber: number) {
  if (currentPage.value === pageNumber) return;
  if (currentPage.value < 1) return;
  if (currentPage.value > props.lastPage) return;

  currentPage.value = pageNumber;
}

const emit = defineEmits(['update:page', 'update:per-page']);
</script>

<template>
  <div class="pagination-wrapper">
    <div class="pagination-nav">
      <Button
        icon="chevron-double-left"
        :label="$t('pagination.first-page')"
        hide-label
        variant="ghost"
        :disabled="loading || page === 1"
        @click.stop="goToPage(1)"
      />

      <Button
        icon="chevron-left"
        :label="$t('pagination.prev-page')"
        hide-label
        class="prev-page-button"
        :disabled="loading || page <= 1 || lastPage <= 1"
        @click.stop="goToPage(currentPage - 1)"
      />

      <div :class="`current-page-wrapper ${loading ? 'disabled' : ''}`">
        <Input
          v-model.number="currentPage"
          type="number"
          input-mode="numeric"
          :label="$t('pagination.page')"
          :min="1"
          :max="lastPage"
          :disabled="loading"
          hide-label
          class="pagination-input"
        />
        <span>{{ $t('pagination.of') }} {{ lastPage }}</span>
      </div>

      <Button
        icon="chevron-right"
        :label="$t('pagination.next-page')"
        hide-label
        class="next-page-button"
        :disabled="loading || page >= lastPage || lastPage <= 1"
        @click.stop="goToPage(currentPage + 1)"
      />

      <Button
        icon="chevron-double-right"
        :label="$t('pagination.last-page')"
        hide-label
        variant="ghost"
        :disabled="loading || page >= lastPage || lastPage <= 1"
        @click.stop="goToPage(lastPage)"
      />
    </div>

    <div class="pagination-page-size">
      <Select
        v-model.number="computedPageSize"
        :options="computedPageSizes"
        :label="$t('pagination.per-page')"
        :disabled="loading"
        hide-label
      />
    </div>
  </div>
</template>

<style>
.pagination-wrapper {
  width: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
  margin-block-start: var(--size-4xs);

  .pagination-nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.25rem;
  }

  .current-page-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-grey-text);
    margin-inline: 1rem;
    user-select: none;
    -webkit-user-select: none;

    span {
      white-space: nowrap;
    }

    &.disabled {
      color: var(--color-grey-graphic);
    }
  }

  .pagination-input {
    input[type='number'] {
      appearance: textfield;
      -moz-appearance: textfield;
      max-width: 3rem;
    }

    input[type='number']::-webkit-outer-spin-button,
    input[type='number']::-webkit-inner-spin-button {
      appearance: none;
      -webkit-appearance: none;
      margin: 0;
    }
  }

  .pagination-page-size {
    display: flex;
    align-items: center;
    gap: var(--size-4xs);

    .select-container select {
      font-size: var(--font-size-xxs);
    }
  }
}
</style>
