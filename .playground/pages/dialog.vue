<script setup lang="ts">
useHead({ title: 'Dialog and Mobile Menu | Krafters UI' });

const dialogRef = useTemplateRef<DialogComponent>('dialog');
const position = ref<DialogPosition>('center');
</script>

<template>
  <div class="demo-page dialog-demo">
    <h1>Dialog and Mobile Menu</h1>

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

        <div class="text-content">
          <h3>Accessibility requirements</h3>
          <p>Krafters UI uses the native <code>{{ `<dialog>`}}</code> element.</p>

          <ul>
            <li>Focus is trapped inside the dialog.</li>
            <li>The dialog can be closed with the <kbd>Escape</kbd> key.</li>
            <li>When the dialog is closed, the trigger button that opened the dialog receives focus.</li>
            <li>By default, the dialog is closed when clicking on the backdrop. Set  <code>clickOutside</code> prop to false to disable this behaviour.</li>
          </ul>
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

        <div class="text-content">
          <h3>Accessibility requirements</h3>
          <p>Krafters UI uses the native <code>{{ `<dialog>`}}</code> element.</p>

          <ul>
            <li>Focus is trapped inside the dialog.</li>
            <li>The dialog can be closed with the <kbd>Escape</kbd> key.</li>
            <li>When the dialog is closed, the trigger button that opened the dialog receives focus.</li>
            <li>By default, the dialog is closed when clicking on the backdrop. Set  <code>clickOutside</code> prop to false to disable this behaviour.</li>
          </ul>
        </div>
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
  .card {
    display: grid;
    gap: 1rem;
  }

  .flex-wrapper {
    margin-block-end:1.5rem;
  }
}


.demo-dialog {
  max-width: 360px;
}
</style>
