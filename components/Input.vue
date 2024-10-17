<script setup lang="ts">
const props = defineProps<{
  modelValue?: string | number | undefined;
  label: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  type?: string;
  autocomplete?: string;
  pattern?: string;
  placeholder?: string;
  maxlength?: number;
  hideLabel?: boolean;
  min?: number | string;
  max?: number | string;
}>();

const id = useId();

const inputMode = computed(() => {
  if (props.type === 'email') return 'email';
  if (props.type === 'tel') return 'tel';
  if (props.type === 'url') return 'url';
  if (props.type === 'number') return 'decimal';
  return 'text';
});

const inputPattern = computed(() => {
  if (props.pattern) return props.pattern;
  if (props.type === 'tel') return '^[0-9]+$';
  return undefined;
});

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;

  if (props.type === 'number') {
    if (typeof props.min === 'number' && Number(target.value) < props.min) {
      return;
    }
    if (typeof props.max === 'number' && Number(target.value) > props.max) {
      return;
    }
  }
  emit('update:modelValue', target.value);
}

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="form-field-wrapper input">
    <label :for="id" :class="hideLabel ? 'visuallyhidden' : ''">
      <span>{{ label }}</span>

      <Chip v-if="required" size="sm" :label="$t('form-errors.required')">
        <span class="visuallyhidden">,</span>
        <wbr class="visuallyhidden" />
      </Chip>
    </label>

    <input
      :id="id"
      :value="modelValue"
      :name="name"
      :type="type || 'text'"
      :autocomplete="autocomplete"
      :inputmode="inputMode"
      :pattern="inputPattern"
      :required="required"
      :disabled="disabled"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :aria-describedby="required ? `error-${id}` : undefined"
      @input="handleInput"
    />

    <div
      v-if="required"
      :id="`error-${id}`"
      class="error-wrapper"
      aria-live="polite"
    >
      <div class="error">
        <Icon name="heroicons-solid:exclamation" />

        <span>{{ $t('form-errors.not-filled-in', { item: label }) }}</span>
      </div>
    </div>
  </div>
</template>

<style>
.form-field-wrapper.input {
  input {
    background-color: var(--color-input-bg);
  }
}
</style>
