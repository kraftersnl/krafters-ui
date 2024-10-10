import type { DefineDateTimeFormat } from 'vue-i18n';
import nl from '~/locales/nl.json';
import en from '~/locales/en.json';

export default defineI18nConfig(() => ({
  locale: navigator?.language,
  messages: {
    nl: nl,
    en: en,
    'en-GB': en,
    'en-US': en,
  },
  datetimeFormats: {
    nl: datetimeFormats(),
    en: datetimeFormats(),
    'en-GB': datetimeFormats(),
    'en-US': datetimeFormats(),
  },
}));

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
  time: {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  },
});
