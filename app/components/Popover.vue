<script setup lang="ts">
import { Tippy } from 'vue-tippy';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';

const props = withDefaults(
  defineProps<{
    label?: string;
    list?: MenuItem[];
    icon?: string;
    iconPos?: 'start' | 'end';
    size?: 'sm' | 'md' | 'lg';
    fontSize?: string;
    iconSize?: string;
    borderRadius?: string;
    placement?: PopperPlacement;
    hideLabel?: boolean;
    disabled?: boolean;
    interactive?: boolean;
    arrow?: boolean;
    loading?: boolean;
    trigger?: string;
    buttonVariant?: string;
    hideOnClick?: boolean | 'toggle';
    maxWidth?: number | 'none';
    modal?: boolean;
    id?: string;
  }>(),
  {
    label: undefined,
    list: () => [],
    icon: 'dots-horizontal',
    iconPos: 'start',
    size: 'sm',
    fontSize: undefined,
    iconSize: undefined,
    hideLabel: true,
    borderRadius: 'sm',
    placement: 'auto-start',
    interactive: true,
    trigger: 'click',
    buttonVariant: 'ghost',
    hideOnClick: true,
    maxWidth: undefined,
    modal: false,
    id: () => useId(),
  },
);

const computedIcon = computed(() => {
  if (props.icon?.includes(':')) {
    return props.icon;
  }
  return `heroicons-solid:${props.icon}`;
});

const isExpanded = ref(false);

function handleShow() {
  isExpanded.value = true;
  enableFocusLoop.value = true;
}

function handleHide() {
  enableFocusLoop.value = false;
  isExpanded.value = false;
  focusTrigger();
}

function handleMenuClick(item: MenuItem, hide: () => void) {
  emit('click', item);
  hide();
}

const enableFocusLoop = ref(false);
const wrapperRef = useTemplateRef<HTMLElement>('popoverWrapper');
const triggerRef = useTemplateRef<{ elem: HTMLButtonElement }>(
  'popoverTrigger',
);

function focusTrigger() {
  console.log('focus popover trigger');
  triggerRef.value?.elem?.focus();
}

defineExpose({ focusTrigger });

const emit = defineEmits<{
  click: [event: MenuItem];
}>();
</script>

<template>
  <div ref="popoverWrapper" class="krafters-popover-wrapper">
    <Tippy
      ref="popoverTrigger"
      :arrow="arrow"
      :trigger="trigger"
      :placement="placement"
      :interactive="interactive"
      :hide-on-click="hideOnClick"
      :max-width="maxWidth"
      role=""
      :aria-expanded="isExpanded"
      :aria-controls="'popover-menu-' + id"
      :aria="{
        // disable in favor of own solution
        content: null,
        expanded: false,
      }"
      tag="button"
      type="button"
      content-tag="div"
      content-class="popover-content"
      theme="krafters"
      animation="shift-away"
      :append-to="wrapperRef ?? undefined"
      :disabled="loading || disabled"
      :class="`popover-trigger
        popover-trigger-variant--${buttonVariant}
        popover-trigger-size--${size}
        popover-icon-position--${iconPos}
      `"
      :style="`
        --radius: var(--radius-${borderRadius});
        --font-size: var(--font-size-${fontSize});
        --icon-size: var(--font-size-${iconSize});
      `"
      @show="handleShow"
      @hide="handleHide"
    >
      <template #default>
        <slot v-if="$slots.trigger" name="trigger" />

        <template v-else>
          <Icon v-if="loading" name="svg-spinners:90-ring" />
          <Icon v-else :name="computedIcon" />

          <span
            v-if="label"
            :id="'popover-label-' + id"
            :class="hideLabel ? 'visuallyhidden' : undefined"
            class="popover-label"
          >
            {{ label }}
          </span>

          <span v-else :id="'popover-label-' + id" class="visuallyhidden">
            {{ $t('aria.popover') }}
          </span>
        </template>
      </template>

      <template #content="{ hide }">
        <FocusLoop
          :id="'popover-menu-' + id"
          :is-visible="enableFocusLoop"
          :modal="modal"
          @keyup.esc="hide"
        >
          <slot name="default" />

          <MenuList
            v-if="list?.length"
            :list="list"
            button-size="xl"
            font-size="sm"
            icon-size="lg"
            :aria-labelledby="'popover-label-' + id"
            @click="handleMenuClick($event, hide)"
          />

          <slot name="content" v-bind="{ hide }" />
        </FocusLoop>
      </template>
    </Tippy>
  </div>
</template>

<style>
.tippy-box {
  .menu-list {
    min-width: 240px;
  }

  .menu-list-item:first-of-type {
    .button {
      border-radius: var(--radius-md) var(--radius-md) 0 0;
    }
  }
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
}

.popover-icon-position--start {
  flex-direction: row;
}

.popover-icon-position--end {
  flex-direction: row-reverse;
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
