<script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean | (string | number)[];
  label: string;
  name?: string;
  value?: string | number;
  required?: boolean;
}>();

const id = useId();

const computedModel = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="checkbox-wrapper">
    <input
      :id="id"
      v-model="computedModel"
      type="checkbox"
      :name="name"
      :value="value"
    />

    <label :for="id">
      <span>{{ label }}</span>

      <Chip v-if="required" size="sm" :label="$t('form-errors.required')">
        <span class="visuallyhidden">,</span>
        <wbr class="visuallyhidden" />
      </Chip>
    </label>
  </div>
</template>

<style>
.checkbox-wrapper {
  display: inline-flex;
  align-items: center;

  label {
    padding-inline-start: 0.5rem;
    font-size: var(--font-size-sm);
  }

  input[type='checkbox'] {
    margin: 0;
    cursor: pointer;
    width: 1rem;
    height: 1rem;
  }
}
</style>
