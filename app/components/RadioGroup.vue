<script setup lang="ts">
const model = defineModel<string | number>();

withDefaults(
  defineProps<{
    options: any[];
    label: string;
    name?: string;
    valueKey?: string;
    labelKey?: string;
    titleKey?: string;
    hideLegend?: boolean;
  }>(),
  {
    name: undefined,
    valueKey: 'value',
    labelKey: 'label',
    titleKey: undefined,
  },
);
</script>

<template>
  <div class="radios-wrapper">
    <template v-if="options?.length">
      <fieldset>
        <legend :class="`${hideLegend ? 'visuallyhidden' : ''}`">
          {{ label }}
        </legend>

        <ul role="list" class="radio-list">
          <li v-for="option in options" :key="'radio-' + option.value">
            <input
              :id="option[valueKey]"
              v-model="model"
              :value="option[valueKey]"
              :title="titleKey ? option[titleKey] : undefined"
              :name="name"
              type="radio"
            />
            <label :for="option[valueKey]">{{ option[labelKey] }}</label>
          </li>
        </ul>
      </fieldset>
    </template>
  </div>
</template>

<style>
.radios-wrapper {
  margin-block: 0.5rem;

  legend {
    font-size: var(--font-size-md);
    margin-block-end: 1rem;
  }

  .radio-list {
    display: grid;
    gap: 0.5rem;
    font-size: var(--font-size-sm);

    input[type='radio'] {
      width: 1rem;
      height: 1rem;
    }

    label {
      padding-inline-start: 0.25rem;
    }
  }
}
</style>
