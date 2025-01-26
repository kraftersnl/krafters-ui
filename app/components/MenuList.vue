<script setup lang="ts">
withDefaults(
  defineProps<{
    list: MenuItem[];
    label?: string;
    ariaLabel?: string;
    buttonVariant?: string;
    buttonSize?: string;
    hTag?: string;
    id?: string;
  }>(),
  {
    id: () => useId(),
    hTag: 'h2',
    buttonVariant: 'menu',
    buttonSize: 'lg',
    label: undefined,
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
  <nav :aria-labelledby="id" :aria-label="ariaLabel" class="menu-list-nav">
    <component :is="hTag" v-if="label" :id="id" class="menu-list-label">
      {{ label }}
    </component>

    <ul role="list" class="menu-list">
      <li
        v-for="item in list"
        :key="'menu-list-item-' + item.id"
        class="menu-list-item"
      >
        <Button
          :label="item.label"
          :to="item.to"
          :href="item.href"
          :icon="item.icon"
          :icon-lib="item.iconLib"
          :disabled="item.disabled"
          :loading="item.loading"
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
.menu-list-label {
  margin-inline-start: 1rem;
  margin-block-end: 1rem;
  color: var(--color-accent-text);
}

.menu-list-nav:has(.button-variant--sidebar) {
  .menu-list-label {
    margin-inline-start: 2rem;
  }
}

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
