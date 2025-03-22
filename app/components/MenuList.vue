<script setup lang="ts">
withDefaults(
  defineProps<{
    list: MenuItem[];
    label?: string;
    labelLink?: string;
    labelIcon?: string;
    ariaLabel?: string;
    ariaLabelledby?: string;
    buttonVariant?: ButtonVariant;
    buttonSize?: ButtonSize;
    fontSize?: FontSize;
    iconSize?: FontSize;
    hTag?: string;
    inline?: boolean;
  }>(),
  {
    fontSize: undefined,
    iconSize: undefined,
    label: undefined,
    labelLink: undefined,
    labelIcon: undefined,
    ariaLabel: undefined,
    ariaLabelledby: undefined,
    buttonVariant: 'menu',
    buttonSize: 'lg',
    hTag: 'h2',
  },
);

const id = useId();

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
  <nav
    :aria-labelledby="label ? id : ariaLabelledby"
    :aria-label="ariaLabelledby ? undefined : ariaLabel"
    class="menu-list-nav"
  >
    <component :is="hTag" v-if="label" :id="id" class="menu-list-label">
      <NuxtLink v-if="labelLink" :to="labelLink" class="label-link">
        <Icon v-if="labelIcon" :name="labelIcon" />

        <span>{{ label }}</span>
      </NuxtLink>

      <span v-else>{{ label }}</span>
    </component>

    <ul role="list" :class="`menu-list ${inline ? 'menu-list--inline' : ''}`">
      <li
        v-for="item in list"
        :key="'menu-list-item-' + item.id"
        class="menu-list-item"
      >
        <Button
          :label="item.label || item.title"
          :to="item.to || item.href || item.path"
          :icon="item.icon"
          :icon-pos="item.iconPos"
          :disabled="item.disabled"
          :loading="item.loading"
          :target="item.target"
          :external="item.external"
          :download="item.download"
          :hide-external-icon="item.hideExternalIcon"
          :size="buttonSize"
          :font-size="fontSize"
          :icon-size="iconSize"
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

  .label-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    font-size: var(--font-size-lg);
    text-underline-offset: 0.25em;

    .iconify {
      color: var(--color-grey-graphic);
    }

    &:hover {
      color: var(--color-accent);

      .iconify {
        color: var(--color-grey-text);
      }
    }

    &.router-link-active {
      color: var(--color-accent);
      text-decoration: underline;

      .iconify {
        color: var(--color-grey-text);
      }
    }
  }
}

.menu-list-nav:has(.button-variant--sidebar) {
  .menu-list-label {
    margin-inline-start: 2rem;
  }

  .menu-list-item {
    margin-bottom: 0.5rem;

    hr {
      margin-block: 0.75rem;
    }
  }
}

.menu-list--inline {
  .menu-list-item {
    display: inline-block;
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
      border-bottom-left-radius: var(--radius-md) !important;
      border-bottom-right-radius: var(--radius-md) !important;
    }
  }
}
</style>
