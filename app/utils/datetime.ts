export function datetime(
  date: number | string | Date,
  locale = 'en',
  format: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  },
) {
  if (!date) return;

  return new Date(date).toLocaleDateString(locale, format);
}
