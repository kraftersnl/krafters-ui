<script setup lang="ts">
import { Tippy, type TippyComponent } from 'vue-tippy';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    label?: string;
    navAriaLabel?: string;
    list?: MenuItem[];
    icon?: string;
    placement?: PopperPlacement;
    disabled?: boolean;
    interactive?: boolean;
    appendTo: boolean;
    arrow?: boolean;
    trigger?: string;
    hideOnClick?: boolean | 'toggle';
    maxWidth?: number | 'none';
  }>(),
  {
    modelValue: undefined,
    label: undefined,
    navAriaLabel: undefined,
    list: () => [],
    icon: 'dots-horizontal',
    placement: 'auto-start',
    interactive: true,
    appendTo: undefined,
    trigger: 'click',
    hideOnClick: true,
    maxWidth: undefined,
  },
);

const activeItem = computed({
  get: () => props.modelValue || '',
  set: (value) => emit('update:modelValue', value),
});

function handleMenuClick(item: string, hide: CallableFunction) {
  emit('click', item);
  hide();
}

function closePopover() {
  document
    .querySelectorAll('[data-tippy-root]')
    .forEach((el: Element & { _tippy?: TippyComponent }) => el._tippy?.hide());
}

function focusTrigger() {
  popoverTrigger.value?.focus();
}

const enableFocusLoop = ref(false);
const popoverTrigger = useTemplateRef<HTMLButtonElement>('popoverTrigger');

defineExpose({
  popoverTrigger,
  focusTrigger,
});

const emit = defineEmits(['click', 'update:modelValue']);
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
    class="popover-wrapper"
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
        :disabled="disabled"
        class="popover-trigger"
      >
        <Icon :name="'heroicons-solid:' + icon" />
        <span class="visuallyhidden">{{ label || $t('aria.open-menu') }}</span>
      </button>

      <slot v-else name="trigger" />
    </template>

    <template #content="{ hide }">
      <FocusLoop :is-visible="enableFocusLoop" @keyup.esc="hide">
        <slot name="default" />

        <MenuList
          v-model="activeItem"
          :list="list"
          :aria-label="navAriaLabel || $t('general.menu')"
          @click="handleMenuClick($event, hide)"
        />

        <slot name="content" />
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

.popover-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  background-color: var(--color-grey-bg);
  aspect-ratio: 1;
  height: 2rem;
  border: 1px solid transparent;
  border-radius: var(--radius-full);
  transition-property: color, background-color, opacity;
  transition-duration: var(--duration-sm);
  outline: 2px solid transparent;
  outline-offset: 2px;

  .iconify {
    font-size: var(--font-size-sm);
  }

  &:focus-visible {
    outline-color: var(--focus-color);
  }

  &:not(:disabled):hover {
    background-color: color-mix(
      in srgb,
      var(--color-grey-bg) 95%,
      var(--color-black)
    );
  }
}
</style>
