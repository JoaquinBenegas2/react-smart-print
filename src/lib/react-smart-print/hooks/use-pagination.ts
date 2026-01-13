import { PageElement } from "@/models/page-content/page";
import { usePageStore } from "@/store/page-store";
import { createDebounce } from "@/utils/create-debounce";
import { paginateContent } from "@/utils/paginate-content";
import { waitForImages } from "@/utils/wait-for-images";
import { isEqual } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";

interface UsePaginationProps {
  containerRef: React.RefObject<HTMLDivElement>;
  enabled: boolean;
  onLoadingChange: (loading: boolean) => void;
  onRenderContentChange: (rendered: boolean) => void;
}

interface UsePaginationReturn {
  pages: PageElement[][];
  hasMounted: boolean;
}

/**
 * Hook that handles content pagination logic including:
 * - Waiting for images and fonts to load
 * - Measuring and paginating content
 * - Handling resize events
 * - Preventing race conditions
 */
export const usePagination = ({
  containerRef,
  enabled,
  onLoadingChange,
  onRenderContentChange,
}: UsePaginationProps): UsePaginationReturn => {
  const [pages, setPages] = useState<PageElement[][]>([]);
  const [hasMounted, setHasMounted] = useState(false);

  // Page dimensions from store
  const pageWidth = usePageStore((state) => state.pageWidth);
  const pageHeight = usePageStore((state) => state.pageHeight);
  const marginTop = usePageStore((state) => state.marginTop);
  const marginBottom = usePageStore((state) => state.marginBottom);
  const marginLeft = usePageStore((state) => state.marginLeft);
  const marginRight = usePageStore((state) => state.marginRight);
  const paragraphSpacing = usePageStore((state) => state.paragraphSpacing);

  const pageContentWidth = pageWidth - marginLeft - marginRight;
  const pageContentHeight = pageHeight - marginTop - marginBottom;

  // Guards to prevent race conditions
  const paginateRunIdRef = useRef(0);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  /**
   * Core pagination logic:
   * 1. Wait for images to load
   * 2. Wait for fonts to be ready
   * 3. Measure and paginate content
   */
  const paginateNow = useCallback(async () => {
    const container = containerRef.current;
    if (!container) return;

    const runId = ++paginateRunIdRef.current;

    // Wait for images
    await waitForImages(container, 4000);

    // Wait for fonts
    try {
      await document.fonts?.ready;
    } catch {
      // Ignore font loading errors
    }

    // Check if this run is still valid
    if (runId !== paginateRunIdRef.current) return;
    if (!isMountedRef.current) return;

    // Paginate content
    const elements = Array.from(container.children) as HTMLElement[];
    const newPages = paginateContent(elements, pageContentHeight, paragraphSpacing);

    // Update pages only if changed
    setPages((prev) => (isEqual(prev, newPages) ? prev : newPages));

    // Notify completion
    onLoadingChange(false);
    onRenderContentChange(true);
  }, [containerRef, pageContentHeight, paragraphSpacing, onLoadingChange, onRenderContentChange]);

  // Track mounting state
  useEffect(() => {
    if (enabled && containerRef.current) {
      setHasMounted(true);
    } else {
      setHasMounted(false);
      setPages([]);
    }
  }, [enabled, containerRef]);

  // Initial pagination when enabled or dependencies change
  useEffect(() => {
    if (!enabled) return;
    if (!containerRef.current) return;

    onLoadingChange(true);
    onRenderContentChange(false);

    void paginateNow();
  }, [
    enabled,
    pageContentHeight,
    paragraphSpacing,
    pageContentWidth,
    marginLeft,
    marginRight,
    onLoadingChange,
    onRenderContentChange,
    paginateNow,
    containerRef,
  ]);

  // ResizeObserver: re-paginate on layout changes
  useEffect(() => {
    if (!enabled) return;
    const container = containerRef.current;
    if (!container) return;

    const debouncedPaginate = createDebounce(() => {
      void paginateNow();
    }, 120);

    const resizeObserver = new ResizeObserver(() => {
      debouncedPaginate();
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [enabled, paginateNow, containerRef]);

  return { pages, hasMounted };
};
