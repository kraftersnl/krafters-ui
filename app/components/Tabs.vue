<script setup lang="ts">
const model = defineModel<string>();

const props = withDefaults(
  defineProps<{
    tabs: TabOption[];
    size?: 'xs' | 'sm' | 'md';
    variant?: 'default' | 'minimal';
    ariaLabel?: string;
  }>(),
  {
    size: 'sm',
    variant: 'default',
    ariaLabel: undefined,
  },
);

const tabElements = ref<HTMLButtonElement[]>([]);

function handlePrevTab(tab: TabOption) {
  tabElements.value = tabElements.value.filter((x) => !x.disabled);
  const enabledTabs = props.tabs.filter((x) => !x.disabled);
  const currentIndex: number = enabledTabs.findIndex((x) => x === tab);
  let prevIndex: number;

  if (currentIndex === 0) {
    prevIndex = enabledTabs.length - 1;
  } else {
    prevIndex = currentIndex - 1;
  }

  const prevTab = tabElements.value[prevIndex];
  prevTab?.focus();
  prevTab?.click();
}

function handleNextTab(tab: TabOption) {
  tabElements.value = tabElements.value.filter((x) => !x.disabled);
  const enabledTabs = props.tabs.filter((x) => !x.disabled);
  const currentIndex: number = enabledTabs.findIndex((x) => x === tab);
  let nextIndex: number;

  if (currentIndex === enabledTabs.length - 1) {
    nextIndex = 0;
  } else {
    nextIndex = currentIndex + 1;
  }

  const nextTab = tabElements.value[nextIndex];
  nextTab?.focus();
  nextTab?.click();
}

const activeTab = computed({
  get: () => model.value,
  set: (value) => (model.value = value),
});

function setActiveTab(tab: TabOption) {
  activeTab.value = tab.value;
}

defineExpose({
  setActiveTab,
});
</script>

<template>
  <div :class="`tabs-wrapper tabs-variant--${variant} tabs-size--${size}`">
    <div
      class="tabs-list"
      role="tablist"
      :aria-label="ariaLabel"
      v-bind="$attrs"
    >
      <template v-for="tab in tabs" :key="'tab-' + tab.value">
        <button
          :id="`tab-${tab.value}`"
          ref="tabElements"
          type="button"
          class="tab"
          role="tab"
          :aria-selected="tab.value === activeTab"
          :tabindex="tab.value === activeTab ? '0' : '-1'"
          :aria-controls="tab.value"
          :disabled="tab.disabled"
          @keyup.left="handlePrevTab(tab)"
          @keyup.right="handleNextTab(tab)"
          @click="setActiveTab(tab)"
        >
          <div class="tab__text">{{ tab.label }}</div>
        </button>
      </template>
    </div>

    <slot name="top" />

    <template v-for="tab in tabs" :key="tab.value">
      <div
        v-show="tab.value === activeTab"
        :id="tab.value"
        :aria-labelledby="`tab-${tab.value}`"
        tabindex="-1"
        role="tabpanel"
        class="tabpanel"
      >
        <slot :name="tab.value" />
      </div>
    </template>

    <slot name="bottom" />
  </div>
</template>

<style>
.tabs-wrapper {
  .tabpanel {
    padding-block-start: 1.5rem;
  }
}

.tabs-list {
  flex-wrap: wrap;
  align-items: center;

  .tab {
    -webkit-user-select: none;
    user-select: none;
    cursor: pointer;
    font-weight: 500;
    background: transparent;
    border: none;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    padding-inline: 0;
    padding-block-end: 0.65rem;
    border-block-end: 2px solid var(--color-grey-bg);
    outline-color: transparent;
    transition-property: color, background-color, box-shadow, outline-color,
      outline-offset;
    transition-duration: var(--duration-s);
    transition-timing-function: ease-in-out;

    &:hover {
      color: var(--color-text);
      border-color: var(--color-grey-graphic);
    }

    &[aria-selected='true'] {
      color: var(--color-green);
      border-color: var(--color-green);
    }

    &:disabled {
      pointer-events: none;
      opacity: 0.35;
      border-color: transparent;
    }
  }

  &:has(:focus-visible) {
    outline-offset: 0.5rem;
    outline: 2px solid var(--focus-color);
    border-radius: var(--radius-xs);
  }
}

/* Tabs variants */
.tabs-variant--default {
  .tabs-list {
    display: flex;
    border-block-end: 1px solid var(--color-grey-bg);
  }

  .tab {
    border-width: 1px;
    margin-block-end: -0.0625rem;
  }
}

.tabs-variant--minimal {
  .tabs-list {
    display: inline-flex;
  }
}

/* Tabs sizes */
.tabs-size--xs {
  .tabs-list {
    font-size: var(--font-size-xs);
    gap: 1.5rem;
  }
}

.tabs-size--sm {
  .tabs-list {
    font-size: var(--font-size-sm);
    gap: 2rem;
  }
}

.tabs-size--md {
  .tabs-list {
    font-size: var(--font-size-md);
    gap: 2.5rem;
  }
}
</style>
