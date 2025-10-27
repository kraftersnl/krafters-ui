<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';

const props = defineProps<{
  label?: string;
  icon?: string;
  logout?: CallableFunction;
  avatar?: string;
}>();

const triggerRef = useTemplateRef<ButtonComponent>('menuTrigger');
const contentRef = useTemplateRef<HTMLElement>('menuContent');
const dialogRef = useTemplateRef<DialogComponent>('logoutDialog');

const showMenu = defineModel<boolean>();

onClickOutside(contentRef, () => (showMenu.value = false));

function toggleMenu() {
  showMenu.value = !showMenu.value;
}

function handleLogout() {
  if (props.logout) {
    props.logout();
    closeLogoutDialog();
  }
}

function openLogoutDialog() {
  dialogRef.value?.openDialog();
}

function closeLogoutDialog() {
  dialogRef.value?.closeDialog();
}

function focusMenu() {
  setTimeout(() => triggerRef.value?.focusElement());
}

function hideMenu() {
  showMenu.value = false;
  focusMenu();
}

defineExpose({
  hideMenu,
  focusMenu,
  openLogoutDialog,
  closeLogoutDialog,
});
</script>

<template>
  <div class="user-menu-wrapper" @keydown.esc="hideMenu">
    <button
      v-if="avatar"
      type="button"
      class="avatar-button"
      @click="toggleMenu"
    >
      <img :src="avatar" class="avatar-image" />
      <span class="visuallyhidden">{{ $t('general.avatar') }}</span>
    </button>

    <Button
      v-else
      ref="menuTrigger"
      :icon="icon"
      :label="label"
      :aria-label="$t('aria.user-menu')"
      :aria-expanded="showMenu"
      size="lg"
      icon-size="lg"
      radius="full"
      aria-controls="user-menu"
      @click="toggleMenu"
    />

    <Transition name="stretch-fade">
      <FocusLoop
        id="user-menu"
        :is-visible="showMenu"
        class="user-menu-popover"
      >
        <div v-if="showMenu" ref="menuContent">
          <div class="user-menu-content">
            <slot name="default" v-bind="{ hideMenu }" />
          </div>
        </div>
      </FocusLoop>
    </Transition>

    <Dialog
      ref="logoutDialog"
      class="logout-dialog"
      :label="$t('general.sign-out')"
      @close="focusMenu"
    >
      <p>{{ $t('general.sign-out-confirm') }}</p>
      <template #buttons>
        <Button
          :label="$t('general.sign-out')"
          icon="material-symbols:logout"
          variant="danger"
          @click="handleLogout"
        />
      </template>
    </Dialog>
  </div>
</template>

<style>
.user-menu-wrapper {
  height: var(--app-header-height);
  display: grid;
  place-content: center;
  position: relative;

  > .button {
    width: 2.5rem;
    height: 2.5rem;
    font-weight: var(--font-weight-bold);
    background-color: var(--color-grey-bg);
    border-radius: var(--radius-full);
  }

  .avatar-button {
    border: none;
    padding: 0;
    background-color: transparent;
    overflow: hidden;
    cursor: pointer;
    height: 2.5rem;
    width: 2.5rem;
    border-radius: var(--radius-full);

    .avatar-image {
      height: 100%;
      width: 100%;
    }
  }
}

.user-menu-popover {
  z-index: 9;
  position: absolute;
  top: calc(1px + var(--app-header-height));
  right: 0;
  transform-origin: center 0;

  .user-menu-content {
    border-radius: 0 0 var(--radius-md) var(--radius-md);
    box-shadow: var(--shadow-2);
    border: 1px solid var(--color-card-border);
    border-block-start: none;
    background-color: var(--color-dialog-bg);
  }

  .user-info-wrapper {
    padding-block: 1rem 0.75rem;
    padding-inline: 1rem;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  .user-name {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-heading);
  }

  .user-email {
    color: var(--color-grey-text);
    font-size: var(--font-size-xs);
  }

  .theme-select-wrapper {
    padding: 1rem;
  }

  .language-select-wrapper {
    padding: 1rem;

    .language-options-list {
      width: 100%;
    }
  }
}

.logout-dialog {
  .dialog-content {
    p {
      margin-block-start: 0;
      margin-block-end: 1.5rem;
    }
  }
}
</style>
