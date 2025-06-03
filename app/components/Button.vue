<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

const {
  label = undefined,
  fontSize = undefined,
  iconSize = undefined,
  radius = undefined,
  href = undefined,
  to = undefined,
  title = undefined,
  target = undefined,
  icon = undefined,
  iconPos = 'start',
  variant = 'secondary',
  size = 'md',
  type = 'button',
} = defineProps<{
  label?: string;
  icon?: string;
  iconPos?: 'start' | 'end';
  to?: RouteLocationRaw;
  href?: string;
  target?: string;
  title?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fontSize?: FontSize;
  iconSize?: FontSize;
  radius?: BorderRadius;
  hideLabel?: boolean;
  disabled?: boolean;
  loading?: boolean;
  download?: boolean;
  external?: boolean;
  hideExternalIcon?: boolean;
  type?: 'button' | 'submit' | 'reset';
}>();

const computedStyle = computed(() => ({
  '--radius': radius && `var(--radius-${radius})`,
  '--font-size': fontSize && `var(--font-size-${fontSize})`,
  '--icon-size': iconSize && `var(--font-size-${iconSize})`,
}));

const computedIcon = computed(() => {
  if (icon?.includes(':')) {
    return icon;
  }
  return `heroicons-solid:${icon}`;
});

function handleClick() {
  emit('click');
}
const buttonRef = useTemplateRef<HTMLButtonElement | HTMLAnchorElement>(
  'button',
);

function focusElement() {
  buttonRef.value?.focus();
}

defineExpose({ focusElement });

const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <NuxtLink
    v-if="to || href"
    ref="button"
    :to="disabled ? undefined : to || href"
    :target="target"
    :external="external"
    :class="[
      'button',
      `button-size--${size}`,
      `button-variant--${variant}`,
      `icon-position--${iconPos}`,
      hideLabel && 'button--icon-only',
      loading && 'button--loading',
      (loading || disabled) && 'disabled',
    ]"
    :style="computedStyle"
    :title="
      !download && target === '_blank' ? $t('aria.open-new-window') : undefined
    "
    @click="handleClick"
  >
    <slot name="icon" />
    <Icon v-if="loading" name="svg-spinners:90-ring-with-bg" />
    <Icon v-else-if="icon" :name="computedIcon" />

    <span v-if="label" :class="['button-text', hideLabel && 'visuallyhidden']">
      {{ label }}
    </span>

    <template v-if="!hideExternalIcon && target === '_blank'">
      <Icon name="solar:square-bottom-up-linear" class="external-link" />
    </template>

    <slot name="default" />
  </NuxtLink>

  <button
    v-else
    ref="button"
    :type="type"
    :disabled="loading || disabled"
    :class="[
      'button',
      `button-size--${size}`,
      `button-variant--${variant}`,
      `icon-position--${iconPos}`,
      hideLabel && 'button--icon-only',
      loading && 'button--loading',
    ]"
    :style="computedStyle"
    :title="disabled ? undefined : title"
    @click="handleClick"
  >
    <slot name="icon" />
    <Icon v-if="loading" name="svg-spinners:90-ring-with-bg" />
    <Icon v-else-if="icon" :name="computedIcon" />

    <span v-if="label" :class="['button-text', hideLabel && 'visuallyhidden']">
      {{ label }}
    </span>

    <span v-if="$slots.default">
      <slot name="default" />
    </span>
  </button>
</template>

<style>
.button {
  border-radius: var(--radius, var(--radius-sm));
  -webkit-tap-highlight-color: transparent;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size, var(--font-size-sm));
  border: 1px solid transparent;
  transition-property: color, background-color, opacity;
  transition-duration: var(--duration-sm);
  text-decoration: none;
  outline: 2px solid transparent;
  outline-offset: 2px;

  &:focus-visible {
    outline-color: var(--focus-color);
    text-decoration: none;
  }

  &[disabled],
  &.disabled {
    pointer-events: none;
    cursor: default;
    opacity: 35%;
  }

  .iconify {
    font-size: var(--icon-size, larger);
    flex-shrink: 0;
    transition-duration: var(--duration-sm);
  }
}

.icon-position--start {
  flex-direction: row;
}

.icon-position--end {
  flex-direction: row-reverse;
}

.button-size--xs {
  font-size: var(--font-size, var(--font-size-xxs));
  min-height: 1.5rem;
  padding-inline: 0.5rem;

  .iconify {
    font-size: var(--font-size, var(--font-size-sm));
  }
}

.button-size--xxs {
  font-size: var(--font-size, var(--font-size-xxs));
  min-height: 1.25rem;
  padding-inline: 0.25rem;

  .iconify {
    font-size: var(--icon-size, larger);
  }
}

.button-size--sm {
  font-size: var(--font-size, var(--font-size-xs));
  min-height: 2rem;
  padding-inline: 0.65rem;

  .button-text {
    padding-inline: 0.1rem;
  }

  .iconify {
    font-size: var(--icon-size, larger);
  }
}

.button-size--md {
  font-size: var(--font-size, var(--font-size-sm));
  min-height: 2.25rem;
  padding-inline: 0.75rem;

  .button-text {
    padding-inline: 0.2rem;
  }

  .iconify {
    font-size: var(--icon-size, larger);
  }
}

.button-size--lg {
  font-size: var(--font-size, var(--font-size-sm));
  min-height: 2.5rem;
  padding-inline: 0.85rem;

  .button-text {
    padding-inline: 0.2rem;
  }

  .iconify {
    font-size: var(--icon-size, larger);
  }
}

.button-size--xl {
  font-size: var(--font-size, var(--font-size-md));
  min-height: 3rem;
  padding-inline: 1.25rem;

  .button-text {
    padding-inline: 0.25rem;
  }

  .iconify {
    font-size: var(--icon-size, larger);
  }
}

.button-size--xxl {
  font-size: var(--font-size, var(--font-size-md));
  min-height: 3.5rem;
  padding-inline: 1.5rem;

  .button-text {
    padding-inline: 0.5rem;
  }

  .iconify {
    font-size: var(--icon-size, larger);
  }
}

.button-variant--primary {
  color: var(--color-white);
  background-color: var(--color-accent);
  white-space: nowrap;

  &:not(:disabled, .disabled):hover {
    background-color: color-mix(
      in srgb,
      var(--color-accent) 90%,
      var(--color-white)
    );
  }
}

.button-variant--danger {
  color: var(--color-red-text);
  background-color: var(--color-red-bg);
  white-space: nowrap;

  &:not(:disabled, .disabled):hover {
    color: var(--color-red-bg);
    background-color: var(--color-red-text);
  }
}

.button-variant--purple {
  color: var(--color-white);
  background-color: var(--color-purple);

  &:not(:disabled, .disabled):hover {
    background-color: color-mix(
      in srgb,
      var(--color-purple) 90%,
      var(--color-white)
    );
  }
}

.button-variant--green {
  color: var(--color-white);
  background-color: var(--color-green);
  white-space: nowrap;

  &:not(:disabled, .disabled):hover {
    background-color: color-mix(
      in srgb,
      var(--color-green) 85%,
      var(--color-black)
    );
  }
}

.button-variant--black {
  color: var(--color-white);
  background-color: var(--color-black);

  &:not(:disabled, .disabled):hover {
    color: var(--color-text);
    background-color: var(--color-grey-bg);
  }
}

.button-variant--white {
  color: var(--color-text);
  background-color: var(--color-white);

  &:not(:disabled, .disabled):hover {
    color: var(--color-white);
    background-color: var(--color-text);
  }
}

.button-variant--cta {
  --focus-color: var(--color-accent);
  color: white;
  background-color: var(--color-accent);
  font-size: var(--font-size-sm);
  min-height: 3.5rem;
  padding-inline: 1.5rem;
  font-weight: var(--font-weight-bold);
  white-space: nowrap;

  &:not(:disabled, .disabled):hover {
    background-color: color-mix(
      in srgb,
      var(--color-accent) 85%,
      var(--color-black)
    );
  }
}

.button-variant--secondary {
  color: var(--color-text);
  background-color: var(--color-grey-bg);
  white-space: nowrap;

  &:not(:disabled, .disabled):hover {
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

  &:not(:disabled, .disabled):hover {
    background-color: var(--color-grey-bg);
  }

  &.router-link-active {
    text-decoration: underline;
    color: var(--color-accent);
  }
}

.button-variant--link {
  --radius: 0 !important;
  overflow-wrap: anywhere;
  min-height: 0;
  height: auto;
  font-size: var(--font-size, inherit);
  display: inline-flex;
  justify-content: start;
  align-items: center;
  text-decoration: underline;
  font-weight: unset;
  background-color: transparent;
  padding-inline: 0;

  &:has(.external-link) {
    display: inline;

    .iconify {
      font-size: var(--icon-size, inherit);
      width: 1em;
      height: 1em;
      vertical-align: middle;
      margin-inline-start: 0.35em;
    }
  }

  .button-text {
    padding-inline: 0;
  }

  &:hover {
    color: var(--color-accent);
  }

  &.router-link-active {
    color: var(--color-accent);
    text-decoration: none;
  }
}

.button-variant--menu {
  width: 100%;
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  flex-direction: row-reverse;
  justify-content: space-between;
  background-color: transparent;
  white-space: nowrap;
  gap: 1.5rem;

  .iconify {
    font-size: var(--icon-size, inherit);
    color: var(--color-grey-graphic);
  }

  &:disabled {
    opacity: 1;
    color: var(--color-grey-bg);

    .iconify {
      opacity: 0.35;
    }
  }

  &:not(:disabled, .disabled):hover {
    color: var(--color-accent);
    background-color: var(--color-accent-bg);

    .iconify {
      color: var(--color-accent-text);
    }
  }

  &.router-link-active {
    font-weight: var(--font-weight-bold);
    color: var(--color-accent);

    .iconify {
      color: var(--color-accent-text);
    }
  }
}

.button-variant--sidebar {
  display: flex;
  gap: 0.5rem;
  font-weight: var(--font-weight-medium);
  justify-content: start;
  padding-inline-start: 2rem;
  background-color: transparent;
  transition-duration: 0s;

  .iconify {
    color: var(--color-grey-graphic);
  }

  &:not(:disabled, .disabled):hover {
    text-decoration: underline;

    .iconify {
      color: var(--color-grey-text);
    }
  }

  &.router-link-exact-active {
    text-decoration: underline;
    font-weight: var(--font-weight-bold);
    color: var(--color-accent);

    .iconify {
      color: var(--color-accent-text);
    }
  }
}

.button-variant--topbar {
  display: flex;
  gap: 0.5rem;
  width: 100%;
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  justify-content: start;
  padding-inline: 1rem;
  background-color: transparent;
  transition-duration: 0s;

  .iconify {
    color: var(--color-grey-graphic);
  }

  &:hover {
    text-decoration: underline;
    color: var(--color-accent);

    .iconify {
      color: var(--color-grey-text);
    }
  }

  &.router-link-exact-active {
    text-decoration: underline;
  }
}

.button--icon-only {
  aspect-ratio: 1;
  padding: 0;
}
</style>
