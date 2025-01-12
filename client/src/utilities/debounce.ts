/* eslint-disable @typescript-eslint/no-explicit-any */
type DebouncedFunction<T extends (...args: any[]) => void> = (...args: Parameters<T>) => void;

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  timeout: number
): DebouncedFunction<T> {
  let timer: NodeJS.Timeout | null;

  return function (this: any, ...args: Parameters<T>): void {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}