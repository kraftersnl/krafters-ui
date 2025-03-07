export function d(
  date: number | string | Date,
  format: string | Intl.DateTimeFormatOptions = 'long',
  locale = 'nl',
) {
  if (!date) return;

  return new Date(date).toLocaleDateString(
    locale,
    typeof format === 'string' ? formats[format] : format,
  );
}

const formats: { [key: string]: Intl.DateTimeFormatOptions } = {
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
  datetimeLong: {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  },
};
