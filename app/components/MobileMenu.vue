<script setup lang="ts">
const { isLargeScreen } = useScreenSize();

const {
  teleportTo = '#teleports',
  width = 360,
  position = 'inline-start',
  buttonVariant = 'ghost',
  buttonSize = 'md',
  buttonIconSize = 'lg',
  menuButtonSize = 'xl',
  icon = 'material-symbols:dehaze-rounded',
  hideButtonLabel = true,
  clickOutside = true,
  id = useId(),
  buttonFontSize = undefined,
  buttonIconPos = undefined,
  buttonLabel = undefined,
  label = undefined,
  navLabel = undefined,
  list = undefined,
  closeIcon = 'material-symbols:close-rounded',
  hideCloseButton = false,
} = defineProps<{
  teleportTo?: string;
  width?: number;
  position?: MobileMenuPosition;
  buttonVariant?: ButtonVariant;
  buttonSize?: ButtonSize;
  buttonFontSize?: FontSize;
  buttonIconSize?: FontSize;
  buttonIconPos?: 'start' | 'end';
  menuButtonSize?: ButtonSize;
  icon?: string;
  hideButtonLabel?: boolean;
  buttonLabel?: string;
  clickOutside?: boolean;
  label?: string;
  navLabel?: string;
  list?: MenuItem[];
  id?: string;
  closeIcon?: string;
  hideCloseButton?: boolean;
}>();

const dialogElementRef = useTemplateRef<HTMLDialogElement>('dialogElement');
const isVisible = ref(false);
const isMounted = ref(false);

onMounted(() => (isMounted.value = true));

function handleDialogClick(event: MouseEvent) {
  if (!clickOutside) return;

  const target = event.target as HTMLDialogElement;

  if (target.nodeName === 'DIALOG') {
    closeDialog();
  }
}

function closeDialog() {
  if (!isVisible.value) return;

  dialogElementRef.value?.setAttribute('closing', '');

  dialogElementRef.value?.addEventListener(
    'animationend',
    () => {
      dialogElementRef.value?.removeAttribute('closing');
      dialogElementRef.value?.close();
    },
    { once: true },
  );
}

function openDialog() {
  if (isVisible.value) return;

  dialogElementRef.value?.showModal();
  isVisible.value = true;
}

defineExpose({
  openDialog,
  closeDialog,
  isVisible,
});

watch(
  () => isLargeScreen.value,
  (value) => {
    if (value && isVisible.value) {
      closeDialog();
    }
  },
);

const emit = defineEmits<{
  click: [item: MenuItem];
}>();
</script>

<template>
  <div class="mobile-menu-wrapper">
    <slot
      v-if="$slots.trigger"
      name="trigger"
      v-bind="{ openDialog, closeDialog }"
    />

    <Button
      v-else
      :icon="icon"
      class="mobile-nav-toggle"
      :size="buttonSize"
      :font-size="buttonFontSize"
      :icon-size="buttonIconSize"
      :icon-pos="buttonIconPos"
      :variant="buttonVariant"
      :label="buttonLabel || $t('general.menu')"
      :hide-label="hideButtonLabel"
      :aria-controls="id"
      :aria-expanded="isVisible"
      @click="openDialog"
    />

    <Teleport v-if="isMounted" :to="teleportTo">
      <dialog
        :id="id"
        ref="dialogElement"
        :class="['mobile-dialog', `mobile-dialog-position--${position}`]"
        v-bind="$attrs"
        :aria-label="label || $t('aria.mobile-menu')"
        :style="`--width: ${width}px`"
        @click="handleDialogClick"
        @close="isVisible = false"
      >
        <FocusLoop :is-visible="isVisible">
          <div class="dialog-content">
            <Button
              v-if="!hideCloseButton"
              :icon="closeIcon"
              variant="ghost"
              radius="full"
              :label="$t('aria.close-menu')"
              hide-label
              class="close-button"
              @click="closeDialog"
            />

            <template v-if="list?.length">
              <h1 class="nav-label">{{ navLabel }}</h1>

              <MenuList
                :list="list"
                :button-size="menuButtonSize"
                button-variant="sidebar"
                :aria-label="navLabel || $t('aria.mobile-menu')"
                @click="emit('click', $event)"
              />
            </template>

            <slot name="default" v-bind="{ closeDialog }" />
          </div>
        </FocusLoop>
      </dialog>
    </Teleport>
  </div>
</template>

<style>
/* disable background scrolling */
body:has(.mobile-dialog[open]) {
  overflow: hidden;
}

.mobile-dialog {
  padding: 0;
  overscroll-behavior: contain;
  min-height: 100dvh;
  width: 90vw;
  max-width: var(--width, 360px);
  border: none;
  background-color: var(--color-card-bg);

  &::backdrop {
    background-color: rgb(0 0 0 / 50%);
  }

  .close-button {
    z-index: 1;
    position: absolute;
    right: 1rem;
    top: 1rem;
  }

  .dialog-content {
    display: grid;
    min-height: 100svh;
    align-content: start;
  }

  .dialog-content {
    padding-block: 3rem;
  }

  .nav-label {
    margin-inline-start: 2rem;
    margin-block-end: 1rem;
  }
}

.mobile-dialog-position--inline-start {
  margin-inline-start: 0;
  border-inline-end: 1px solid var(--color-card-border);

  &[open] {
    animation: slideInLeft var(--duration-lg) forwards;

    &::backdrop {
      animation: fadeIn var(--duration-md) forwards;
    }
  }

  &[closing] {
    display: block;
    animation: slideOutLeft var(--duration-md) forwards;

    &::backdrop {
      animation: fadeOut var(--duration-md) forwards;
    }
  }

  .dialog-content {
    display: grid;
    padding-left: env(safe-area-inset-left);
  }
}

.mobile-dialog-position--inline-end {
  margin-inline-end: 0;
  border-inline-start: 1px solid var(--color-card-border);

  &[open] {
    animation: slideInRight var(--duration-lg) forwards;

    &::backdrop {
      animation: fadeIn var(--duration-md) forwards;
    }
  }

  &[closing] {
    display: block;
    animation: slideOutRight var(--duration-md) forwards;

    &::backdrop {
      animation: fadeOut var(--duration-md) forwards;
    }
  }

  .dialog-content {
    display: grid;
    padding-right: env(safe-area-inset-right);
  }
}
</style>
