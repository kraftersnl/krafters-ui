import type { RouteLocationRaw } from 'vue-router';
import type Dialog from '../components/Dialog.vue';
import type MobileMenu from '../components/MobileMenu.vue';
import type Form from '../components/Form.vue';
import type Textarea from '../components/Textarea.vue';
import type Input from '../components/Input.vue';
import type FileInput from '../components/FileInput.vue';
import type Button from '../components/Button.vue';
import type Popover from '../components/Popover.vue';
import type MarkdownEditor from '../components/Markdown/MarkdownEditor.vue';
import type Tabs from '../components/Tabs.vue';
import type UserMenu from '../components/UserMenu.vue';

declare global {
  type TabOption = {
    value: string;
    label: string;
    disabled?: boolean;
    icon?: string;
  };

  type MenuItem = {
    id: string;
    label?: string;
    icon?: string;
    iconPos?: 'start' | 'end';
    to?: RouteLocationRaw;
    path?: RouteLocationRaw;
    variant?: ButtonVariant;
    title?: string;
    href?: string;
    size?: string;
    permission?: string;
    feature?: string;
    tooltip?: string;
    tooltipIcon?: string;
    tooltipLabel?: string;
    disabled?: boolean;
    loading?: boolean;
    divider?: boolean;
    external?: boolean;
    download?: boolean;
    hideExternalIcon?: boolean;
    target?: string;
    onClick?: CallableFunction;
  };

  type DialogComponent = InstanceType<typeof Dialog>;
  type MobileMenuComponent = InstanceType<typeof MobileMenu>;
  type FormComponent = InstanceType<typeof Form>;
  type TextareaComponent = InstanceType<typeof Textarea>;
  type InputComponent = InstanceType<typeof Input>;
  type FileInputComponent = InstanceType<typeof FileInput>;
  type ButtonComponent = InstanceType<typeof Button>;
  type PopoverComponent = InstanceType<typeof Popover>;
  type MarkdownEditorComponent = InstanceType<typeof MarkdownEditor>;
  type TabsComponent = InstanceType<typeof Tabs>;
  type UserMenuComponent = InstanceType<typeof UserMenu>;

  type BaseColor =
    | 'default'
    | 'accent'
    | 'blue'
    | 'green'
    | 'red'
    | 'orange'
    | 'yellow';

  type BorderRadius = 'xs' | 'sm' | 'md' | 'lg' | 'full';

  type Size =
    | 'xxxs'
    | 'xxs'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | 'xxl'
    | 'xxxl'
    | 'xxxxl';

  type FontSize =
    | 'xxxs'
    | 'xxs'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | 'xxl'
    | 'xxxl'
    | 'xxxxl'
    | 'xxxxxl';

  type ButtonSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'ghost'
    | 'danger'
    | 'link'
    | 'purple'
    | 'green'
    | 'blue'
    | 'menu'
    | 'sidebar'
    | 'topbar';

  type TabsVariant = 'default' | 'minimal';
  type TabsSize = 'xs' | 'sm' | 'md';

  type TableSize = 'xs' | 'sm' | 'md' | 'lg';

  type ChipSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  type DialogPosition =
    | 'inline-start'
    | 'center'
    | 'inline-end'
    | 'block-start'
    | 'block-end';
  type MobileMenuPosition = 'inline-start' | 'inline-end';

  // External packages
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

  type VideoMetaData = {
    width?: number;
    height?: number;
    thumbnail_width?: number;
    thumbnail_height?: number;
    title?: string;
    thumbnail_url?: string;
  };
}
