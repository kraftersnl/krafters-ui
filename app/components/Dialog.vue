<script setup lang="ts">
const {
  id = useId(),
  disableEscape = false,
  clickOutside = true,
  position = 'center',
  closeButtonVariant = 'outline',
  label = undefined,
  ariaLabel = undefined,
  ariaLabelledby = undefined,
  role = undefined,
} = defineProps<{
  label?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
  id?: string;
  disableEscape?: boolean;
  clickOutside?: boolean;
  modal?: boolean;
  position?: DialogPosition;
  closeButtonVariant?: ButtonVariant;
  role?: 'dialog' | 'alertdialog';
}>();

const dialogTemplateRef = useTemplateRef<HTMLDialogElement>('dialog');
const isVisible = ref(false);

function handleDialogClick(event: MouseEvent) {
  if (!clickOutside) return;

  const target = event.target as HTMLDialogElement;

  if (target.nodeName === 'DIALOG') {
    closeDialog();
  }
}

function openDialog() {
  dialogTemplateRef.value?.showModal();
  isVisible.value = true;
}

function closeDialog() {
  if (!isVisible.value) return;

  dialogTemplateRef.value?.setAttribute('closing', '');
  dialogTemplateRef.value?.addEventListener(
    'animationend',
    () => {
      dialogTemplateRef.value?.removeAttribute('closing');
      dialogTemplateRef.value?.close();
    },
    { once: true },
  );
}

function preventEscape(event: Event) {
  if (disableEscape) {
    event.preventDefault();
  }
}

onMounted(() => {
  dialogTemplateRef.value?.addEventListener('cancel', (event) =>
    preventEscape(event),
  );
});

onUnmounted(() =>
  dialogTemplateRef.value?.removeEventListener('cancel', preventEscape),
);

defineExpose({
  openDialog,
  closeDialog,
  isVisible,
});
</script>

<template>
  <dialog
    ref="dialog"
    :aria-label="ariaLabel"
    :aria-labelledby="ariaLabelledby || id"
    :class="['dialog', `dialog-position--${position}`]"
    :role="role"
    @click="handleDialogClick"
    @close="isVisible = false"
  >
    <FocusLoop :is-visible="isVisible" :modal="modal">
      <div class="dialog-header-wrapper">
        <div class="dialog-header">
          <h1 v-if="label" :id="id">{{ label }}</h1>

          <Button
            icon="material-symbols:close-rounded"
            size="sm"
            :variant="closeButtonVariant"
            :label="$t('general.close')"
            hide-label
            class="close-button"
            @click="closeDialog"
          />
        </div>

        <slot name="header" v-bind="{ closeDialog }" />
      </div>

      <div v-if="$slots.default" class="dialog-content">
        <slot name="default" v-bind="{ closeDialog }" />
      </div>

      <div v-if="$slots.buttons" class="dialog-buttons">
        <Button :label="$t('general.cancel')" size="lg" @click="closeDialog" />

        <slot name="buttons" v-bind="{ closeDialog }" />
      </div>
    </FocusLoop>
  </dialog>
</template>

<style>
/* disable background scrolling */
html:has(.dialog[open]) {
  overflow: hidden;
}

.light-mode {
  .dialog {
    --color-dialog-border: transparent;
    --color-select-bg: var(--color-bg);
  }
}

.dialog {
  --color-dialog-border: var(--color-card-border);
  --dialog-padding-inline: 1.5rem;
  --dialog-padding-block: 1.5rem;
  --color-input-bg: transparent;

  border-radius: 0;
  padding: 0;

  color: var(--color-text);
  background-color: var(--color-dialog-bg);
  border: none;
  outline: 1px solid transparent;

  &::backdrop {
    background-color: rgb(0 0 0 / 50%);
  }

  h1 {
    margin-block: 0;
    font-size: var(--font-size-lg);
  }

  .dialog-header-wrapper {
    padding-block-start: var(--dialog-padding-block);
    padding-block-end: 1.5rem;
    padding-inline: var(--dialog-padding-inline);
    padding-inline-end: calc(2.75rem + var(--dialog-padding-inline));

    .dialog-header {
      display: flex;
      align-items: center;
    }
  }

  .close-button {
    z-index: 9;
    position: absolute;
    right: 1rem;
    top: 1rem;
  }

  .dialog-content {
    padding-inline: var(--dialog-padding-inline);
  }

  .dialog-buttons {
    padding-inline: var(--dialog-padding-inline);
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;

    > .button {
      flex-grow: 1;
    }
  }
}

.dialog-position--center {
  --dialog-padding-inline: 1.25rem;
  --dialog-padding-block: 1.25rem;

  border: 1px solid var(--color-dialog-border);
  border-radius: var(--radius-lg);
  padding-block-end: var(--dialog-padding-block);

  &[open] {
    animation: fadeIn var(--duration-md) forwards;

    &::backdrop {
      animation: fadeIn var(--duration-md) forwards;
    }
  }

  &[closing] {
    display: block;
    animation: fadeOut var(--duration-md) forwards;

    &::backdrop {
      animation: fadeOut var(--duration-md) forwards;
    }
  }
}

.dialog-position--inline-start {
  margin: 0 auto 0 0;
  border: none;
  border-inline-end: 1px solid var(--color-dialog-border);
  padding-block-end: var(--dialog-padding-block);
  width: 100%;
  max-width: min(100vw, 800px);
  min-height: 100dvh;

  &[open] {
    animation: slideFadeInLeft var(--duration-md) forwards;

    &::backdrop {
      animation: fadeIn var(--duration-md) forwards;
    }
  }

  &[closing] {
    display: block;
    animation: slideFadeOutLeft var(--duration-md) forwards;

    &::backdrop {
      animation: fadeOut var(--duration-md) forwards;
    }
  }

  .close-button {
    right: 1.5rem;
    top: 1.5rem;
  }
}

.dialog-position--inline-end {
  margin: 0 0 0 auto;
  border: none;
  border-inline-start: 1px solid var(--color-dialog-border);
  padding-block-end: var(--dialog-padding-block);
  width: 100%;
  max-width: min(100vw, 800px);
  min-height: 100dvh;

  &[open] {
    animation: slideFadeInRight var(--duration-md) forwards;

    &::backdrop {
      animation: fadeIn var(--duration-md) forwards;
    }
  }

  &[closing] {
    display: block;
    animation: slideFadeOutRight var(--duration-md) forwards;

    &::backdrop {
      animation: fadeOut var(--duration-md) forwards;
    }
  }

  .close-button {
    right: 1.5rem;
    top: 1.5rem;
  }
}

.dialog-position--block-start {
  inset: 0 0 0 auto;
  margin: 0;

  max-width: 100%;
  border: none;
  border-block-end: 1px solid var(--color-dialog-border);
  width: 100%;

  &[open] {
    animation: slideInTop var(--duration-md) forwards;

    &::backdrop {
      animation: fadeIn var(--duration-md) forwards;
    }
  }

  &[closing] {
    display: block;
    animation: slideOutTop var(--duration-md) forwards;

    &::backdrop {
      animation: fadeOut var(--duration-md) forwards;
    }
  }
}

.dialog-position--block-end {
  inset: auto 0 0 0;
  margin: 0;
  max-width: 100%;
  border: none;
  border-block-start: 1px solid var(--color-dialog-border);
  width: 100%;

  &[open] {
    animation: slideInBottom var(--duration-md) forwards;

    &::backdrop {
      animation: fadeIn var(--duration-md) forwards;
    }
  }

  &[closing] {
    display: block;
    animation: slideOutBottom var(--duration-md) forwards;

    &::backdrop {
      animation: fadeOut var(--duration-md) forwards;
    }
  }
}
</style>
