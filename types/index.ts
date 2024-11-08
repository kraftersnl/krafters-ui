import type Dialog from '../components/Dialog.vue';
import type Textarea from '../components/Textarea.vue';
import type Input from '../components/Input.vue';

declare global {
  type BaseColor =
    | 'default'
    | 'accent'
    | 'blue'
    | 'green'
    | 'red'
    | 'orange'
    | 'yellow';

  type TabOption = {
    value: string;
    label: string;
    disabled?: boolean;
  };

  type MenuItem = {
    id: string;
    label?: string;
    icon?: string;
    to?: string;
    disabled?: boolean;
    divider?: boolean;
    onClick?: () => void;
  };

  type DialogComponent = InstanceType<typeof Dialog>;
  type TextareaComponent = InstanceType<typeof Textarea>;
  type InputComponent = InstanceType<typeof Input>;

  type PopperPlacement =
    | 'auto'
    | 'auto-start'
    | 'auto-end'
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'left'
    | 'left-start'
    | 'left-end';

  type DatePickerAriaLabels = {
    toggleOverlay?: string;
    menu?: string;
    input?: string;
    openTimePicker?: string;
    closeTimePicker?: string;
    incrementValue?: (type: 'hours' | 'minutes' | 'seconds') => string;
    decrementValue?: (type: 'hours' | 'minutes' | 'seconds') => string;
    openTpOverlay?: (type: 'hours' | 'minutes' | 'seconds') => string;
    amPmButton?: string;
    openYearsOverlay?: string;
    openMonthsOverlay?: string;
    nextMonth?: string;
    prevMonth?: string;
    nextYear: string;
    prevYear: string;
    day?: ({ value }: { value: Date }) => string;
    weekDay?: (day: number) => string;
    clearInput?: string;
    calendarIcon?: string;
    timePicker?: string;
    monthPicker: (overlay: boolean) => string;
    yearPicker: (overlay: boolean) => string;
    timeOverlay: (type: 'hours' | 'minutes' | 'seconds') => string;
  };
}
