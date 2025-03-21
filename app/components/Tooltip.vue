<script setup lang="ts">
import { Tippy, type TippyComponent } from 'vue-tippy';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-toward.css';

const props = withDefaults(
  defineProps<{
    placement?: PopperPlacement;
    icon?: string;
    label?: string;
    hideLabel?: boolean;
    interactive?: boolean;
    trigger?: string;
    fontSize?: string;
    iconSize?: string;
    tabindex?: string;
    title?: string;
    hideOnClick?: boolean | 'toggle';
    maxWidth?: number | 'none';
  }>(),
  {
    items: () => [],
    placement: 'auto',
    icon: 'question-mark-circle',
    label: undefined,
    hideLabel: true,
    trigger: 'click',
    fontSize: undefined,
    iconSize: undefined,
    tabindex: undefined,
    title: undefined,
    hideOnClick: true,
    maxWidth: undefined,
  },
);

const id = useId();
const isExpanded = ref(false);

function handleShow() {
  isExpanded.value = true;
}

function handleHide() {
  isExpanded.value = false;
}

const computedIcon = computed(() => {
  if (props.icon?.includes(':')) {
    return props.icon;
  }
  return `heroicons-solid:${props.icon}`;
});

const wrapperRef = useTemplateRef<HTMLElement>('toggletipWrapper');

function closeToggletip() {
  document
    ?.querySelectorAll('[data-tippy-root]')
    ?.forEach((el: Element & { _tippy?: TippyComponent }) => el._tippy?.hide());
}
</script>

<template>
  <div
    ref="toggletipWrapper"
    class="krafters-toggletip-wrapper"
    aria-live="polite"
  >
    <Tippy
      :trigger="trigger"
      :placement="placement"
      :interactive="interactive"
      :hide-on-click="hideOnClick"
      :max-width="maxWidth"
      role=""
      :aria="{
        content: null,
        expanded: false,
      }"
      theme="krafters"
      animation="shift-toward"
      tag="div"
      content-tag="div"
      content-class="krafters-toggletip-content"
      class="toggletip-wrapper"
      :append-to="wrapperRef ?? undefined"
      @show="handleShow"
      @hide="handleHide"
      @keyup.esc="closeToggletip"
    >
      <template #default>
        <slot v-if="$slots.trigger" name="trigger" />

        <button
          v-else
          type="button"
          :aria-controls="id"
          :aria-expanded="isExpanded"
          :tabindex="tabindex"
          :title="title"
          class="toggletip-trigger-button"
          :style="`
            --font-size: var(--font-size-${fontSize});
            --icon-size: var(--font-size-${iconSize});
          `"
        >
          <span :class="`${hideLabel ? 'visuallyhidden' : ''}`">
            {{ label }}
          </span>

          <span class="visuallyhidden">{{ $t('aria.toggletip') }}</span>

          <Icon :name="computedIcon" />
        </button>
      </template>

      <template #content>
        <slot />
      </template>
    </Tippy>
  </div>
</template>

<style>
.krafters-toggletip-wrapper {
  vertical-align: middle;

  .toggletip-wrapper {
    display: inline;
  }
}

.krafters-toggletip-content {
  padding-block: 1rem;
  padding-inline: 1.35rem;

  p {
    &:first-child {
      margin-block-start: 0;
    }
    &:last-child {
      margin-block-end: 0;
    }
  }
}

.toggletip-trigger-button {
  display: flex;
  gap: 0.25rem;
  align-items: center;
  border: none;
  background: transparent;
  padding: 0;
  color: inherit;
  font-size: var(--font-size, inherit);
  transition: color var(--duration-sm);

  &:focus-visible {
    border-radius: var(--radius-sm);
    outline-offset: 2px;
  }

  .iconify {
    font-size: var(--icon-size, var(--font-size));
    transition: color var(--duration-sm);
  }

  &:hover {
    cursor: help;
  }
}
</style>
