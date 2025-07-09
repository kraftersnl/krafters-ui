export function formatFileSize(size: number) {
  if (size < 1000000) return Math.floor(size / 1024) + ' KB';
  else return Math.floor(size / 1024 / 1024) + ' MB';
}

export function getFileExtension(filename?: string) {
  return filename?.split('.')?.pop();
}

export function downloadFile({ url, name }: { url: string; name: string }) {
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function downloadCSV({ data, name }: { data: any[]; name: string }) {
  let csvContent = 'data:text/csv;charset=utf-8,';

  if (!data?.length) return;

  csvContent += [
    Object.keys(data[0]).join(';'),
    ...data.map((item) => Object.values(item).join(';')),
  ]
    .join('\n')
    .replace(/(^\[)|(\]$)/gm, '');

  const csvData = encodeURI(csvContent);
  downloadFile({ url: csvData, name });
}

export function fileTypeIcon(file?: File) {
  if (!file) return 'material-symbols:note-stack-add-outline-rounded';
  if (getFileExtension(file?.name) === 'vue')
    return 'vscode-icons:file-type-vue';
  if (getFileExtension(file?.name) === 'md')
    return 'vscode-icons:file-type-markdown';
  if (getFileExtension(file?.name) === 'ts')
    return 'vscode-icons:file-type-typescript';
  if (file?.type.includes('javascript')) return 'vscode-icons:file-type-js';
  if (file?.type.includes('css')) return 'vscode-icons:file-type-css';
  if (file?.type.includes('html')) return 'vscode-icons:file-type-html';
  if (file?.type.includes('php')) return 'vscode-icons:file-type-php';
  if (file?.type.includes('json')) return 'vscode-icons:file-type-json';
  if (file?.type.includes('pdf')) return 'vscode-icons:file-type-pdf2';
  if (file?.type.includes('text/plain')) return 'vscode-icons:file-type-text';
  if (file?.type.includes('word') || file?.type.includes('opendocument.text'))
    return 'vscode-icons:file-type-word';
  if (file?.type.includes('excel') || file?.type.includes('spreadsheet'))
    return 'vscode-icons:file-type-excel';
  if (file?.type.includes('powerpoint') || file?.type.includes('presentation'))
    return 'vscode-icons:file-type-powerpoint';
  if (file?.type.includes('illustrator')) return 'vscode-icons:file-type-ai';
  if (file?.type.includes('photoshop'))
    return 'vscode-icons:file-type-photoshop';
  if (file?.type.includes('video')) return 'vscode-icons:file-type-video';
  if (file?.type.includes('image')) return 'vscode-icons:file-type-image';
  return 'material-symbols:unknown-document-outline-rounded';
}
