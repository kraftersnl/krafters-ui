const navList = [
  {
    id: 'changelog',
    to: '/',
    label: 'Changelog',
    divider: true,
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
    id: 'buttons',
    to: '/buttons',
    label: 'Buttons',
  },
  {
    id: 'alerts',
    to: '/alerts',
    label: 'Chips & Callouts',
  },
  {
    id: 'ellipsis',
    to: '/ellipsis',
    label: 'Ellipsis',
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
    id: 'md',
    to: '/markdown',
    label: 'Markdown Editor',
  },
  {
    id: 'progress',
    to: '/progress',
    label: 'Progress Circle & Meter',
  },
  {
    id: 'tabs',
    to: '/tabs',
    label: 'Tabs navigation',
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
    id: 'skeleton',
    to: '/skeleton',
    label: 'Skeleton screens',
  },
];

export function useDemo() {
  return {
    navList,
  };
}
