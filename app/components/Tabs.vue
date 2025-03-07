<script setup lang="ts">
const model = defineModel<string>();

const props = withDefaults(
  defineProps<{
    tabs: TabOption[];
    size?: TabsSize;
    fontSize?: FontSize;
    variant?: TabsVariant;
    color?: 'green' | 'accent';
    ariaLabel?: string;
  }>(),
  {
    size: 'sm',
    fontSize: 'sm',
    variant: 'default',
    color: 'green',
    ariaLabel: undefined,
    icon: undefined,
  },
);

function computeIcon(tab: TabOption) {
  if (!tab.icon) return '';
  if (tab.icon?.includes(':')) {
    return tab.icon;
  }
  return `heroicons-solid:${tab.icon}`;
}

const tabElements = ref<HTMLButtonElement[]>([]);
const tabpanelRef = useTemplateRef('tabpanel');

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

function focusTabpanel() {
  tabpanelRef.value?.focus();
}

defineExpose({
  setActiveTab,
  focusTabpanel,
});
</script>

<template>
  <div
    :class="`
      tabs-wrapper
      tabs-variant--${variant}
      tabs-color--${color}
      tabs-size--${size}
    `"
    :style="`
      --font-size: var(--font-size-${fontSize});
    `"
  >
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
          <Icon v-if="computeIcon(tab)" :name="computeIcon(tab)" />
          <span class="tab__text">{{ tab.label }}</span>
        </button>
      </template>
    </div>

    <slot name="top" />

    <div ref="tabpanel" class="tabpanel-wrapper" tabindex="-1">
      <template v-for="tab in tabs" :key="tab.value">
        <div
          v-show="tab.value === activeTab"
          :id="tab.value"
          :aria-labelledby="`tab-${tab.value}`"
          role="tabpanel"
          class="tabpanel"
          tabindex="-1"
        >
          <slot :name="tab.value" />
        </div>
      </template>
    </div>

    <slot name="bottom" />
  </div>
</template>

<style>
.tabs-wrapper {
  .tabpanel-wrapper {
    outline: 1px solid transparent;
  }

  .tabpanel {
    padding-block-start: 1.5rem;
  }
}

.tabs-list {
  font-size: var(--font-size, var(--font-size-sm));
  flex-wrap: wrap;
  align-items: center;

  .tab {
    position: relative;
    -webkit-user-select: none;
    user-select: none;
    font-weight: var(--font-weight-medium);
    background: transparent;
    border: none;
    display: flex;
    gap: 0.25rem;
    text-align: center;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    padding-inline: 0;
    padding-block-end: 0.65rem;
    border-block-end: 1px solid var(--color-grey-bg);
    transition-property:
      color, background-color, box-shadow, outline-color, outline-offset;
    transition-duration: var(--duration-s);
    transition-timing-function: ease-in-out;

    /* disable focus outline on tab */
    outline-color: transparent;

    .iconify {
      color: var(--color-grey-graphic);
    }

    &:hover {
      color: var(--color-text);
      border-color: var(--color-grey-graphic);

      .iconify {
        color: var(--color-grey-text);
      }
    }

    &[aria-selected='true'] {
      border-color: var(--color-text);

      .iconify {
        color: inherit;
        opacity: 65%;
      }
    }

    &:disabled {
      pointer-events: none;
      opacity: 0.35;
      border-color: transparent;
    }
  }

  /* show focus outline on tab list */
  &:has(:focus-visible) {
    outline-offset: 2px;
    outline: 2px solid var(--focus-color);
    border-radius: var(--radius-xs);
  }
}

/* Tabs variants */
.tabs-variant--default {
  > .tabs-list {
    display: flex;
    border-block-end: 1px solid var(--color-grey-bg);

    .tab {
      margin-block-end: -0.0625rem;
    }
  }
}

.tabs-variant--minimal {
  > .tabs-list {
    display: inline-flex;

    .tab {
      border-width: 2px;
    }
  }
}

.tabs-color--green {
  .tabs-list .tab[aria-selected='true'] {
    color: var(--color-green);
    border-color: var(--color-green);
  }
}

.tabs-color--accent {
  .tabs-list .tab[aria-selected='true'] {
    color: var(--color-accent);
    border-color: var(--color-accent);
  }
}

/* Tabs sizes */
.tabs-size--xs {
  .tabs-list {
    gap: 1.5rem;
  }
}

.tabs-size--sm {
  .tabs-list {
    gap: 2rem;
  }
}

.tabs-size--md {
  .tabs-list {
    gap: 2.5rem;
  }
}
</style>
