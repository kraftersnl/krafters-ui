<script setup lang="ts">
import { Tippy, type TippyComponent } from 'vue-tippy';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-toward.css';

withDefaults(
  defineProps<{
    placement?: PopperPlacement;
    icon?: string;
    label?: string;
    ariaLabel?: string;
    interactive?: boolean;
    trigger?: string;
    tabindex?: string;
    hideOnClick?: boolean | 'toggle';
    maxWidth?: number | 'none';
  }>(),
  {
    items: () => [],
    placement: 'auto',
    icon: 'question-mark-circle',
    label: undefined,
    ariaLabel: 'Tooltip',
    trigger: 'click',
    tabindex: undefined,
    hideOnClick: true,
    maxWidth: undefined,
  },
);

const tooltipWrapper = useTemplateRef<HTMLElement>('tooltipWrapper');

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
        expanded: false,
      }"
      theme="krafters"
      animation="shift-toward"
      tag="div"
      content-tag="div"
      content-class="krafters-tooltip-content"
      class="tooltip-wrapper"
      :append-to="interactive && tooltipWrapper ? tooltipWrapper : undefined"
      @keyup.esc="closeTooltip"
    >
      <template #default>
        <slot v-if="$slots.trigger" name="trigger" />

        <button
          v-else
          type="button"
          :aria-label="label || ariaLabel"
          :tabindex="tabindex"
          class="tooltip-trigger-button"
        >
          <Icon :name="'heroicons-solid:' + icon" />
        </button>
      </template>

      <template #content>
        <slot />
      </template>
    </Tippy>
  </div>
</template>

<style>
.krafters-tooltip-content {
  padding-block: 1rem;
  padding-inline: 1.35rem;
}

.krafters-tooltip-wrapper {
  height: 1rem;
  vertical-align: middle;

  .tooltip-wrapper {
    height: 1rem;
  }
}

.tooltip-trigger-button {
  border: none;
  background: transparent;
  padding: 0;
  height: 1rem;
  color: var(--color-grey-text);
  transition:
    color var(--duration-sm),
    scale var(--duration-sm);

  &:hover {
    color: var(--color-text);
    &:hover {
      scale: 1.15;
    }
  }

  .iconify {
    width: 1rem;
    height: 1rem;
  }
}
</style>
