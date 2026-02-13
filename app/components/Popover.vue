<script setup lang="ts">
import { Tippy } from 'vue-tippy';
import type { TippyComponent } from 'vue-tippy';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';

const {
  fontSize = undefined,
  iconSize = undefined,
  label = undefined,
  maxWidth = undefined,
  list = undefined,
  borderRadius = 'md',
  hideLabel = true,
  icon = 'material-symbols:more-horiz',
  iconPos = 'start',
  buttonVariant = 'outline',
  size = 'sm',
  placement = 'auto-start',
  offset = undefined,
  interactive = true,
  trigger = 'click',
  hideOnClick = true,
  modal = false,
  id = useId(),
} = defineProps<{
  fontSize?: string;
  iconSize?: string;
  borderRadius?: string;
  label?: string;
  hideLabel?: boolean;
  icon?: string;
  iconPos?: 'start' | 'end';
  buttonVariant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  placement?: PopperPlacement;
  offset?: [number, number];
  disabled?: boolean;
  interactive?: boolean;
  arrow?: boolean;
  loading?: boolean;
  showArrowIcon?: boolean;
  trigger?: string;
  hideOnClick?: boolean | 'toggle';
  maxWidth?: number | 'none';
  modal?: boolean;
  id?: string;
  list?: MenuItem[];
}>();

const computedStyle = computed(() => ({
  '--font-size': `var(--font-size-${fontSize})`,
  '--icon-size': `var(--font-size-${iconSize})`,
  '--radius': `var(--radius-${borderRadius})`,
}));

const isExpanded = ref(false);

function handleShow() {
  isExpanded.value = true;
  enableFocusLoop.value = true;
}

function handleHide() {
  enableFocusLoop.value = false;
  isExpanded.value = false;
  focusElement();
}

function closePopover() {
  document
    ?.querySelectorAll('[data-tippy-root]')
    ?.forEach((el: Element & { _tippy?: TippyComponent }) => el._tippy?.hide());
}

function handleMenuClick(item: MenuItem, hide: () => void) {
  emit('click', item);
  hide();
}

const enableFocusLoop = ref(false);
const wrapperRef = useTemplateRef<HTMLElement>('popoverWrapper');
const triggerRef = useTemplateRef<{ elem: HTMLElement }>('popoverTrigger');

function focusElement() {
  triggerRef.value?.elem?.focus();
}

defineExpose({ triggerRef, focusElement });

onMounted(() => {
  document.addEventListener('keydown', (event) => preventEscape(event));
});

onUnmounted(() => document.removeEventListener('keydown', preventEscape));

function preventEscape(event: KeyboardEvent) {
  if (event.key === 'Escape' && isExpanded.value) {
    event.preventDefault();
    closePopover();
  }
}

const emit = defineEmits<{
  click: [event: MenuItem];
}>();
</script>

<template>
  <div ref="popoverWrapper" class="popover-wrapper">
    <Tippy
      ref="popoverTrigger"
      :arrow="arrow"
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
      :aria-controls="'popover-content-' + id"
      role=""
      tag="button"
      type="button"
      content-tag="div"
      content-class="popover-content"
      theme="krafters"
      animation="shift-away"
      :append-to="wrapperRef ?? undefined"
      :disabled="loading || disabled"
      :class="[
        'popover-trigger',
        `popover-trigger-variant--${buttonVariant}`,
        `popover-trigger-size--${size}`,
        `popover-icon-position--${iconPos}`,
      ]"
      :style="computedStyle"
      @show="handleShow"
      @hide="handleHide"
    >
      <template #default>
        <slot v-if="$slots.trigger" name="trigger" />

        <template v-else>
          <Icon v-if="loading" name="svg-spinners:90-ring-with-bg" />
          <Icon v-else :name="icon" />

          <template v-if="label">
            <span
              :id="'popover-label-' + id"
              :class="hideLabel ? 'visuallyhidden' : undefined"
              class="popover-label"
            >
              {{ label }}
            </span>

            <Icon
              v-if="!hideLabel && showArrowIcon"
              name="material-symbols:keyboard-arrow-down-rounded"
            />
          </template>

          <span v-else :id="'popover-label-' + id" class="visuallyhidden">
            {{ $t('aria.popover') }}
          </span>
        </template>
      </template>

      <template #content="{ hide }">
        <FocusLoop
          :id="'popover-content-' + id"
          :is-visible="enableFocusLoop"
          :modal="modal"
          @keyup.esc="closePopover"
        >
          <slot name="default" />

          <MenuList
            v-if="list?.length"
            :list="list"
            button-size="lg"
            font-size="sm"
            icon-size="lg"
            :aria-labelledby="'popover-label-' + id"
            @click="handleMenuClick($event, hide)"
          >
            <template #menu-list-item="{ item }">
              <slot name="menu-list-item" :item="item" />
            </template>
          </MenuList>

          <slot name="content" v-bind="{ hide }" />
        </FocusLoop>
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

.popover-trigger {
  flex-grow: 1;
  display: inline-flex;
  gap: 0.25rem;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border: 1px solid transparent;
  border-radius: var(--radius);
  transition-property: color, background-color, opacity;
  transition-duration: var(--duration-sm);
  font-size: var(--font-size);
  outline: 2px solid transparent;
  outline-offset: 2px;

  &:focus-visible {
    outline-color: var(--focus-color);
  }

  &:disabled {
    opacity: 35%;
  }

  &:not(:disabled):hover {
    background-color: color-mix(
      in srgb,
      var(--color-grey-bg) 95%,
      var(--color-black)
    );
  }
}

.popover-content {
  p {
    &:first-child {
      margin-block-start: 0;
    }
    &:last-child {
      margin-block-end: 0;
    }
  }

  .menu-list-nav {
    padding: 0.25rem;

    .menu-list {
      min-width: 240px;
    }

    .menu-list-item {
      > .button {
        border-radius: var(--radius-md);
      }

      + .menu-list-item {
        margin-block-start: 0.25rem;
      }

      hr {
        margin-block-start: 0.25rem;
      }
    }
  }
}

.popover-icon-position--start {
  flex-direction: row;
}

.popover-icon-position--end {
  flex-direction: row-reverse;
}

.popover-trigger-variant--outline {
  background-color: var(--color-input-bg);
  border-color: var(--popover-border-color);

  &:not(:disabled):hover {
    background-color: var(--color-grey-bg);
  }
}

.popover-trigger-variant--primary {
  color: var(--color-white);
  background-color: var(--color-accent);

  &:not(:disabled):hover {
    background-color: color-mix(
      in srgb,
      var(--color-accent) 85%,
      var(--color-black)
    );
  }
}

.popover-trigger-variant--secondary {
  color: var(--color-text);
  background-color: var(--color-grey-bg);

  &:not(:disabled):hover {
    background-color: color-mix(
      in srgb,
      var(--color-grey-bg) 95%,
      var(--color-black)
    );
  }
}

.popover-trigger-variant--ghost {
  color: var(--color-text);
  background-color: transparent;

  &:not(:disabled):hover {
    background-color: color-mix(
      in srgb,
      var(--color-grey-bg) 95%,
      var(--color-black)
    );
  }
}

.popover-trigger-size--sm {
  height: 2rem;
  min-width: 2rem;
  font-size: var(--font-size, var(--font-size-xs));
  padding-inline: 0.35rem;

  .popover-label {
    padding-inline: 0.1rem;
  }

  .iconify {
    font-size: var(--icon-size, var(--font-size-md));
  }
}

.popover-trigger-size--md {
  height: 2.25rem;
  min-width: 2.25rem;
  font-size: var(--font-size, var(--font-size-xs));
  padding-inline: 0.5rem;

  .popover-label {
    padding-inline: 0.2rem;
  }

  .iconify {
    font-size: var(--icon-size, var(--font-size-md));
  }
}

.popover-trigger-size--lg {
  height: 2.5rem;
  min-width: 2.5rem;
  font-size: var(--font-size, var(--font-size-sm));
  padding-inline: 0.5rem;

  .popover-label {
    padding-inline: 0.2rem;
  }

  .iconify {
    font-size: var(--icon-size, var(--font-size-lg));
  }
}
</style>
