<script setup lang="ts">
const {
  label = 'Cookies',
  icon = 'material-symbols:cookie-outline',
  iconOff = 'material-symbols:cookie-off-outline',
  iconPos = 'end',
  buttonVariant = 'ghost',
  radius = 'full',
  size = 'sm',
  iconSize = 'md',
  hideLabel = true,
} = defineProps<{
  label?: string;
  icon?: string;
  iconOff?: string;
  iconPos?: 'start' | 'end';
  buttonVariant?: ButtonVariant;
  radius?: BorderRadius;
  size?: ButtonSize;
  iconSize?: FontSize;
  hideLabel?: boolean;
}>();

const computedLabel = computed(() => {
  return (
    label +
    ' (' +
    (hasConsent.value ? $t('cookies.has-consent') : $t('cookies.no-consent')) +
    ')'
  );
});

const { cookiesDialogRef, hasConsent } = useCookiesDialog();
</script>

<template>
  <Button
    class="cookies-button"
    :variant="buttonVariant"
    :radius="radius"
    :label="computedLabel"
    :hide-label="hideLabel"
    :size="size"
    :icon-size="iconSize"
    :icon="hasConsent ? icon : iconOff"
    :icon-pos="iconPos"
    @click="cookiesDialogRef?.openDialog()"
  />
</template>
