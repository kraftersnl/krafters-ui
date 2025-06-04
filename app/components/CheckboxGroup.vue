<script setup lang="ts">
const model = defineModel<(string | number)[]>();

const {
  valueKey = 'value',
  labelKey = 'label',
  nameKey = 'value',
  disabledKey = 'disabled',
  variant = 'default',
  titleKey = undefined,
  tabindex = undefined,
} = defineProps<{
  options: any[];
  label: string;
  tabindex?: string;
  valueKey?: string;
  labelKey?: string;
  nameKey?: string;
  disabledKey?: string;
  titleKey?: string;
  hideLegend?: boolean;
  variant?: 'default' | 'krafters';
}>();
</script>

<template>
  <div class="checkboxes-wrapper">
    <template v-if="options?.length">
      <fieldset>
        <legend v-if="label" :class="[hideLegend && 'visuallyhidden']">
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
              :hide-label="option.hideLabel"
              :tabindex="tabindex"
              :variant="variant"
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
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-md);
    margin-block-end: 1rem;
  }

  .checkbox-list {
    display: grid;
    gap: 0.5rem;
  }
}
</style>
