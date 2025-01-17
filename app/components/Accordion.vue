<script setup lang="ts">
const isExpanded = defineModel<boolean>();

withDefaults(
  defineProps<{
    minHeight?: number;
    id?: string;
    ariaLabel?: string;
    arrow?: boolean;
    tabindex?: string;
  }>(),
  {
    id: () => useId(),
    minHeight: 0,
    ariaLabel: undefined,
    collapseLabel: 'collapse',
    expandLabel: 'expand',
    tabindex: undefined,
  },
);

const contentRef = useTemplateRef<HTMLElement>('accordionContent');

function toggleAccordion() {
  isExpanded.value = !isExpanded.value;
}

function handleTransitionRun(event: TransitionEvent) {
  if (event.propertyName === 'grid-template-rows' && !isExpanded.value) {
    contentRef.value?.style.setProperty('--overflow', 'hidden');
  }
}

function handleTransitionEnd(event: TransitionEvent) {
  if (event.propertyName === 'grid-template-rows' && isExpanded.value) {
    contentRef.value?.style.removeProperty('--overflow');
  }
}

onMounted(() => {
  if (!isExpanded.value) {
    contentRef.value?.style.setProperty('--overflow', 'hidden');
  }
});

defineExpose({ toggleAccordion });
</script>

<template>
  <div class="accordion-wrapper">
    <button
      :id="`accordion-trigger-${id}`"
      type="button"
      class="accordion-trigger"
      :aria-controls="`accordion-panel-${id}`"
      :aria-expanded="isExpanded"
      :aria-label="ariaLabel"
      :tabindex="tabindex"
      @click.stop="toggleAccordion"
    >
      <Icon
        v-if="arrow"
        name="heroicons-solid:chevron-double-right"
        class="accordion-arrow"
        aria-hidden
      />
      <slot v-if="$slots.trigger" name="trigger" />
      <span v-else class="visuallyhidden">{{ $t('general.expand') }}</span>
    </button>

    <slot />

    <div
      :id="`accordion-panel-${id}`"
      :aria-labelledby="`accordion-trigger-${id}`"
      :aria-hidden="!isExpanded"
      class="accordion-content-wrapper"
      @transitionrun="handleTransitionRun"
      @transitionend="handleTransitionEnd"
    >
      <div
        ref="accordionContent"
        class="accordion-content"
        :style="`--min-height: ${minHeight}px`"
      >
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<style>
.accordion-wrapper {
  border-radius: var(--radius-sm);
}

.accordion-content-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--duration-lg) ease-in-out;
}

.accordion-content {
  overflow: var(--overflow);
  min-height: var(--min-height);
}

.accordion-trigger[aria-expanded='true'] {
  .accordion-arrow {
    rotate: 0.25turn;
  }
  ~ .accordion-content-wrapper {
    grid-template-rows: 1fr;
  }
}

.accordion-trigger {
  position: relative;
  padding-inline: 0;
  background: transparent;
  border: none;
  text-align: left;
  border-radius: var(--radius-xs);
  width: 100%;
  display: flex;
  align-items: center;
  outline-offset: 2px;
  transition-property: color, border-color, outline-offset, outline-color;

  &:focus-visible {
    outline: 1px dotted var(--focus-color);
    border-color: transparent;
  }

  .accordion-arrow {
    position: absolute;
    left: -1.25rem;
    transition: rotate var(--duration-md);
  }
}
</style>
