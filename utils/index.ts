export const kebabToSpace = (c?: string) => (
  (c = c ? c.replaceAll('-', ' ') : c), c?.toLowerCase()
);
