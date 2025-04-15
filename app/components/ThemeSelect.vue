<script setup lang="ts">
const colorMode = useColorMode();
</script>

<template>
  <div class="theme-select">
    <fieldset class="color-theme-fieldset">
      <legend>
        {{ $t('theme.heading') }}
      </legend>

      <ul role="list" class="theme-options-list">
        <li class="color-theme-option">
          <input
            id="color-theme-light"
            v-model="colorMode.preference"
            name="color-theme"
            value="light"
            type="radio"
          />

          <label for="color-theme-light">
            <Icon name="heroicons-solid:sun" />
            <span>
              {{ $t('theme.light') }}
            </span>
          </label>
        </li>

        <li class="color-theme-option">
          <input
            id="color-theme-dark"
            v-model="colorMode.preference"
            name="color-theme"
            value="dark"
            type="radio"
          />

          <label for="color-theme-dark">
            <Icon name="heroicons-solid:moon" />
            <span>
              {{ $t('theme.dark') }}
            </span>
          </label>
        </li>

        <li class="color-theme-option">
          <input
            id="color-theme-system"
            v-model="colorMode.preference"
            name="color-theme"
            value="system"
            type="radio"
          />
          <label for="color-theme-system">
            <Icon name="heroicons-solid:computer-desktop" />
            <span>
              {{ $t('theme.system') }}
            </span>
          </label>
        </li>
      </ul>
    </fieldset>
  </div>
</template>

<style>
.color-theme-fieldset {
  legend {
    width: 100%;
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-regular);
    color: var(--color-grey-text);
    margin-block-end: 0.5rem;
  }
}

.theme-options-list {
  display: inline-flex;
  gap: 0.5rem;
  justify-content: space-between;
}

.color-theme-option {
  flex-grow: 1;

  input[type='radio'] {
    position: absolute;
    z-index: -1;
    opacity: 0;

    + label {
      font-size: var(--font-size-xs);
      display: flex;
      gap: 0.35rem;
      align-items: center;
      padding-block: 0.35rem;
      padding-inline: 0.5rem;
      min-width: 75px;
      justify-content: center;
      border: 1px solid var(--color-grey-bg);
      border-radius: var(--radius-md);
      color: var(--color-grey-text);

      &:hover {
        color: var(--color-text);
        border-color: var(--color-grey-graphic);
      }
    }

    &:focus-visible {
      + label {
        outline: 2px solid var(--focus-color);
        outline-offset: 2px;
        border-radius: var(--radius-xs);
      }
    }

    &:checked {
      + label {
        color: var(--color-accent);
        border-color: var(--color-accent);
        background-color: var(--color-accent-bg);

        .iconify {
          color: var(--color-accent);
        }
      }
    }
  }
}
</style>
