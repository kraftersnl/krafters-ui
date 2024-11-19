<script setup lang="ts">
const model = defineModel<(string | number)[]>();

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

const id = useId();
</script>

<template>
  <div class="checkboxes-wrapper">
    <template v-if="options?.length">
      <fieldset>
        <legend :class="`${hideLegend ? 'visuallyhidden' : ''}`">
          {{ label }}
        </legend>

        <ul role="list" class="checkbox-list">
          <li v-for="option in options" :key="'checkbox-' + option.value">
            <Checkbox
              v-model="model"
              :value="option[valueKey]"
              :label="option[labelKey]"
              :title="titleKey ? option[titleKey] : undefined"
              :name="id"
            />
          </li>
        </ul>
      </fieldset>
    </template>
  </div>
</template>

<style>
.checkboxes-wrapper {
  legend {
    font-size: var(--font-size-lg);
    margin-block-end: 1rem;
  }

  .checkbox-list {
    display: grid;
    gap: 0.5rem;
    margin-block-end: 1rem;
  }
}
</style>
