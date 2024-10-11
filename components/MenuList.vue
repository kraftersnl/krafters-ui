<script setup lang="ts">
defineProps<{
  list: MenuItem[];
}>();
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
          size="xl"
          variant="menu"
          @click="item.onClick"
        />

        <hr v-if="item.divider" />
      </li>
    </ul>
  </nav>
</template>

<style>
.menu-list {
  .button {
    border-radius: 0;
  }

  .menu-list-item:last-of-type {
    .button {
      border-radius: 0 0 var(--radius-md) var(--radius-md);
    }
  }
}
</style>
