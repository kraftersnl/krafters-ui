export function useToast() {
  const toasts = useState<Toast[]>('toasts', () => []);

  function createToast(toast: Toast) {
    toasts.value.push(toast);
  }

  function hideToast(id?: string) {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  }

  return { toasts, createToast, hideToast };
}
