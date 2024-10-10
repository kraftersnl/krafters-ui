export const kebabToSpace = (c: string) => (
  (c = c.replaceAll('-', ' ')), c.toLowerCase()
);
