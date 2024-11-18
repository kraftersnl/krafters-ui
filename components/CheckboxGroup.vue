<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: (string | number)[];
    options: any[];
    label: string;
    name?: string;
    valueKey?: string;
    labelKey?: string;
    hideLegend?: boolean;
  }>(),
  {
    name: undefined,
    valueKey: 'value',
    labelKey: 'label',
  },
);

const id = useId();

const computedModel = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="checkboxes-wrapper">
    <template v-if="options?.length">
      <fieldset>
        <legend :Class="`${hideLegend ? 'visuallyhidden' : ''}`">
          {{ label }}
        </legend>

        <ul role="list" class="checkbox-list">
          <li v-for="option in options" :key="'checkbox-' + option.value">
            <Checkbox
              v-model="computedModel"
              :value="option[props.valueKey]"
              :label="option[props.labelKey]"
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
