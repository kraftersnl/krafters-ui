export function formatFileSize(size: number) {
  if (size < 1000000) return Math.floor(size / 1024) + ' KB';
  else return Math.floor(size / 1024 / 1024) + ' MB';
}
