import type Dialog from '../app/components/Dialog.vue';
import type Form from '../app/components/Form.vue';
import type Textarea from '../app/components/Textarea.vue';
import type Input from '../app/components/Input.vue';
import type FileInput from '../app/components/FileInput.vue';
import type Button from '../app/components/Button.vue';
import type Popover from '../app/components/Popover.vue';

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
    iconLib?: string;
    to?: string;
    disabled?: boolean;
    divider?: boolean;
    external?: boolean;
    target?: string;
    onClick?: () => void;
  };

  type DialogComponent = InstanceType<typeof Dialog>;
  type FormComponent = InstanceType<typeof Form>;
  type TextareaComponent = InstanceType<typeof Textarea>;
  type InputComponent = InstanceType<typeof Input>;
  type FileInputComponent = InstanceType<typeof FileInput>;
  type ButtonComponent = InstanceType<typeof Button>;
  type PopoverComponent = InstanceType<typeof Popover>;

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
