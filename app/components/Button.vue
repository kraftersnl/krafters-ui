<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

const props = withDefaults(
  defineProps<{
    label?: string;
    icon?: string;
    iconLib?: string;
    iconPos?: 'start' | 'end';
    to?: RouteLocationRaw;
    href?: string;
    target?: string;
    variant?:
      | 'primary'
      | 'secondary'
      | 'ghost'
      | 'danger'
      | 'link'
      | 'green'
      | 'blue'
      | 'menu'
      | 'sidebar';
    size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    radius?: 'xs' | 'sm' | 'md' | 'lg' | 'full';
    hideLabel?: boolean;
    loading?: boolean;
    download?: boolean;
    type?: 'button' | 'submit' | 'reset';
  }>(),
  {
    label: undefined,
    icon: undefined,
    iconLib: 'heroicons-solid',
    iconPos: 'start',
    to: undefined,
    href: undefined,
    target: undefined,
    variant: 'secondary',
    size: 'md',
    radius: 'md',
    type: 'button',
  },
);

const computedIcon = computed(() => `${props.iconLib}:${props.icon}`);

function handleClick() {
  emit('click');
}

const emit = defineEmits(['click']);
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to || href"
    :target="target"
    :class="`
      button
      button-size--${size}
      button-variant--${variant}
      icon-position--${iconPos}
      ${hideLabel ? 'button--icon-only' : ''}
    `"
    :style="`--radius: var(--radius-${radius})`"
    :title="
      !download && target === '_blank' ? $t('aria.open-new-window') : undefined
    "
  >
    <Icon v-if="icon" :name="computedIcon" />

    <span
      v-if="label"
      :class="`button-text ${hideLabel ? 'visuallyhidden' : ''}`"
    >
      {{ label }}
    </span>

    <template v-if="!download && target === '_blank'">
      <Icon name="heroicons-solid:external-link" class="external-link" />
    </template>

    <span v-if="$slots.default">
      <slot />
    </span>
  </NuxtLink>

  <button
    v-else
    :type="type"
    :class="`
      button
      button-size--${size}
      button-variant--${variant}
      ${loading ? 'button--loading' : ''}
      ${hideLabel ? 'button--icon-only' : ''}
    `"
    :style="`--radius: var(--radius-${radius})`"
    @click="handleClick"
  >
    <Icon v-if="loading" name="heroicons-solid:refresh" />
    <Icon v-else-if="icon" :name="computedIcon" />

    <span
      v-if="label"
      :class="`button-text ${hideLabel ? 'visuallyhidden' : ''}`"
    >
      {{ label }}
    </span>

    <span v-if="$slots.default">
      <slot />
    </span>
  </button>
</template>

<style>
.button {
  border-radius: var(--radius);
  -webkit-tap-highlight-color: transparent;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  font-weight: 500;
  font-size: var(--font-size-sm);
  border: 1px solid transparent;
  transition-property: color, background-color, opacity;
  transition-duration: var(--duration-sm);
  text-decoration: none;
  outline: 2px solid transparent;
  outline-offset: 2px;

  &:focus-visible {
    outline-color: var(--focus-color);
  }

  &[disabled] {
    cursor: default;
    opacity: 35%;
  }

  .iconify {
    flex-shrink: 0;
    transition-duration: all var(--duration-sm);
  }

  &.button--loading {
    cursor: default;
    opacity: 35%;

    .iconify {
      animation: var(--animation-rotate);
    }
  }
}

.icon-position--start {
  flex-direction: row;
}
.icon-position--end {
  flex-direction: row-reverse;
}

.button-size--xxs {
  height: 1.25rem;
  padding-inline: 0.25rem;
  font-size: var(--font-size-xxs);

  .button-text {
    padding-inline: 0.1rem;
  }
  .iconify {
    font-size: var(--font-size-xxs);
  }
}

.button-size--xs {
  height: 1.5rem;
  padding-inline: 0.35rem;
  font-size: var(--font-size-xs);

  .button-text {
    padding-inline: 0.15rem;
  }

  .iconify {
    font-size: var(--font-size-xs);
  }
}

.button-size--sm {
  height: 2rem;
  padding-inline: 0.5rem;
  font-size: var(--font-size-xs);

  .button-text {
    padding-inline: 0.2rem;
  }

  .iconify {
    font-size: var(--font-size-sm);
  }
}

.button-size--md {
  height: 2.25rem;
  padding-inline: 0.75rem;

  .button-text {
    padding-inline: 0.25rem;
  }

  .iconify {
    font-size: var(--font-size-md);
  }
}

.button-size--lg {
  height: 2.5rem;
  padding-inline: 1rem;

  .button-text {
    padding-inline: 0.35rem;
  }

  .iconify {
    font-size: var(--font-size-md);
  }
}

.button-size--xl {
  height: 3rem;
  padding-inline: 1rem;

  .iconify {
    font-size: var(--font-size-lg);
  }
}

.button-variant--primary {
  color: var(--color-white);
  background-color: var(--color-accent);
  white-space: nowrap;

  &:not(:disabled):hover {
    background-color: color-mix(
      in srgb,
      var(--color-accent) 85%,
      var(--color-black)
    );
  }
}

.button-variant--danger {
  color: var(--color-red-text);
  background-color: var(--color-red-bg);
  white-space: nowrap;

  &:not(:disabled):hover {
    background-color: color-mix(
      in srgb,
      var(--color-red-bg) 90%,
      var(--color-white)
    );
  }
}
.button-variant--green {
  color: var(--color-white);
  background-color: var(--color-green);
  white-space: nowrap;

  &:not(:disabled):hover {
    background-color: color-mix(
      in srgb,
      var(--color-green) 85%,
      var(--color-black)
    );
  }
}
.button-variant--blue {
  color: var(--color-white);
  background-color: var(--color-blue-text);
  white-space: nowrap;

  &:not(:disabled):hover {
    background-color: color-mix(
      in srgb,
      var(--color-blue-text) 85%,
      var(--color-white)
    );
  }
}

.button-variant--secondary {
  color: var(--color-text);
  background-color: var(--color-grey-bg);
  white-space: nowrap;

  &:not(:disabled):hover {
    background-color: color-mix(
      in srgb,
      var(--color-grey-bg) 95%,
      var(--color-black)
    );
  }
}

.button-variant--ghost {
  color: var(--color-text);
  background-color: transparent;
  white-space: nowrap;

  &:not(:disabled):hover {
    background-color: var(--color-grey-bg);
  }

  &.router-link-active {
    text-decoration: underline;
    color: var(--color-accent);
  }
}

.button-variant--link {
  --radius: 0 !important;
  display: inline;
  justify-content: start;
  align-items: start;
  text-decoration: underline;
  font-size: inherit;
  font-weight: 400;
  background-color: transparent;
  height: auto;
  padding-inline: 0;

  .button-text {
    padding-inline: 0;
  }

  .iconify {
    font-size: inherit;
    margin-block-end: 0.1rem;
    vertical-align: middle;
    margin-inline-start: 0.1rem;
  }

  &:not(:disabled):hover {
    color: var(--color-accent);
  }

  &.router-link-active {
    color: var(--color-accent);
    text-decoration: none;
  }
}

.button-variant--menu {
  width: 100%;
  font-weight: 500;
  flex-direction: row-reverse;
  justify-content: space-between;
  background-color: transparent;
  gap: 1.5rem;
  height: 3rem;

  .iconify {
    color: var(--color-grey-graphic);
  }

  &:disabled {
    opacity: 1;
    color: var(--color-grey-bg);

    .iconify {
      opacity: 0.35;
    }
  }

  &.router-link-active {
    font-weight: 600;
    color: var(--color-accent);
  }

  &:not(:disabled):hover {
    color: var(--color-accent);
    background-color: var(--color-accent-bg);

    .iconify {
      color: var(--color-accent-text);
    }
  }
}

.button-variant--sidebar {
  width: 100%;
  font-weight: 500;
  justify-content: start;
  padding-inline: 2rem;
  background-color: transparent;
  gap: 0;

  &.router-link-exact-active {
    text-decoration: underline;
    font-weight: 600;
    color: var(--color-accent);
  }

  &:not(:disabled):hover {
    color: var(--color-accent);
  }
}

.button--icon-only {
  aspect-ratio: 1;
  padding: 0;
}
</style>
