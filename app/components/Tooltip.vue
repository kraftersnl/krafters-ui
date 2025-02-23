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

const computedIcon = computed(() => {
  if (props.icon?.includes(':')) {
    return props.icon;
  }
  return `heroicons-solid:${props.icon}`;
});

const wrapperRef = useTemplateRef<HTMLElement>('tooltipWrapper');

function closeTooltip() {
  document
    .querySelectorAll('[data-tippy-root]')
    .forEach((el: Element & { _tippy?: TippyComponent }) => el._tippy?.hide());
}
</script>

<template>
  <div ref="tooltipWrapper" class="krafters-tooltip-wrapper">
    <Tippy
      :trigger="trigger"
      :placement="placement"
      :interactive="interactive"
      :hide-on-click="hideOnClick"
      :max-width="maxWidth"
      :aria="{
        content: 'describedby',
      }"
      theme="krafters"
      animation="shift-toward"
      tag="div"
      content-tag="div"
      content-class="krafters-tooltip-content"
      class="tooltip-wrapper"
      :append-to="wrapperRef ?? undefined"
      @keyup.esc="closeTooltip"
    >
      <template #default>
        <slot v-if="$slots.trigger" name="trigger" />

        <button
          v-else
          type="button"
          :tabindex="tabindex"
          :title="title"
          class="tooltip-trigger-button"
          :style="`
            --font-size: var(--font-size-${fontSize});
            --icon-size: var(--font-size-${iconSize});
          `"
        >
          <span :class="`${hideLabel ? 'visuallyhidden' : ''}`">
            {{ label }}
          </span>

          <span class="visuallyhidden">({{ $t('aria.tooltip') }})</span>

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
.krafters-tooltip-wrapper {
  vertical-align: middle;
}

.krafters-tooltip-content {
  padding-block: 1rem;
  padding-inline: 1.35rem;
}

.tooltip-trigger-button {
  display: flex;
  gap: 0.25rem;
  align-items: center;
  border: none;
  background: transparent;
  padding: 0;
  color: inherit;
  font-size: var(--font-size, inherit);
  transition: color var(--duration-sm);

  .iconify {
    font-size: var(--icon-size, var(--font-size));
    /* color: var(--color-grey-graphic); */
    transition: color var(--duration-sm);
  }

  &:hover {
    cursor: help;

    .iconify {
      color: var(--color-text);
    }
  }
}
</style>
