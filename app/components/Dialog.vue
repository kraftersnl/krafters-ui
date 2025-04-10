<script setup lang="ts">
const {
  id = useId(),
  clickOutside = true,
  position = 'center',
} = defineProps<{
  label?: string;
  id?: string;
  clickOutside?: boolean;
  modal?: boolean;
  position?: DialogPosition;
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

defineExpose({
  openDialog,
  closeDialog,
  isVisible,
});
</script>

<template>
  <dialog
    ref="dialog"
    :aria-labelledby="id"
    :class="['dialog', `dialog-position--${position}`]"
    :role="role"
    @click="handleDialogClick"
    @close="isVisible = false"
  >
    <FocusLoop :is-visible="isVisible" :modal="modal">
      <div class="dialog-header">
        <h1 v-if="label" :id="id">{{ label }}</h1>

        <slot name="header" v-bind="{ closeDialog }" />

        <Button
          icon="x"
          size="sm"
          variant="ghost"
          :label="$t('general.close')"
          hide-label
          class="close-button"
          @click="closeDialog"
        />
      </div>

      <div v-if="$slots.default" class="dialog-content">
        <slot name="default" v-bind="{ closeDialog }" />
      </div>

      <div v-if="$slots.buttons" class="dialog-buttons">
        <Button :label="$t('general.cancel')" @click="closeDialog" />

        <slot name="buttons" v-bind="{ closeDialog }" />
      </div>
    </FocusLoop>
  </dialog>
</template>

<style>
/* disable background scrolling */
body:has(.dialog[open]) {
  overflow: hidden;
}

.dialog {
  padding: 0;
  width: calc(100vw - var(--app-inline-padding));
  background-color: var(--color-card-bg);
  border: none;
  outline: 1px solid transparent;
  padding-block-end: 1.5rem;
  min-height: 100dvh;

  &::backdrop {
    background-color: rgb(0 0 0 / 50%);
  }

  h1 {
    margin-block: 0;
    font-size: var(--font-size-lg);
  }

  .dialog-header {
    padding-block: 1.5rem;
    padding-inline: 2rem;
    display: flex;
    align-items: center;

    .close-button {
      z-index: 9;
      float: inline-end;
      margin-inline-start: auto;
    }
  }

  .dialog-content {
    padding-inline: 2rem;
  }

  .dialog-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.65rem;
  }
}

.dialog-position--center {
  @media (min-width: 480px) {
    min-height: auto;
    border: 1px solid var(--color-card-border);
    border-radius: var(--radius-lg);
  }

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
  border-radius: 0;
  border: none;
  border-inline-end: 1px solid var(--color-card-border);
  max-width: 800px;

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
}

.dialog-position--inline-end {
  margin: 0 0 0 auto;
  border-radius: 0;
  border: none;
  border-inline-start: 1px solid var(--color-card-border);
  max-width: 800px;

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
}
</style>
