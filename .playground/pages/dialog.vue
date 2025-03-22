<script setup lang="ts">
useHead({ title: 'Modal dialog pattern' });

const dialogRef = useTemplateRef<DialogComponent>('dialog');
const position = ref<DialogPosition>('center');
</script>

<template>
  <div class="demo-page dialog-demo">
    <h1>Modal dialog pattern</h1>

    <blockquote>
      <p>
        A dialog is a window overlaid on either the primary window or another
        dialog window. Windows under a modal dialog are inert. That is, users
        cannot interact with content outside an active dialog window. Inert
        content outside an active dialog is typically visually obscured or
        dimmed so it is difficult to discern, and in some implementations,
        attempts to interact with the inert content cause the dialog to close.
      </p>

      <p class="fs-xxs mbe-2">
        Source:
        <NuxtLink
          to="https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/"
          target="_blank"
          external
          >ARIA Design Patterns</NuxtLink
        >.
      </p>
    </blockquote>

    <Card>
      <h2>Dialog</h2>
      <div class="flex-wrapper">
        <Button
          label="Open dialog left"
          @click="
            () => {
              position = 'inline-start';
              dialogRef?.openDialog();
            }
          "
        />
        <Button
          label="Open dialog center"
          @click="
            () => {
              position = 'center';
              dialogRef?.openDialog();
            }
          "
        />
        <Button
          label="Open dialog right"
          @click="
            () => {
              position = 'inline-end';
              dialogRef?.openDialog();
            }
          "
        />
      </div>
    </Card>

    <Card>
      <h2>MobileMenu</h2>
      <div class="flex-wrapper">
        <MobileMenu
          position="inline-start"
          :list="navList"
          trigger-label="Open left menu"
          :hide-trigger-label="false"
          menu-button-size="sm"
        />

        <MobileMenu
          position="inline-end"
          :list="navList"
          trigger-label="Open right menu"
          trigger-icon-pos="end"
          :hide-trigger-label="false"
          menu-button-size="sm"
        />
      </div>
    </Card>

    <Card>
      <h2>Accessibility Requirements</h2>
      <ul class="a11y-list">
        <li>The dialog has a label, either visible or for screen readers.</li>
        <li>Keyboard focus is trapped inside the dialog.</li>
        <li>
          When a dialog opens, focus moves to an element contained in the
          dialog. Generally, focus is initially set on the first focusable
          element. However, the most appropriate focus placement will depend on
          the nature and size of the content.
        </li>
        <li>The dialog can be closed with the <kbd>Escape</kbd> key.</li>
        <li>
          When the dialog is closed, the trigger button that opened the dialog
          receives focus.
        </li>
        <li>
          By default, the dialog is closed when clicking on the backdrop. Set
          <code>clickOutside</code> prop to false to disable this behaviour.
        </li>
        <li>
          If your dialog should divert users' attention to a brief, important
          message, you can set <code>role="alertdialog"</code>. Its usage is
          described in the
          <NuxtLink
            to="https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/"
            target="_blank"
            external
            >ARIA Design Patterns</NuxtLink
          >.
        </li>
      </ul>
    </Card>

    <Dialog
      ref="dialog"
      :position="position"
      label="Dialog title"
      class="demo-dialog"
    >
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi quos
        nesciunt quam. Totam iste quasi nemo saepe a distinctio architecto?
        Maxime odio nam a placeat qui illo iure cupiditate et.
      </p>
    </Dialog>
  </div>
</template>

<style>
.demo-page.dialog-demo {
  .flex-wrapper {
    /* margin-block-end: 1.5rem; */
  }
}

.demo-dialog {
  max-width: 360px;
}
</style>
