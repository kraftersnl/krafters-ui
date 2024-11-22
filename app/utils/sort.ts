export function sort(arr: any, prop: string) {
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
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  });
  return arr;
}
