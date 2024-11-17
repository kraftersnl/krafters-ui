<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

// https://vue3datepicker.com/props/modes/
const props = withDefaults(
  defineProps<{
    modelValue?: string | Date;
    label: string;
    format?: string | ((date: Date) => string) | ((dates: Date[]) => string);
    required?: boolean;
    disabled?: boolean;
    utc?: boolean;
    textInput?: boolean;
    enableTimePicker?: boolean;
    showSelect?: boolean;
    showCancel?: boolean;
    showNow?: boolean;
    showPreview?: boolean;
    teleportCenter?: boolean;
    monthChangeOnScroll?: boolean;
  }>(),
  {
    modelValue: undefined,
    format: 'yyyy-MM-dd',
    textInput: undefined,
    utc: false,
    enableTimePicker: false,
    showSelect: true,
    showCancel: true,
    monthChangeOnScroll: false,
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
  <div class="form-field-wrapper cardan-datepicker-container">
    <label :for="`dp-input-${id}`">
      <span>{{ label }}</span>

      <Chip v-if="required" size="sm" :label="$t('form-errors.required')">
        <span class="visuallyhidden">,</span>
      </Chip>
    </label>

    <VueDatePicker
      :id="id"
      v-model="computedModel"
      v-bind="$attrs"
      auto-apply
      :text-input="textInput"
      :utc="utc"
      :enable-time-picker="enableTimePicker"
      :uid="id"
      :format="format"
      :required="required"
      :disabled="disabled"
      :month-change-on-scroll="monthChangeOnScroll"
      :action-row="{ showSelect, showCancel, showNow, showPreview }"
      :dark="$colorMode?.value === 'dark'"
      :locale="$i18n.locale"
      :select-text="$t('datepicker.selectText')"
      :cancel-text="$t('datepicker.cancelText')"
      :now-button-label="$t('datepicker.nowButtonLabel')"
      :aria-describedby="id && required ? `error-${id}` : ''"
      :aria-labels="{
        input: $t('datepicker.input'),
        clearInput: $t('datepicker.clearInput'),
        toggleOverlay: $t('datepicker.toggleOverlay'),
        calendarWrap: $t('datepicker.calendarWrap'),
        calendarDays: $t('datepicker.calendarDays'),
        openTimePicker: $t('datepicker.openTimePicker'),
        closeTimePicker: $t('datepicker.closeTimePicker'),
        openYearsOverlay: $t('datepicker.openYearsOverlay'),
        openMonthsOverlay: $t('datepicker.openMonthsOverlay'),
        nextMonth: $t('datepicker.nextMonth'),
        prevMonth: $t('datepicker.prevMonth'),
        nextYear: $t('datepicker.nextYear'),
        prevYear: $t('datepicker.prevYear'),
      }"
      class="cardan-datepicker"
    >
      <template #input-icon>
        <Icon name="heroicons-solid:calendar-days" />
      </template>
    </VueDatePicker>

    <div
      v-if="required"
      :id="id ? `error-${id}` : undefined"
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
.cardan-datepicker-container {
  display: grid;
}

.dp__theme_light,
.dp__theme_dark {
  --dp-background-color: var(--color-white);
  --dp-text-color: var(--color-text);
  --dp-hover-color: var(--color-grey-bg);
  --dp-hover-text-color: var(--color-text);
  --dp-hover-icon-color: var(--dp-icon-color);
  --dp-primary-color: var(--color-accent);
  --dp-primary-disabled-color: var(--color-accent-bg);
  --dp-primary-text-color: var(--color-white);
  --dp-secondary-color: var(--color-grey-bg);
  --dp-border-color: var(--color-grey-graphic);
  --dp-menu-border-color: var(--color-grey-bg);
  --dp-border-color-hover: var(--dp-border-color);
  --dp-border-color-focus: var(--focus-color);
  --dp-disabled-color: var(--color-grey-bg);
  --dp-scroll-bar-background: var(--color-grey-bg);
  --dp-scroll-bar-color: var(--color-grey-graphic);
  --dp-success-color: var(--color-green);
  --dp-success-color-disabled: var(--color-green-bg);
  --dp-icon-color: var(--color-grey-text);
  --dp-danger-color: var(--color-red);
  --dp-marker-color: var(--color-red);
  --dp-disabled-color-text: var(--color-grey-graphic);
  --dp-highlight-color: var(--color-accent-bg);
}

:root {
  --dp-font-family: system-ui, sans-serif;
  --dp-border-radius: var(--radius-sm);
  --dp-input-padding: 0;
}

.dp__button {
  color: var(--color-text);

  &:hover {
    color: var(--color-text);
  }

  &::after {
    content: attr(aria-label);
    margin-inline-start: 0.5rem;
  }
}

.dp__input {
  min-height: 2.5rem;
  background-color: var(--color-select-bg);
}

.dp__input_focus {
  outline: 1px solid var(--dp-border-color-focus);
}

.dp__input_icon {
  display: flex;
  margin-inline-start: 0.5rem;

  .iconify {
    width: 20px;
    height: 20px;
  }
}

.dp__input_icons {
  padding: 6px;
}

.invalid {
  .dp__input {
    &:invalid {
      border-color: var(--color-red);
      outline: 1px solid var(--color-red);
    }
  }

  .cardan-datepicker-container:has(:invalid) {
    .error-wrapper .error {
      display: flex;
    }
  }
}
</style>
