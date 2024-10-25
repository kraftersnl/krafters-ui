<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    id?: string;
  }>(),
  {
    label: undefined,
    id: () => useId(),
  },
);

const dialogTemplateRef = useTemplateRef<HTMLDialogElement>('dialog');
const isVisible = ref(false);

function handleDialogClick(event: MouseEvent) {
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
  dialogTemplateRef.value?.close();
  isVisible.value = false;
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
    class="dialog"
    @click="handleDialogClick"
  >
    <FocusLoop>
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
  border: none;
  border-radius: var(--radius-lg);
  padding-block-end: 1.5rem;

  &::backdrop {
    background-color: rgb(0 0 0 / 65%);
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
      position: absolute;
      right: 0.75rem;
      top: 0.75rem;
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
</style>
