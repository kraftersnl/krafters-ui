<script setup lang="ts">
const validity = ref(true);

function handleSubmit(event: Event) {
  const target = event.target as HTMLFormElement;
  validity.value = target.checkValidity();

  if (validity.value) {
    const data = new FormData(target);
    emit('submit', data);
  } else {
    const firstInvalidElement: HTMLElement | null =
      target.querySelector(':invalid');
    firstInvalidElement?.focus();
  }
}

const emit = defineEmits(['submit']);
</script>

<template>
  <form
    :class="`form ${!validity ? 'invalid' : 'valid'}`"
    novalidate
    action="."
    @submit.prevent="handleSubmit"
  >
    <slot />
  </form>
</template>

<style>
.form {
  --row-gap: 1rem;
  --column-gap: 0.5rem;
  --col-width-auto: auto;
  --col-width-25: calc(25% - calc(var(--column-gap) / 4 * 3));
  --col-width-33: calc(33.333% - calc(var(--column-gap) / 3 * 2));
  --col-width-50: calc(50% - calc(var(--column-gap) / 2));
  --col-width-67: calc(66.666% - calc(var(--column-gap) / 3));

  display: flex;
  flex-wrap: wrap;
  row-gap: var(--row-gap);
  column-gap: var(--column-gap);
  container-type: inline-size;

  > * {
    flex-basis: 100%;
    flex-grow: 1;

    @container (min-width: 400px) {
      flex-basis: var(--col-width, 100%);
    }
  }

  .button {
    flex-basis: 8rem;
    flex-grow: 0;
  }
}

.form-field-wrapper {
  display: grid;
  align-items: center;
  align-content: start;

  label {
    display: inline-flex;
    gap: 0.35rem;
    min-height: 1.25rem;
    align-items: center;
    font-size: var(--font-size-xs);
    margin-block-end: 0.25rem;

    ::first-letter {
      text-transform: capitalize;
    }
  }

  &:has(:disabled) {
    label {
      color: var(--color-grey-graphic);
    }
    input {
      opacity: 0.35;
    }
  }
}

.error-wrapper {
  .error {
    display: none;
    align-items: center;
    gap: 0.25rem;
    color: var(--color-red);
    font-size: var(--font-size-xs);
    padding-block-start: 0.25rem;
  }
}

.invalid {
  select,
  textarea,
  input[type='search'],
  input[type='number'],
  input[type='text'],
  input[type='email'],
  input[type='url'],
  input[type='tel'],
  input[type='password'] {
    &:invalid {
      /* outline: 1px solid var(--color-red); */
      border-color: var(--color-red);

      + .error-wrapper .error {
        display: flex;
      }
    }
  }
}
</style>
