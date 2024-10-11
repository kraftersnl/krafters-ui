import type { DefineDateTimeFormat } from 'vue-i18n';

const datetimeFormats = (): DefineDateTimeFormat => ({
  long: {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  },
  short: {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  },
  numeric: {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  },
  datetime: {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  },
});

export default defineI18nConfig(() => ({
  datetimeFormats: {
    nl: datetimeFormats(),
    en: datetimeFormats(),
  },
}));
