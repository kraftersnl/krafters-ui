<script setup lang="ts">
useHead({ title: 'Tooltip, Popover and Dialog | Krafters UI' });

const { t } = useI18n();
const dialogRef = useTemplateRef('dialog');

const popoverActions = [
  {
    id: 'edit',
    label: t('general.edit'),
    icon: 'pencil',
  },
  {
    id: 'duplicate',
    label: t('general.duplicate'),
    icon: 'duplicate',
    divider: true,
  },
  {
    id: 'delete',
    label: t('general.delete'),
    icon: 'trash',
  },
];
</script>

<template>
  <div class="demo-page">
    <h1>Tooltip, Popover and Dialog</h1>

    <div class="popover-demo-cols">
      <Tooltip>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
          architecto eligendi deserunt dicta similique enim, quibusdam officiis
          quos quis quisquam amet doloribus explicabo iste nisi perferendis ut
          non distinctio numquam.
        </div>
      </Tooltip>

      <Popover :list="popoverActions" hide-label>
        <!-- <template #content>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
          quidem sequi autem eum dolore cupiditate blanditiis ipsam. Assumenda
          quas incidunt doloribus ad, dicta, aliquam pariatur quisquam quos
          iusto ipsam eum.
        </template> -->
      </Popover>

      <Button label="Open dialog" @click="dialogRef?.openDialog()" />

      <Dialog ref="dialog" label="Dialog title" class="demo-dialog">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi quos
          nesciunt quam. Totam iste quasi nemo saepe a distinctio architecto?
          Maxime odio nam a placeat qui illo iure cupiditate et.
        </p>
      </Dialog>
    </div>
  </div>
</template>

<style>
.popover-demo-cols {
  margin-block: 2rem;
  display: grid;
  gap: 3rem;
  justify-items: start;
}

.demo-dialog {
  max-width: 360px;
}
</style>
