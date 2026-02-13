<script setup lang="ts">
import { Tippy } from 'vue-tippy';
import type { TippyComponent } from 'vue-tippy';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-toward.css';

const {
  label = undefined,
  fontSize = undefined,
  iconSize = undefined,
  iconColor = undefined,
  tabindex = undefined,
  title = undefined,
  maxWidth = undefined,
  offset = undefined,
  placement = 'auto',
  trigger = 'click',
  hideLabel = true,
  hideOnClick = true,
  interactive = true,
  icon = 'material-symbols:help-outline-rounded',
  id = useId(),
} = defineProps<{
  label?: string;
  fontSize?: string;
  iconSize?: string;
  iconColor?: string;
  trigger?: string;
  interactive?: boolean;
  hideOnClick?: boolean | 'toggle';
  placement?: PopperPlacement;
  offset?: [number, number];
  icon?: string;
  hideLabel?: boolean;
  tabindex?: string;
  title?: string;
  maxWidth?: number | 'none';
  id?: string;
}>();

const computedStyle = computed(() => ({
  '--font-size': fontSize && `var(--font-size-${fontSize})`,
  '--icon-size': iconSize && `var(--font-size-${iconSize})`,
  '--icon-color': iconColor && `var(--color-${iconColor})`,
}));

const isExpanded = ref(false);

function handleShow() {
  isExpanded.value = true;
}

function handleHide() {
  isExpanded.value = false;
}

const wrapperRef = useTemplateRef<HTMLElement>('toggletipWrapper');

onMounted(() => {
  document.addEventListener('keydown', (event) => preventEscape(event));
});

onUnmounted(() => document.removeEventListener('keydown', preventEscape));

function preventEscape(event: KeyboardEvent) {
  if (event.key === 'Escape' && isExpanded.value) {
    event.preventDefault();
  }
}

function closeToggletip() {
  document
    ?.querySelectorAll('[data-tippy-root]')
    ?.forEach((el: Element & { _tippy?: TippyComponent }) => el._tippy?.hide());
}
</script>

<template>
  <div
    ref="toggletipWrapper"
    class="tooltip-wrapper"
    aria-live="polite"
    @keyup.esc="closeToggletip"
  >
    <Tippy
      :trigger="trigger"
      :placement="placement"
      :interactive="interactive"
      :hide-on-click="hideOnClick"
      :max-width="maxWidth"
      :offset="offset"
      :aria="{
        // disable in favor of own solution
        content: null,
        expanded: false,
      }"
      :aria-expanded="isExpanded"
      :aria-controls="'tooltip-content-' + id"
      role=""
      tag="button"
      type="button"
      content-tag="div"
      content-class="tooltip-content"
      theme="krafters"
      animation="shift-toward"
      class="tooltip-trigger-button"
      :append-to="wrapperRef ?? undefined"
      :tabindex="tabindex"
      :title="title"
      :style="computedStyle"
      @show="handleShow"
      @hide="handleHide"
    >
      <template #default>
        <slot v-if="$slots.trigger" name="trigger" />

        <template v-else>
          <span
            v-if="label && hideLabel"
            :id="'tooltip-label-' + id"
            class="icon-only visuallyhidden"
          >
            {{ $t('aria.more-info-about', { label }) }}
          </span>

          <span v-else-if="label && !hideLabel" :id="'tooltip-label-' + id">
            {{ label }}
            <span class="visuallyhidden">({{ $t('aria.more-info') }})</span>
          </span>

          <span v-else class="visuallyhidden">{{ $t('aria.more-info') }}</span>

          <Icon :name="icon" />
        </template>
      </template>

      <template #content>
        <div :id="'tooltip-content-' + id">
          <slot />
        </div>
      </template>
    </Tippy>
  </div>
</template>

<style>
/* Tippy classes for Popover and Tooltip components */
.tippy-box[data-theme~='krafters'] {
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-3);
  color: var(--color-text);
  background-color: var(--color-card-bg);
  border: 1px solid var(--popover-border-color);

  --arrow-color: var(--popover-border-color);
}

.light-mode {
  .tippy-box[data-theme~='krafters'] {
    --arrow-color: var(--color-card-bg);
  }
}

[data-theme~='krafters'] .tippy-content {
  font-size: var(--font-size-sm);
  border-radius: var(--radius-md);
  padding: 0;
}

.tippy-box[data-theme~='krafters'][data-placement^='top']
  > .tippy-arrow::before {
  border-block-start-color: var(--arrow-color);
  bottom: -8px;
}

.tippy-box[data-theme~='krafters'][data-placement^='bottom']
  > .tippy-arrow:before {
  border-block-end-color: var(--arrow-color);
  top: -8px;
}

.tippy-box[data-theme~='krafters'][data-placement^='left']
  > .tippy-arrow::before {
  border-inline-start-color: var(--arrow-color);
  right: -8px;
}

.tippy-box[data-theme~='krafters'][data-placement^='right']
  > .tippy-arrow::before {
  border-inline-end-color: var(--arrow-color);
  left: -8px;
}

.tippy-box[data-theme~='krafters'] > .tippy-backdrop {
  background-color: var(--color-card-bg);
}

.tippy-box[data-theme~='krafters'] > .tippy-svg-arrow {
  fill: var(--color-card-bg);
}

.tooltip-content {
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

.tooltip-trigger-button {
  position: relative;
  display: flex;
  gap: 0.35em;
  align-items: center;
  border: none;
  background: transparent;
  padding: 0;
  color: inherit;
  font-size: var(--font-size, inherit);
  transition: color var(--duration-sm);

  &::after {
    /* increase click target */
    content: '';
    position: absolute;
    inset: -50%;
    margin: auto;
    min-width: 1.5rem;
    min-height: 1.5rem;
    max-width: 100%;
    max-height: 100%;
    z-index: 1;
  }

  &:focus-visible {
    border-radius: var(--radius-sm);

    &:has(.icon-only.visuallyhidden) {
      border-radius: var(--radius-full);
    }
    outline-offset: 2px;
  }

  .iconify {
    flex-shrink: 0;
    color: var(--icon-color, var(--color-grey-text));
    font-size: var(--icon-size, inherit);
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
