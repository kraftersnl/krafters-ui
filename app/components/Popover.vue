<script setup lang="ts">
import { Tippy, type TippyComponent } from 'vue-tippy';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';

withDefaults(
  defineProps<{
    label?: string;
    navAriaLabel?: string;
    list?: MenuItem[];
    icon?: string;
    iconLib?: string;
    size?: 'sm' | 'md' | 'lg';
    placement?: PopperPlacement;
    hideLabel?: boolean;
    disabled?: boolean;
    interactive?: boolean;
    appendTo?: boolean;
    arrow?: boolean;
    loading?: boolean;
    trigger?: string;
    triggerVariant?: string;
    hideOnClick?: boolean | 'toggle';
    maxWidth?: number | 'none';
  }>(),
  {
    label: undefined,
    navAriaLabel: undefined,
    list: () => [],
    icon: 'dots-horizontal',
    iconLib: 'heroicons-solid',
    size: 'sm',
    placement: 'auto-start',
    interactive: true,
    appendTo: undefined,
    trigger: 'click',
    triggerVariant: 'secondary',
    hideOnClick: true,
    maxWidth: undefined,
  },
);

function handleMenuClick(item: MenuItem, hide: () => void) {
  emit('click', item);
  hide();
}

function closePopover() {
  document
    .querySelectorAll('[data-tippy-root]')
    .forEach((el: Element & { _tippy?: TippyComponent }) => el._tippy?.hide());
}

function focusTrigger() {
  triggerRef.value?.focus();
}

const enableFocusLoop = ref(false);
const triggerRef = useTemplateRef<HTMLButtonElement>('popoverTrigger');

defineExpose({
  triggerRef,
  focusTrigger,
  closePopover,
});

const emit = defineEmits<{
  click: [event: MenuItem];
}>();
</script>

<template>
  <Tippy
    :arrow="arrow"
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
    animation="shift-away"
    tag="div"
    content-tag="div"
    content-class="popover-content"
    :class="`popover-wrapper ${hideLabel ? 'popover--icon-only' : ''}`"
    @show="enableFocusLoop = true"
    @hide="
      () => {
        enableFocusLoop = false;
        focusTrigger();
      }
    "
    @keyup.esc="closePopover"
  >
    <template #default>
      <button
        v-if="!$slots.trigger"
        ref="popoverTrigger"
        type="button"
        :disabled="loading || disabled"
        :class="`popover-trigger
          popover-trigger-variant--${triggerVariant}
          popover-trigger-size--${size}
        `"
      >
        <Icon v-if="loading" name="svg-spinners:90-ring" />
        <Icon v-else :name="iconLib + ':' + icon" />

        <span :class="hideLabel ? 'visuallyhidden' : undefined">
          {{ label || $t('aria.open-menu') }}
        </span>
      </button>

      <slot v-else name="trigger" />
    </template>

    <template #content="{ hide }">
      <FocusLoop :is-visible="enableFocusLoop" @keyup.esc="hide">
        <slot name="default" />

        <MenuList
          v-if="list?.length"
          :list="list"
          button-size="xl"
          :aria-label="navAriaLabel || $t('general.menu')"
          @click="handleMenuClick($event, hide)"
        />

        <slot name="content" v-bind="{ hide }" />
      </FocusLoop>
    </template>
  </Tippy>
</template>

<style>
.tippy-box {
  .menu-list-item:first-of-type {
    .button {
      border-radius: var(--radius-md) var(--radius-md) 0 0;
    }
  }
}

.popover-wrapper {
  display: flex;
}

.popover-trigger {
  flex-grow: 1;
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xs);
  white-space: nowrap;
  padding-inline: 0.5rem;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  transition-property: color, background-color, opacity;
  transition-duration: var(--duration-sm);
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

.popover-trigger-variant--outline {
  background-color: var(--color-grey-bg);
  border-color: var(--color-grey-graphic);
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

.popover-trigger-size--sm {
  height: 2rem;

  .iconify {
    font-size: var(--font-size-sm);
  }
}

.popover-trigger-size--md {
  height: 2.25rem;

  .iconify {
    font-size: var(--font-size-md);
  }
}

.popover-trigger-size--lg {
  height: 2.5rem;
  font-size: var(--font-size-sm);

  .iconify {
    font-size: var(--font-size-lg);
  }
}

.popover--icon-only {
  /* aspect-ratio: 1; */
  border-radius: var(--radius-full);
}
</style>
