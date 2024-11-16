<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: string;
    tabs: TabOption[];
    ariaLabel?: string;
  }>(),
  {
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
  get: () => props.modelValue,
  set: (value) => {
    // navigateTo({ query: { tab: value }, replace: true });
    emit('update:model-value', value);
  },
});

function setActiveTab(tab: TabOption) {
  activeTab.value = tab.value;
}

defineExpose({
  setActiveTab,
});
const emit = defineEmits(['update:model-value']);
</script>

<template>
  <div class="tabs-wrapper">
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
        tabindex="0"
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
    text-align: left;
  }
}

.tabs-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
  border-bottom: 1px solid var(--color-grey-bg);
  padding-block-end: 0.5rem;
  margin-block-end: 1.5rem;

  .tab {
    -webkit-user-select: none;
    user-select: none;
    cursor: pointer;
    font-size: var(--font-size-sm);
    font-weight: 500;
    background: transparent;
    border: none;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    color: var(--color-grey-text);
    padding-inline: 0;
    border-radius: var(--radius-xs);
    outline: 2px solid transparent;
    transition-property: color, background-color, box-shadow, outline-color,
      outline-offset;
    transition-duration: var(--duration-s);
    transition-timing-function: ease-in-out;

    &:hover {
      color: var(--color-text);
    }

    &[aria-selected='true'] {
      color: var(--color-green);
      text-decoration: underline;
      text-underline-offset: 0.95rem;
    }

    &:focus-visible {
      text-decoration: none;
      outline-offset: 2px;
      outline: 2px solid var(--focus-color);
    }

    &:disabled {
      pointer-events: none;
      opacity: 0.35;
    }
  }
}
</style>
