export function sort(arr: any, prop: string, order = 'asc') {
  const key = prop.split('.');
  const len = key.length;

  arr?.sort(function (a: any, b: any) {
    let i = 0;
    while (i < len) {
      a = a[key[i]];
      b = b[key[i]];
      i++;
    }
    if (a < b) {
      return order === 'asc' ? -1 : 1;
    } else if (a > b) {
      return order === 'asc' ? 1 : -1;
    } else {
      return 0;
    }
  });
  return arr;
}
