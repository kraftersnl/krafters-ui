<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

withDefaults(
  defineProps<{
    label?: string;
    icon?: string;
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
    size?: 'sm' | 'md' | 'lg' | 'xl';
    hideLabel?: boolean;
    loading?: boolean;
    download?: boolean;
    type?: 'button' | 'submit' | 'reset';
  }>(),
  {
    label: undefined,
    icon: undefined,
    to: undefined,
    href: undefined,
    target: undefined,
    variant: 'secondary',
    size: 'md',
    type: 'button',
  },
);
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
    <Icon v-if="icon" :name="'heroicons-solid:' + icon" />

    <span
      v-if="label"
      :class="`button-text ${hideLabel ? 'visuallyhidden' : ''}`"
    >
      {{ label }}
    </span>

    <template v-if="!download && target === '_blank'">
      <Icon name="heroicons-solid:external-link" class="external-link" />
      <!-- <span class="visuallyhidden">({{ $t('aria.opens-new-window') }})</span> -->
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
  >
    <Icon v-if="loading" name="heroicons-solid:refresh" />
    <Icon v-else-if="icon" :name="'heroicons-solid:' + icon" />

    <span v-if="label" :class="hideLabel ? 'visuallyhidden' : ''">
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
      animation: rotate var(--duration-xl) linear infinite;
    }
  }
}

.button-size--sm {
  height: 2rem;
  padding-inline: 0.5rem;

  .iconify {
    font-size: 1rem;
  }
}

.button-size--md {
  height: 2.25rem;
  padding-inline: 0.75rem;

  .iconify {
    font-size: 1rem;
  }
}

.button-size--lg {
  height: 2.5rem;
  padding-inline: 1rem;

  .iconify {
    font-size: 1rem;
  }
}

.button-size--xl {
  height: 3rem;
  padding-inline: 1rem;

  .iconify {
    font-size: 1.25rem;
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
  color: var(--color-white);
  background-color: var(--color-red);
  white-space: nowrap;

  &:not(:disabled):hover {
    background-color: color-mix(
      in srgb,
      var(--color-red) 85%,
      var(--color-black)
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
  display: inline-block;
  height: auto;
  padding-inline: 0;
  justify-content: start;
  align-items: start;
  border-radius: var(--radius-xs);
  font-weight: 500;
  background-color: transparent;
  text-decoration: underline;
  text-underline-offset: 0.2rem;

  .iconify {
    font-size: inherit;
    margin-inline-end: 0.35rem;
    vertical-align: middle;

    &.external-link {
      margin-inline-start: 0.35rem;
    }
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
    opacity: 65%;
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
  }
}

.button--icon-only {
  aspect-ratio: 1;
  padding: 0;
  border-radius: var(--radius-full);
}
</style>
