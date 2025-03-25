<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text?: string;
    timeout?: number;
    hideLabel?: boolean;
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: ButtonSize;
    iconSize?: IconSize;
    iconPos?: IconPositions;
    disabled?: boolean;
  }>(),
  {
    text: undefined,
    hideLabel: true,
    timeout: 4000,
    variant: undefined,
    color: undefined,
    hoverColor: undefined,
    size: undefined,
    iconSize: 'lg',
    iconPos: undefined,
  },
);

const copied = ref(false);

async function handleClick() {
  if (!props.text) return;
  await navigator.clipboard.writeText(props.text);
  copied.value = true;
}
</script>

<template>
  <Button
    :label="copied ? $t('general.copied') : $t('general.copy')"
    :icon="
      copied
        ? 'heroicons-solid:clipboard-check'
        : 'heroicons-solid:clipboard-copy'
    "
    :hide-label="hideLabel"
    :variant="variant"
    :color="color"
    :size="size"
    :icon-size="iconSize"
    :icon-pos="iconPos"
    :disabled="disabled"
    class="copy-button"
    aria-live="polite"
    @click="handleClick"
  />
</template>

<style></style>
