<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

const props = withDefaults(
  defineProps<{
    label?: string;
    icon?: string;
    iconLib?: string;
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
      | 'menu';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    hideLabel?: boolean;
    loading?: boolean;
    download?: boolean;
    type?: 'button' | 'submit' | 'reset';
  }>(),
  {
    label: undefined,
    icon: undefined,
    iconLib: 'heroicons-solid',
    to: undefined,
    href: undefined,
    target: undefined,
    variant: 'secondary',
    size: 'md',
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
      ${hideLabel ? 'button--icon-only' : ''}
    `"
    :title="
      !download && target === '_blank' ? $t('aria.opens-new-window') : undefined
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
  -webkit-tap-highlight-color: transparent;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  font-weight: 500;
  font-size: var(--font-size-sm);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
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

.button-size--xs {
  height: 1.5rem;
  padding-inline: 0.25rem;
  font-size: var(--font-size-xs);

  .iconify {
    font-size: var(--font-size-xs);
  }
}

.button-size--sm {
  height: 2rem;
  padding-inline: 0.5rem;
  font-size: var(--font-size-xs);

  .iconify {
    font-size: var(--font-size-sm);
  }
}

.button-size--md {
  height: 2.25rem;
  padding-inline: 0.75rem;

  .iconify {
    font-size: var(--font-size-md);
  }
}

.button-size--lg {
  height: 2.5rem;
  padding-inline: 1rem;

  .iconify {
    font-size: var(--font-size-lg);
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

  &[aria-current='page'] {
    text-decoration: underline;
    color: var(--color-accent);
  }
}

.button-variant--link {
  display: inline;
  font-size: inherit;
  font-weight: 400;
  height: auto;
  padding-inline: 0;
  justify-content: start;
  align-items: start;
  border-radius: var(--radius-xs);
  background-color: transparent;
  text-decoration: underline;

  .iconify {
    font-size: inherit;
    margin-inline-end: 0;
    margin-block-end: 0.2em;
    vertical-align: middle;
    margin-inline-start: 0.25em;
  }

  &:focus-visible {
    text-decoration: none;
  }

  &:not(:disabled):hover {
    color: var(--color-accent);
  }

  &[aria-current='page'] {
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
  text-underline-offset: 0.35rem;
  gap: 1rem;

  .iconify {
    color: var(--color-grey-graphic);
  }

  &:disabled {
    opacity: 1;
    color: var(--color-grey-bg);
    background-color: var(--color-grey-bg);
  }

  &[aria-current='page'] {
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

.button--icon-only {
  aspect-ratio: 1;
  padding: 0;
  border-radius: var(--radius-full);
}
</style>
