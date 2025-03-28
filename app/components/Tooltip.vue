<script setup lang="ts">
import { Tippy, type TippyComponent } from 'vue-tippy';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-toward.css';

const props = withDefaults(
  defineProps<{
    trigger?: string;
    interactive?: boolean;
    hideOnClick?: boolean | 'toggle';
    placement?: PopperPlacement;
    icon?: string;
    label?: string;
    hideLabel?: boolean;
    fontSize?: string;
    iconSize?: string;
    tabindex?: string;
    title?: string;
    maxWidth?: number | 'none';
    id?: string;
  }>(),
  {
    items: () => [],
    placement: 'auto',
    trigger: 'click',
    hideOnClick: true,
    interactive: true,
    icon: 'question-mark-circle',
    label: undefined,
    hideLabel: true,
    fontSize: undefined,
    iconSize: undefined,
    tabindex: undefined,
    title: undefined,
    maxWidth: undefined,
    id: () => useId(),
  },
);

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
    class="toggletip-wrapper"
    aria-live="polite"
    @keyup.esc="closeToggletip"
  >
    <Tippy
      :trigger="trigger"
      :placement="placement"
      :interactive="interactive"
      :hide-on-click="hideOnClick"
      :max-width="maxWidth"
      :aria="{
        // disable in favor of own solution
        content: null,
        expanded: false,
      }"
      :aria-expanded="isExpanded"
      :aria-controls="'toggletip-content-' + id"
      role=""
      tag="button"
      type="button"
      content-tag="div"
      content-class="toggletip-content"
      theme="krafters"
      animation="shift-toward"
      class="toggletip-trigger-button"
      :append-to="wrapperRef ?? undefined"
      :tabindex="tabindex"
      :title="title"
      :style="`
        ${fontSize ? `--font-size: var(--font-size-${fontSize});` : ''}
        ${iconSize ? `--icon-size: var(--font-size-${iconSize});` : ''}
      `"
      @show="handleShow"
      @hide="handleHide"
    >
      <template #default>
        <slot v-if="$slots.trigger" name="trigger" />

        <template v-else>
          <span
            :id="'toggletip-label-' + id"
            :class="`${hideLabel ? 'visuallyhidden' : ''}`"
          >
            {{ label }}
          </span>

          <span class="visuallyhidden">({{ $t('aria.toggletip') }})</span>

          <Icon :name="computedIcon" />
        </template>
      </template>

      <template #content>
        <div :id="'toggletip-content-' + id">
          <slot />
        </div>
      </template>
    </Tippy>
  </div>
</template>

<style>
.toggletip-content {
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
    font-size: var(--icon-size, inherit);
    transition: color var(--duration-sm);
  }

  &:hover {
    cursor: help;
  }
}
</style>
