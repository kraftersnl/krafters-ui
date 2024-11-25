export const kebabToSpace = (c?: string) => (
  (c = c ? c.replaceAll('-', ' ') : c), c?.toLowerCase()
);

export function pascalToSpace(word?: string) {
  const wordRe = /($[a-z])|[A-Z][^A-Z]+/g;
  return word?.match(wordRe)?.join(' ');
}

export async function copyText(text?: string) {
  if (!text) return;
  return await navigator?.clipboard?.writeText(text);
}

export function isValidUrl(url?: string): boolean {
  try {
    return !!url && Boolean(new URL(url));
  } catch (error) {
    console.log(error);
    return false;
  }
}
