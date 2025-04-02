<script setup lang="ts">
const model = defineModel<string | number>();

const { valueKey = 'value', labelKey = 'label' } = defineProps<{
  options: any[];
  label: string;
  name?: string;
  tabindex?: string;
  valueKey?: string;
  labelKey?: string;
  titleKey?: string;
  hideLegend?: boolean;
}>();
</script>

<template>
  <div class="radios-wrapper">
    <template v-if="options?.length">
      <fieldset v-if="label">
        <legend :class="[hideLegend && 'visuallyhidden']">
          {{ label }}
        </legend>

        <ul role="list" class="radio-list">
          <li v-for="option in options" :key="'radio-' + option.value">
            <input
              :id="option[valueKey]"
              v-model="model"
              :value="option[valueKey]"
              :disabled="option.disabled"
              :title="titleKey ? option[titleKey] : undefined"
              :name="name"
              :tabindex="tabindex"
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
  margin-block-end: 0.5rem;

  legend {
    font-size: var(--font-size-md);
    margin-block-end: 0.75rem;
  }

  .radio-list {
    display: grid;
    font-size: var(--font-size-md);

    input[type='radio'] {
      width: 1rem;
      height: 1rem;

      &:disabled {
        ~ label {
          color: var(--color-grey-bg);
        }
      }
    }

    label {
      padding-inline-start: 0.25rem;
    }
  }
}
</style>
