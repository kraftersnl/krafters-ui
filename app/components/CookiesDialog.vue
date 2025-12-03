<script setup lang="ts">
const {
  clickOutside = false,
  position = 'block-end',
  closeButtonVariant = 'ghost',
  closeButtonRadius = 'full',
  ariaLabel = undefined,
  description = undefined,
  acceptButtonLabel = undefined,
  denyButtonLabel = undefined,
} = defineProps<{
  clickOutside?: boolean;
  position?: DialogPosition;
  closeButtonVariant?: ButtonVariant;
  closeButtonRadius?: BorderRadius;
  ariaLabel?: string;
  description?: string;
  acceptButtonLabel?: string;
  denyButtonLabel?: string;
}>();

const { cookiesDialogRef, acceptCookies, denyCookies } = useCookiesDialog();
</script>

<template>
  <Dialog
    ref="cookiesDialogRef"
    class="cookies-dialog"
    :position="position"
    :click-outside="clickOutside"
    :aria-label="ariaLabel || $t('cookies.heading')"
    :close-button-variant="closeButtonVariant"
    :close-button-radius="closeButtonRadius"
  >
    <template #header>
      <div class="cookies-dialog-content">
        <p id="cookiesDescription">
          {{ description || $t('cookies.description') }}
        </p>

        <div class="button-group">
          <Button
            class="accept-button"
            aria-describedby="cookiesDescription"
            variant="primary"
            size="lg"
            :label="acceptButtonLabel || $t('cookies.accept')"
            @click="acceptCookies"
          />

          <Button
            class="deny-button"
            aria-describedby="cookiesDescription"
            variant="ghost"
            size="lg"
            :label="denyButtonLabel || $t('cookies.deny')"
            @click="denyCookies"
          />
        </div>
      </div>
    </template>
  </Dialog>
</template>

<style>
.cookies-dialog {
  .dialog-header-wrapper {
    padding-inline-end: calc(var(--dialog-padding-inline) + 1.5rem);
  }

  .cookies-dialog-content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-inline: auto;
    justify-content: center;
    row-gap: 2rem;
    column-gap: 3rem;

    .button-group {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      justify-self: end;
      gap: 1rem;
    }
  }

  .close-button {
    top: 0.5em;
    right: 0.5em;

    @media (min-width: 768px) {
      top: 1.75rem;
      right: 1.5em;
    }
  }
}
</style>
