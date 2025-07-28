import React, { useEffect, useRef, useState } from "react";

interface DocumentPreviewProps {
  /**
   * Reference to the original DOM element that should be cloned.
   * Typically the rendered, paginated document output.
   */
  previewRef: React.RefObject<HTMLDivElement>;

  /**
   * Whether the preview should be rendered.
   * If false, the component will render nothing and skip observer setup.
   */
  renderContent?: boolean;

  /**
   * Optional inline styles for the wrapper container of the cloned preview.
   */
  style?: React.CSSProperties;
}

/**
 * Clones a rendered document (via `previewRef`) and mounts it in a separate container
 * to be used for visual previewing (e.g. inside a ScalableContainer).
 *
 * This ensures no extra re-rendering, and keeps the visual preview in sync using a MutationObserver.
 */
export function DocumentPreview({ previewRef, renderContent, style }: DocumentPreviewProps) {
  const observerRef = useRef<MutationObserver | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [clonedNode, setClonedNode] = useState<HTMLElement | null>(null);

  /**
   * Clones the referenced DOM node and prepares it for preview rendering.
   * Applies base styles to prevent interaction or layout breakage.
   */
  const clonePreview = () => {
    if (!previewRef.current) return;

    const clone = previewRef.current.cloneNode(true) as HTMLElement;

    // Ensure preview behaves as a static visual copy
    Object.assign(clone.style, {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      pointerEvents: "none",
      userSelect: "none",
      position: "static",
      left: "0",
    });

    setClonedNode(clone);
  };

  /**
   * Waits for `previewRef.current` to become available and sets up the MutationObserver.
   * Skips setup if `renderContent` is false.
   */
  useEffect(() => {
    if (!renderContent) return;

    const interval = setInterval(() => {
      if (previewRef.current) {
        clonePreview();

        observerRef.current = new MutationObserver(() => {
          clonePreview();
        });

        observerRef.current.observe(previewRef.current, {
          childList: true,
          subtree: true,
          attributes: true,
          characterData: true,
        });

        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
      observerRef.current?.disconnect();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewRef, renderContent]);

  /**
   * Mounts the cloned node into the container whenever it changes.
   */
  useEffect(() => {
    if (!renderContent) return;

    if (containerRef.current && clonedNode) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(clonedNode);
    }
  }, [clonedNode, renderContent]);

  if (!renderContent) return null;

  return <div id="rsp-document-preview" ref={containerRef} style={style} />;
}
