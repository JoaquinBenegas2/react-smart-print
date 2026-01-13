/**
 * Waits for all images in a container to load before proceeding.
 * Uses img.decode() when available (preferred), otherwise falls back to load/error events.
 * Includes timeout to prevent hanging on broken images.
 *
 * @param container - The container element containing images to wait for
 * @param timeoutMs - Maximum time to wait for each image (default: 4000ms)
 * @returns Promise that resolves when all images are loaded or timeout occurs
 */
export const waitForImages = async (container: HTMLElement, timeoutMs = 4000): Promise<void> => {
  const images = Array.from(container.querySelectorAll("img")) as HTMLImageElement[];
  if (images.length === 0) return;

  const withTimeout = <T>(promise: Promise<T>, timeout: number): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      const id = window.setTimeout(() => reject(new Error("timeout")), timeout);
      promise
        .then((v) => {
          window.clearTimeout(id);
          resolve(v);
        })
        .catch((e) => {
          window.clearTimeout(id);
          reject(e);
        });
    });
  };

  const tasks = images.map(async (img) => {
    // Already loaded (includes cache)
    if (img.complete && img.naturalWidth > 0) return;

    const canDecode = typeof img.decode === "function";

    const wait = canDecode
      ? img.decode().catch(() => undefined)
      : new Promise<void>((resolve) => {
          const onDone = () => resolve();
          img.addEventListener("load", onDone, { once: true });
          img.addEventListener("error", onDone, { once: true });
        });

    try {
      await withTimeout(Promise.resolve(wait), timeoutMs);
    } catch {
      // If timeout or fails, continue anyway
    }
  });

  await Promise.all(tasks);
};
