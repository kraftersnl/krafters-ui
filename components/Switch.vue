<script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean;
  label: string;
  name?: string;
  value?: string;
  required?: boolean;
}>();

const id = useId();

const computedModel = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

function handleClick() {
  computedModel.value = !props.modelValue;
}
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <button
    :id="id"
    type="button"
    role="switch"
    class="switch-wrapper"
    :aria-checked="computedModel"
    :value="String(computedModel)"
    @click="handleClick"
  >
    <div class="switch">
      <span class="switch-thumb" role="presentation" />
    </div>

    <span class="switch-label">
      {{ label }}
    </span>
  </button>
</template>

<style>
.switch-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: max-content;
  -webkit-tap-highlight-color: transparent;
  background: transparent;
  text-align: left;
  color: inherit;
  font: inherit;
  cursor: pointer;
  border: none;
  border-radius: var(--radius-lg);
  outline: 2px solid transparent;
  transition:
    background-color var(--duration-sm),
    opacity var(--duration-sm),
    outline-offset var(--duration-sm),
    outline-color var(--duration-sm);

  .switch {
    padding-block: 3px;
    padding-inline: 3px;
    background-color: var(--color-grey-bg);
    width: 40px;
    height: 22px;
    border-radius: var(--radius-full);
    transition: background-color var(--duration-md);
  }

  .switch-thumb {
    display: block;
    width: 16px;
    height: 16px;
    border-radius: var(--radius-full);
    background-color: var(--color-white);
    transform: translateX(0);
    transition-property: transform;
    transition-duration: var(--duration-md);
  }

  .switch-label {
    font-size: var(--font-size-xs);
    font-weight: 500;
    padding-inline: var(--size-4xs);
    transition-property: color, font-weight;
    transition-duration: var(--duration-sm);
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.35;
  }

  &:hover .switch {
    background-color: var(--color-grey-bg);
  }

  &:focus-visible {
    outline-offset: 2px;
    outline-color: var(--focus-color);
  }

  &[aria-checked='true'] {
    .switch-thumb {
      transform: translateX(18px);
    }
    .switch-label {
      color: var(--focus-color);
    }
    .switch {
      background-color: var(--color-accent);
    }
  }
}
</style>
