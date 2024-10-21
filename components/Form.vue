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
  --col-width-75: calc(75% - calc(var(--column-gap) / 4));

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
    flex-grow: 0;

    &[type='submit'] {
      flex-basis: 8rem;
    }
  }
}
</style>
