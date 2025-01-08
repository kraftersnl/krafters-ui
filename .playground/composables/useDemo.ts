const navList = [
  {
    id: 'home',
    to: '/',
    label: 'Home',
  },
  {
    id: 'accordion',
    to: '/accordion',
    label: 'Accordion',
  },
  {
    id: 'alerts',
    to: '/alerts',
    label: 'Alerts',
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
];

export function useDemo() {
  return {
    navList,
  };
}
