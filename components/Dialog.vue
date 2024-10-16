<script setup lang="ts">
defineProps<{ label?: string }>();

const dialogElement = ref<HTMLDialogElement>();

function handleDialogClick(event: MouseEvent) {
  const target = event.target as HTMLDialogElement;

  if (target.nodeName === 'DIALOG') {
    closeDialog();
  }
}

function openDialog() {
  dialogElement.value?.showModal();
}

function closeDialog() {
  dialogElement.value?.close();
}

defineExpose({
  openDialog,
  closeDialog,
});
</script>

<template>
  <dialog ref="dialogElement" class="dialog" @click="handleDialogClick">
    <header class="dialog-header">
      <h1>{{ label }}</h1>
    </header>

    <div v-if="$slots.default" class="dialog-content">
      <slot name="default" v-bind="{ closeDialog }" />
    </div>

    <div v-if="$slots.buttons" class="dialog-buttons">
      <Button :label="$t('general.cancel')" @click="closeDialog" />

      <slot name="buttons" v-bind="{ closeDialog }" />
    </div>
  </dialog>
</template>

<style>
body:has(.dialog[open]) {
  /* disable background scrolling */
  overflow: hidden;
}

.dialog {
  padding: 0;
  width: calc(100vw - var(--app-inline-padding));
  border: none;
  border-radius: var(--radius-lg);
  padding-block-end: 2rem;

  &::backdrop {
    background-color: rgb(0 0 0 / 65%);
  }

  h1 {
    margin-block: 0;
    font-size: var(--font-size-lg);
  }

  .dialog-header {
    padding-block: 2rem 1rem;
    padding-inline: 2rem;
    display: flex;
    align-items: center;
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
