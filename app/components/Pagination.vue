<script setup lang="ts">
const { pageSizes = [10, 20, 50, 100] } = defineProps<{
  lastPage: number;
  total: number;
  pageSizes?: number[];
  loading?: boolean;
  hidePageSizes?: boolean;
}>();

const { t } = useI18n();

const page = defineModel<number>('page', { default: 1 });
const perPage = defineModel<number>('perPage', { default: 10 });

const computedPageSizes = computed(() => {
  const sizes: { value: number; label: string }[] = [];
  pageSizes.map((item) => {
    sizes.push({
      value: item,
      label: `${item} ${t('pagination.per-page')}`,
    });
  });
  return sizes;
});

function goToPage(pageNumber: number) {
  if (page.value === pageNumber) return;
  if (page.value && page.value < 1) return;

  page.value = pageNumber;
}
</script>

<template>
  <div class="pagination-wrapper">
    <nav class="pagination-nav" :aria-label="$t('pagination.heading')">
      <Button
        icon="chevron-double-left"
        :label="$t('pagination.first-page')"
        hide-label
        size="sm"
        variant="ghost"
        :disabled="loading || page === 1"
        @click="goToPage(1)"
      />

      <Button
        icon="chevron-left"
        :label="$t('pagination.prev-page')"
        hide-label
        size="sm"
        class="prev-page-button"
        :disabled="loading || page <= 1"
        @click="goToPage(page - 1)"
      />

      <div :class="['current-page-wrapper', loading && 'disabled']">
        <Input
          v-model.number="page"
          type="number"
          input-mode="numeric"
          :label="$t('pagination.current-page')"
          :min="1"
          :max="lastPage"
          :disabled="loading"
          hide-label
          size="sm"
          class="pagination-input"
        />
        <span>{{ $t('pagination.of') }} {{ lastPage }}</span>
      </div>

      <Button
        icon="chevron-right"
        :label="$t('pagination.next-page')"
        hide-label
        size="sm"
        class="next-page-button"
        :disabled="loading || page >= lastPage || lastPage <= 1"
        @click="goToPage(page + 1)"
      />

      <Button
        icon="chevron-double-right"
        :label="$t('pagination.last-page')"
        hide-label
        size="sm"
        variant="ghost"
        :disabled="loading || page >= lastPage || lastPage <= 1"
        @click="goToPage(lastPage)"
      />
    </nav>

    <div v-if="!hidePageSizes" class="pagination-page-size">
      <Select
        v-model.number="perPage"
        :options="computedPageSizes"
        :label="$t('pagination.per-page')"
        :disabled="loading"
        hide-label
        size="sm"
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
  gap: 2rem;
  align-items: center;
  margin-block-start: 1rem;
  justify-content: center;

  @media (min-width: 640px) {
    justify-content: space-between;
  }

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
    gap: 0.5rem;

    .select {
      font-size: var(--font-size-sm);
    }
  }
}
</style>
