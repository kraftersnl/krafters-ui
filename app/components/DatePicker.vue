<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import type { ModelValue } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const model = defineModel<ModelValue>();

// https://vue3datepicker.com/props/modes/
const {
  format = 'yyyy-MM-dd',
  enableTimePicker = false,
  showSelect = true,
  showCancel = true,
  monthChangeOnScroll = false,
  id = useId(),
  size = 'md',
} = defineProps<{
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
  id?: string;
  size?: InputSize;
}>();

const datepickerRef = useTemplateRef('datepicker');
const colorMode = useColorMode();
const isMounted = ref(false);
const isDark = computed(() => isMounted.value && colorMode.value === 'dark');

const isExpanded = ref(false);

function handleOpen() {
  isExpanded.value = true;
}

function handleClose() {
  isExpanded.value = false;
}

function preventEscape(event: KeyboardEvent) {
  if (event.key === 'Escape' && isExpanded.value) {
    console.log('prevent');
    event.preventDefault();
    datepickerRef.value?.closeMenu();
    isExpanded.value = false;
  }
}

onMounted(() => {
  isMounted.value = true;
  document.addEventListener('keydown', (event) => preventEscape(event));
});

onUnmounted(() => document.removeEventListener('keydown', preventEscape));
</script>

<template>
  <div
    :class="[
      'form-field-wrapper krafters-datepicker-container',
      `datepicker-size--${size}`,
    ]"
  >
    <label :for="`dp-input-${id}`">
      <span>{{ label }}</span>

      <Chip v-if="required" size="xs" :label="$t('form.required')" />
    </label>

    <VueDatePicker
      :id="id"
      ref="datepicker"
      v-model="model"
      v-bind="$attrs"
      auto-apply
      :esc-close="false"
      :text-input="textInput"
      :utc="utc"
      :enable-time-picker="enableTimePicker"
      :uid="id"
      :format="format"
      :required="required"
      :disabled="disabled"
      :month-change-on-scroll="monthChangeOnScroll"
      :action-row="{ showSelect, showCancel, showNow, showPreview }"
      :dark="isDark"
      :locale="$i18n.locale"
      :select-text="$t('datepicker.selectText')"
      :cancel-text="$t('datepicker.cancelText')"
      :now-button-label="$t('datepicker.nowButtonLabel')"
      aria-live="polite"
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
      class="krafters-datepicker"
      @open="handleOpen"
      @closed="handleClose"
    >
      <template #input-icon>
        <Icon name="material-symbols:calendar-month-outline-rounded" />
      </template>
    </VueDatePicker>

    <div
      v-if="required"
      :id="id ? `error-${id}` : undefined"
      class="error-wrapper"
      aria-live="polite"
    >
      <div class="error">
        <Icon name="material-symbols:warning-rounded" />

        <span>{{ $t('form.missing-value', { item: label }) }}</span>
      </div>
    </div>
  </div>
</template>

<style>
.krafters-datepicker-container {
  display: grid;
  transition-property: opacity;
  transition-duration: var(--duration-sm);

  &:has(.dp__disabled) {
    opacity: 35%;
  }
}

.dp__theme_light,
.dp__theme_dark {
  --dp-background-color: var(--color-select-bg);
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
  --dp-border-radius: var(--radius-md);
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
  &::placeholder {
    opacity: 1;
    color: var(--color-grey-text);
  }
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

.show-invalid {
  .dp__input {
    &:invalid {
      border-color: var(--color-red-graphic);
      outline: 1px solid var(--color-red-graphic);
    }
  }

  .krafters-datepicker-container:has(:invalid) {
    .error-wrapper .error {
      display: flex;
    }
  }
}

/* Sizes */
.datepicker-size--sm .dp__input {
  min-height: 2rem;
}
.datepicker-size--md .dp__input {
  min-height: 2.25rem;
}
.datepicker-size--lg .dp__input {
  min-height: 2.5rem;
}
</style>
