<script setup lang="ts">
const { locale, setLocale } = useI18n();

const prefersDutch = computed(() => locale.value.startsWith('nl'));
const prefersEnglish = computed(() => locale.value.startsWith('en'));

watch(
  () => locale.value,
  () => {
    useHead({
      htmlAttrs: {
        lang: prefersDutch.value ? 'nl' : 'en',
      },
    });
  },
);
</script>

<template>
  <div class="language-select">
    <fieldset class="language-fieldset">
      <legend>{{ $t('general.language') }}</legend>

      <ul role="list" class="language-options-list">
        <li class="language-option">
          <input
            id="language-option-english"
            v-model="$i18n.locale"
            name="i18n"
            value="en"
            type="radio"
          />
          <label for="language-option-english" lang="en"> English </label>
        </li>

        <li class="language-option">
          <input
            id="language-option-dutch"
            v-model="$i18n.locale"
            name="i18n"
            value="nl"
            type="radio"
          />
          <label for="language-option-dutch" lang="nl"> Nederlands </label>
        </li>
      </ul>
    </fieldset>
  </div>
</template>

<style>
.language-fieldset {
  legend {
    width: 100%;
    font-size: var(--font-size-xs);
    font-weight: 400;
    color: var(--color-grey-text);
    margin-block-end: 0.5rem;
  }
}

.language-options-list {
  display: inline-flex;
  gap: 0.5rem;
  justify-content: space-between;
}

.language-option {
  flex-grow: 1;

  input[type='radio'] {
    position: absolute;
    z-index: -1;
    opacity: 0;

    + label {
      font-size: var(--font-size-xs);
      display: flex;
      align-items: center;
      padding-block: 0.35rem;
      padding-inline: 0.5rem 0.65rem;
      min-width: 75px;
      justify-content: center;
      border: 1px solid var(--color-accent-bg);
      border-radius: var(--radius-md);
      color: var(--color-accent-text);

      &:hover {
        color: var(--color-accent);
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
        background-color: var(--color-accent-bg);

        .iconify {
          color: var(--color-accent);
        }
      }
    }
  }
}
</style>
