<template>
  <a href="#main" class="skip-link">{{ $t('aria.skip-to-main-content') }}</a>
</template>

<style>
.skip-link {
  position: absolute;
  z-index: 9;
  inset-inline: 0;
  inset-block-start: 0;
  margin-inline: auto;
  width: max-content;
  font-weight: 600;
  font-size: var(--font-size-xs);
  background-color: var(--color-white);
  color: var(--color-text);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  transform: translateY(-100%);
  text-decoration-color: transparent;
  transition-property: color, background-color, transform;
  transition-duration: var(--duration-md);

  &:focus {
    outline: 2px solid var(--focus-color);
    outline-offset: -1px;
    transform: translateY(1rem);
  }
}
</style>
