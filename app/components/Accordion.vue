<script setup lang="ts">
const isExpanded = defineModel<boolean>();

withDefaults(
  defineProps<{
    minHeight?: number;
    id?: string;
    ariaLabel?: string;
    tabindex?: string;
    arrow?: boolean;
  }>(),
  {
    id: () => useId(),
    minHeight: 0,
    ariaLabel: undefined,
    collapseLabel: 'collapse',
    expandLabel: 'expand',
    tabindex: undefined,
    arrow: true,
  },
);

const panelRef = useTemplateRef<HTMLElement>('accordionPanel');

function toggleAccordion() {
  isExpanded.value = !isExpanded.value;
}

function handleTransitionRun(event: TransitionEvent) {
  if (event.propertyName === 'grid-template-rows' && !isExpanded.value) {
    panelRef.value?.style.setProperty('--overflow', 'hidden');
  }
}

function handleTransitionEnd(event: TransitionEvent) {
  if (event.propertyName === 'grid-template-rows' && isExpanded.value) {
    if (isExpanded.value) {
      panelRef.value?.style.setProperty('--overflow', 'visible');
    } else {
      panelRef.value?.style.setProperty('--overflow', 'hidden');
    }
  }
}

onMounted(() => {
  if (!isExpanded.value) {
    panelRef.value?.style.setProperty('--overflow', 'hidden');
  } else {
    panelRef.value?.style.setProperty('--overflow', 'visible');
  }
});

defineExpose({ toggleAccordion });
</script>

<template>
  <div class="accordion-wrapper">
    <button
      :id="`accordion-trigger-${id}`"
      :aria-controls="`accordion-panel-${id}`"
      :aria-expanded="isExpanded"
      :aria-label="ariaLabel"
      :tabindex="tabindex"
      type="button"
      class="accordion-trigger"
      @click.stop="toggleAccordion"
    >
      <Icon
        v-if="arrow"
        name="heroicons-solid:chevron-right"
        class="accordion-arrow"
        aria-hidden
      />

      <slot v-if="$slots.trigger" name="trigger" mdc-unwrap="p" />

      <span v-else class="visuallyhidden">{{ $t('general.expand') }}</span>
    </button>

    <slot />

    <section
      :id="`accordion-panel-${id}`"
      :aria-labelledby="`accordion-trigger-${id}`"
      :aria-hidden="!isExpanded"
      class="accordion-panel-wrapper"
      @transitionrun="handleTransitionRun"
      @transitionend="handleTransitionEnd"
    >
      <div
        ref="accordionPanel"
        class="accordion-panel"
        :style="`--min-height: ${minHeight}px`"
      >
        <slot name="content" />
      </div>
    </section>
  </div>
</template>

<style>
.accordion-wrapper {
  border-radius: var(--radius-sm);
}

.accordion-panel-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--duration-lg) ease-in-out;
}

.accordion-panel {
  overflow: var(--overflow, hidden);
  min-height: var(--min-height);
}

.accordion-trigger[aria-expanded='true'] {
  .accordion-arrow {
    rotate: 0.25turn;
  }
  ~ .accordion-panel-wrapper {
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

  &:hover {
    .accordion-arrow {
      color: var(--color-accent);
    }
  }

  &:focus-visible {
    outline: 1px dotted var(--focus-color);
    border-color: transparent;
  }

  .accordion-arrow {
    position: absolute;
    left: -1.25rem;
    transition:
      rotate var(--duration-md),
      color var(--duration-sm);
  }
}
</style>
