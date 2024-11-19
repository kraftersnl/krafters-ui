<script setup lang="ts">
const model = defineModel<boolean | (string | number)[]>();

defineProps<{
  label: string;
  title?: string;
  name?: string;
  value?: string | number;
  required?: boolean;
}>();

const id = useId();
</script>

<template>
  <div class="checkbox-wrapper">
    <input
      :id="id"
      v-model="model"
      type="checkbox"
      :name="name"
      :value="value"
    />

    <label :for="id" :title="title">
      <span>{{ label }}</span>

      <Chip v-if="required" size="sm" :label="$t('form-errors.required')">
        <span class="visuallyhidden">,</span>
      </Chip>
    </label>
  </div>
</template>

<style>
.checkbox-wrapper {
  display: inline-flex;

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
