export function fixBoldText(text?: string) {
  return text?.replaceAll('<strong>', '<b>')?.replaceAll('</strong>', '</b>');
}

export function fixItalicText(text?: string) {
  return text?.replaceAll('<em>', '<i>')?.replaceAll('</em>', '</i>');
}

export function fixBoldAndItalicText(text?: string) {
  const fixedBoldText = fixBoldText(text);
  return fixItalicText(fixedBoldText);
}

export async function copyText(text?: string) {
  if (!text) return;
  return await navigator?.clipboard?.writeText(text);
}

export function isValidUrl(url?: string): boolean {
  try {
    return !!url && Boolean(new URL(url));
  } catch (error) {
    console.info(error);
    return false;
  }
}

export function removeHttp(url?: string) {
  return url?.replace(/^https?:\/\//, '')?.replace(/www./, '');
}

export function trimUrl(url: string) {
  return url.replace(/[.,]+$/, '')?.replace(/\/$/, '');
}

export function stripUrl(url?: string) {
  return url
    ?.replace(/^https?:\/\//, '')
    ?.replace(/www./, '')
    ?.replace(/[.,]+$/, '')
    ?.replace(/\/$/, '');
}

export function stripTrailingSlash(str?: string) {
  if (!str) return '';
  if (str === '/') return '/';
  return str.endsWith('/') ? str.slice(0, -1) : str;
}

export function addTrailingSlash(str?: string) {
  if (!str) return;
  if (str === '/') return '/';
  return str.endsWith('/') ? str : str + '/';
}

export function getRandomInt(max = 1) {
  return Math.ceil(Math.random() * max);
}

export const xsTransition = 100;
export const smTransition = 200;
export const mdTransition = 350;
export const lgTransition = 650;
export const xlTransition = 1350;
export const xxlTransition = 2000;
