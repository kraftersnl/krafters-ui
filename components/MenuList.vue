<script setup lang="ts">
defineProps<{
  list: MenuItem[];
}>();

function handleClick(item?: MenuItem) {
  emit('click', item);

  if (item?.onClick) {
    item.onClick();
  }
}

const emit = defineEmits(['click']);
</script>

<template>
  <nav>
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
          :disabled="item.disabled"
          size="xl"
          variant="menu"
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
    background-color: var(--color-white);
    border-radius: 0;
    outline-offset: -2px;
  }

  .menu-list-item:last-of-type {
    .button {
      border-radius: 0 0 var(--radius-md) var(--radius-md);
    }
  }
}
</style>
