/**
 * Creates a debounced function that delays invoking the provided function
 * until after the specified delay has elapsed since the last invocation.
 *
 * @param fn - The function to debounce
 * @param delayMs - The delay in milliseconds
 * @returns A debounced version of the function
 */
export const createDebounce = <T extends (...args: unknown[]) => void>(
  fn: T,
  delayMs: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }
    timeoutId = window.setTimeout(() => {
      fn(...args);
    }, delayMs);
  };
};
