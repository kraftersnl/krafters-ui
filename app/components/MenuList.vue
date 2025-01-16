<script setup lang="ts">
withDefaults(
  defineProps<{
    list: MenuItem[];
    ariaLabel?: string;
    buttonVariant?: string;
    buttonSize?: string;
  }>(),
  {
    buttonVariant: 'menu',
    buttonSize: 'lg',
    ariaLabel: undefined,
  },
);

function handleClick(item: MenuItem) {
  emit('click', item);

  if (item?.onClick) {
    item.onClick();
  }
}

const emit = defineEmits<{
  click: [item: MenuItem];
}>();
</script>

<template>
  <nav :aria-label="ariaLabel">
    <ul role="list" class="menu-list">
      <li
        v-for="item in list"
        :key="'menu-list-item-' + item.id"
        class="menu-list-item"
      >
        <Button
          :label="item.label"
          :to="item.to"
          :icon="item.icon"
          :icon-lib="item.iconLib"
          :disabled="item.disabled"
          :target="item.target"
          :external="item.external"
          :download="item.download"
          :size="buttonSize"
          :variant="buttonVariant"
          @click="handleClick(item)"
        />

        <hr v-if="item.divider" />
      </li>
    </ul>
  </nav>
</template>

<style>
.menu-list {
  min-width: 200px;

  .button {
    --radius: 0 !important;
    outline-offset: -2px;
  }

  .menu-list-item:last-of-type {
    .button-variant--menu {
      border-radius: 0 0 var(--radius-md) var(--radius-md);
    }
  }
}
</style>
