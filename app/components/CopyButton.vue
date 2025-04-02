<script setup lang="ts">
const {
  text,
  hideLabel = true,
  iconSize = 'lg',
} = defineProps<{
  text?: string;
  hideLabel?: boolean;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  iconSize?: IconSize;
  iconPos?: IconPositions;
  disabled?: boolean;
}>();

const copied = ref(false);

async function handleClick() {
  if (!text) return;
  await navigator.clipboard.writeText(text);
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
