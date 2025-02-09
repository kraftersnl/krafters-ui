const navList = [
  {
    id: 'changelog',
    to: '/',
    label: 'Changelog',
  },
  // {
  //   id: 'accessibility',
  //   to: '/accessibility',
  //   label: 'Accessibility',
  // },
  {
    id: 'colors',
    to: '/colors',
    label: 'Colors',
  },
  {
    id: 'alerts',
    to: '/alerts',
    label: 'Callout & Chip',
  },
  {
    id: 'accordion',
    to: '/accordion',
    label: 'Accordion',
  },
  {
    id: 'form',
    to: '/form',
    label: 'Form inputs',
  },
  {
    id: 'table',
    to: '/table',
    label: 'Table, Pagination & Filter',
  },
  {
    id: 'tooltip',
    to: '/tooltip',
    label: 'Tooltip, Popover & Dialog',
  },
  {
    id: 'tabs',
    to: '/tabs',
    label: 'Tabs navigation',
  },
  {
    id: 'md',
    to: '/markdown',
    label: 'Markdown Editor',
  },
  {
    id: 'skeleton',
    to: '/skeleton',
    label: 'Skeleton loading',
  },
];

export function useDemo() {
  return {
    navList,
  };
}
