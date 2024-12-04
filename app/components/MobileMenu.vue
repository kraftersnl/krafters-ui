<script setup lang="ts">
const { isLargeScreen } = useScreenSize();

const props = withDefaults(
  defineProps<{
    navList?: MenuItem[];
    label?: string;
    position?: 'inline-start' | 'inline-end';
    icon?: string;
    buttonVariant?: 'ghost' | 'secondary';
    class?: string;
    navAriaLabel?: string;
  }>(),
  {
    navList: () => [],
    label: 'Menu',
    position: 'inline-start',
    icon: 'menu-alt-2',
    buttonVariant: 'secondary',
    class: undefined,
    navAriaLabel: undefined,
  },
);

const dialogElement = useTemplateRef<HTMLDialogElement>('dialogElement');
const openButton = useTemplateRef<HTMLButtonElement>('openButton');
const closeButton = useTemplateRef<HTMLButtonElement>('closeButton');
const isVisible = ref(false);
const isMounted = ref(false);

onMounted(() => (isMounted.value = true));

function handleDialogClick(event: MouseEvent) {
  const target = event.target as HTMLDialogElement;

  if (target.nodeName === 'DIALOG') {
    closeDialog();
  }
}

function closeDialog() {
  dialogElement.value?.setAttribute('closing', '');

  dialogElement.value?.addEventListener(
    'animationend',
    () => {
      dialogElement.value?.removeAttribute('closing');
      dialogElement.value?.close();

      isVisible.value = false;
    },
    { once: true },
  );
}

function openDialog() {
  dialogElement.value?.showModal();
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
    if (value) {
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
    <slot name="trigger" v-bind="openDialog" />

    <Button
      ref="openButton"
      :icon="icon"
      class="mobile-nav-toggle"
      :variant="buttonVariant"
      :label="$t('aria.mobile-menu')"
      hide-label
      @click="openDialog"
    />

    <Teleport v-if="isMounted" to="#teleports">
      <dialog
        ref="dialogElement"
        :class="`mobile-dialog dialog-position--${position} ${props.class ?? ''}`"
        v-bind="props"
        :aria-label="$t('aria.mobile-menu')"
        @keydown.esc="closeDialog"
        @click="handleDialogClick"
      >
        <div class="dialog-content">
          <Button
            ref="closeButton"
            icon="x"
            variant="ghost"
            radius="full"
            :label="$t('aria.close-menu')"
            hide-label
            class="close-button"
            @click="closeDialog"
          />

          <template v-if="navList?.length">
            <h2 class="nav-label">{{ label }}</h2>
            <MenuList
              :list="navList"
              button-variant="sidebar"
              :aria-label="navAriaLabel || $t('aria.mobile-menu')"
              @click="emit('click', $event)"
            />
          </template>

          <slot name="default" v-bind="{ closeDialog }" />
        </div>
      </dialog>
    </Teleport>
  </div>
</template>

<style>
/* disable background scrolling */
body:has(.mobile-dialog[open]) {
  overflow: hidden;
}

.mobile-nav-toggle,
.close-button {
  .iconify {
    width: 1.25rem;
    height: 1.25rem;
  }
}

.mobile-dialog {
  padding: 0;
  overscroll-behavior: contain;
  top: 0;
  left: 0;
  min-height: 100dvh;
  width: 90vw;
  max-width: 360px;
  border: none;
  background-color: var(--color-card-bg);

  &::backdrop {
    background-color: rgb(0 0 0 / 50%);
    /* backdrop-filter: blur(0.35rem); */
  }

  .close-button {
    position: absolute;
    right: 1rem;
    top: 1rem;
    justify-self: end;
  }

  .dialog-content {
    padding-block-start: 4rem;
  }

  .nav-label {
    margin-inline-start: 2rem;
    margin-block-end: 1rem;
  }
}

.dialog-position--inline-start {
  margin-inline-start: 0;

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

.dialog-position--inline-end {
  margin-inline-end: 0;

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
