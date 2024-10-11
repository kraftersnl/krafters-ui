import type Dialog from '../components/Dialog.vue';
import type Textarea from '../components/Textarea.vue';

declare global {
  type ChipColor =
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
    divider?: boolean;
    onClick?: () => void;
  };

  type DialogComponent = InstanceType<typeof Dialog>;
  type TextareaComponent = InstanceType<typeof Textarea>;
}
