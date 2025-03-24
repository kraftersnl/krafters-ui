<script setup lang="ts">
const model = defineModel<(string | number)[]>();

withDefaults(
  defineProps<{
    options: any[];
    label: string;
    name?: string;
    tabindex?: string;
    valueKey?: string;
    labelKey?: string;
    nameKey?: string;
    disabledKey?: string;
    titleKey?: string;
    hideLegend?: boolean;
  }>(),
  {
    name: undefined,
    tabindex: undefined,
    valueKey: 'value',
    labelKey: 'label',
    nameKey: 'value',
    disabledKey: 'disabled',
    titleKey: undefined,
  },
);
</script>

<template>
  <div class="checkboxes-wrapper">
    <template v-if="options?.length">
      <fieldset>
        <legend v-if="label" :class="`${hideLegend ? 'visuallyhidden' : ''}`">
          {{ label }}
        </legend>

        <ul role="list" class="checkbox-list">
          <li v-for="option in options" :key="'checkbox-' + option.value">
            <Checkbox
              v-model="model"
              :value="option[valueKey]"
              :label="option[labelKey]"
              :disabled="option[disabledKey]"
              :title="titleKey ? option[titleKey] : undefined"
              :name="option[nameKey]"
              :tabindex="tabindex"
            />
          </li>
        </ul>
      </fieldset>
    </template>
  </div>
</template>

<style>
.checkboxes-wrapper {
  margin-block-end: 0.5rem;

  legend {
    font-size: var(--font-size-md);
    margin-block-end: 1rem;
  }

  .checkbox-list {
    display: grid;
    gap: 0.5rem;
  }
}
</style>
