<script setup lang="ts">
const {
  label = 'Cookies',
  icon = 'material-symbols:cookie-outline',
  iconOff = 'material-symbols:cookie-off-outline',
  buttonVariant = 'ghost',
  radius = 'full',
  size = 'sm',
  iconSize = 'md',
  hideLabel = true,
} = defineProps<{
  label?: string;
  icon?: string;
  iconOff?: string;
  buttonVariant?: ButtonVariant;
  radius?: BorderRadius;
  size?: ButtonSize;
  iconSize?: FontSize;
  hideLabel?: boolean;
}>();
const { cookiesDialogRef, hasConsent } = useCookiesDialog();
</script>

<template>
  <Button
    class="cookies-button"
    :variant="buttonVariant"
    :radius="radius"
    :label="label"
    :hide-label="hideLabel"
    :size="size"
    :icon-size="iconSize"
    :icon="hasConsent ? icon : iconOff"
    @click="cookiesDialogRef?.openDialog()"
  />
</template>
