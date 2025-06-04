export function getStatusFromError(error: unknown): number | undefined {
  if (typeof error === 'object' && error !== null) {
    const anyError = error as any;
    if (typeof anyError.status === 'number') {
      return anyError.status;
    }
    if (anyError.response && typeof anyError.response.status === 'number') {
      return anyError.response.status;
    }
  }
  return undefined;
}
