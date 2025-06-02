<script setup lang="ts">
const model = defineModel<string | number>();

const {
  valueKey = 'value',
  labelKey = 'label',
  variant = 'default',
  id = useId(),
} = defineProps<{
  options: any[];
  label: string;
  name?: string;
  tooltip?: string;
  tabindex?: string;
  valueKey?: string;
  labelKey?: string;
  titleKey?: string;
  id?: string;
  hideLegend?: boolean;
  required?: boolean;
  inline?: boolean;
  variant?: 'default' | 'krafters';
}>();
</script>

<template>
  <div class="radios-wrapper">
    <fieldset v-if="options?.length">
      <legend v-if="label || tooltip" :class="[hideLegend && 'visuallyhidden']">
        <Tooltip
          v-if="tooltip"
          :label="label"
          :hide-label="false"
          icon-color="accent-text"
        >
          {{ tooltip }}
        </Tooltip>
        <span v-else>{{ label }}</span>
      </legend>

      <ul role="list" :class="['radio-list', inline && 'inline']">
        <li v-for="option in options" :key="'radio-' + option.value">
          <Radio
            v-model="model"
            :value="option[valueKey]"
            :label="option[labelKey]"
            :disabled="option.disabled"
            :title="titleKey ? option[titleKey] : undefined"
            :name="name"
            :tabindex="tabindex"
            :required="required"
            :variant="variant"
            type="radio"
          />
        </li>
      </ul>
    </fieldset>

    <div
      :id="id ? `error-${id}` : undefined"
      class="error-wrapper"
      aria-live="polite"
    >
      <div class="error">
        <Icon name="heroicons-solid:exclamation" />

        <span>{{ $t('form.missing-value', { item: label }) }}</span>
      </div>
    </div>
  </div>
</template>

<style>
.radios-wrapper {
  legend {
    margin-block-end: 1rem;
  }

  legend {
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-md);

    .tooltip-content {
      font-weight: 400;
    }
  }

  .radio-list {
    display: grid;
    gap: 0.5rem;

    &.inline {
      display: flex;
      flex-wrap: Wrap;
      row-gap: 0.5rem;
      column-gap: 1rem;
    }
  }

  &:has(input[type='radio']:invalid) {
    legend {
      color: var(--color-red);
    }

    .error-wrapper .error {
      display: flex;
    }
  }
}
</style>
