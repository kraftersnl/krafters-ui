<script setup lang="ts">
import { Tippy } from 'vue-tippy';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    label?: string;
    list?: MenuItem[];
    icon?: string;
    placement?: PopperPlacement;
    disabled?: boolean;
    loading?: boolean;
    interactive?: boolean;
    arrow?: boolean;
    trigger?: string;
    hideOnClick?: boolean | 'toggle';
    maxWidth?: number | 'none';
  }>(),
  {
    modelValue: undefined,
    label: undefined,
    list: () => [],
    icon: 'dots-horizontal',
    placement: 'auto',
    interactive: true,
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

function closeTooltip() {
  document
    .querySelectorAll('[data-tippy-root]')
    .forEach((el) => el._tippy?.hide());
}

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
    content-tag="div"
    content-class="popover-content"
    class="popover-wrapper"
    @keyup.esc="closeTooltip"
  >
    <template #default>
      <Button
        v-if="!$slots.trigger"
        :label="label"
        hide-label
        :icon="icon"
        :disabled="disabled"
        :loading="loading"
        class="popover-trigger"
      />

      <slot v-else name="trigger" />
    </template>

    <template #content="{ hide }">
      <FocusLoop @keyup.esc="hide">
        <slot name="default" />

        <MenuList
          v-model="activeItem"
          :list="list"
          @click="handleMenuClick($event, hide)"
        />

        <slot name="content" />
      </FocusLoop>
    </template>
  </Tippy>
</template>

<style>
.tippy-box {
  font: var(--font-body-xs);
  /* border-radius: var(--radius-md); */

  .menu-list-item:first-of-type {
    .button {
      border-radius: var(--radius-md) var(--radius-md) 0 0;
    }
  }
}

.tippy-content {
  border-radius: var(--radius-md);
  border: 1px solid var(--color-grey-bg);
  padding: 0;
}

.tippy-box[data-theme~='krafters'] {
  color: var(--color-text);
  background-color: var(--color-card2-bg);
  box-shadow: var(--tooltip-shadow);
  border: 1px solid var(--color-card2-border);
}

.tippy-box[data-theme~='krafters'][data-placement^='top']
  > .tippy-arrow::before {
  border-top-color: var(--color-card2-bg);
}

.tippy-box[data-theme~='krafters'][data-placement^='bottom']
  > .tippy-arrow:before {
  border-bottom-color: var(--color-card2-bg);
}

.tippy-box[data-theme~='krafters'][data-placement^='left']
  > .tippy-arrow::before {
  border-left-color: var(--color-card2-bg);
}

.tippy-box[data-theme~='krafters'][data-placement^='right']
  > .tippy-arrow::before {
  border-right-color: var(--color-card2-bg);
}

.tippy-box[data-theme~='krafters'] > .tippy-backdrop {
  background-color: var(--color-card2-bg);
}

.tippy-box[data-theme~='krafters'] > .tippy-svg-arrow {
  fill: var(--color-card2-bg);
}
</style>
