import React, { useRef, useState, useEffect, ReactNode } from "react";

type ScalableContainerProps = {
  children: ReactNode;

  /**
   * The original (fixed) width of the content in pixels.
   * For example, an A4 document would be 2480px.
   */
  contentWidth: number;

  /**
   * Defines how the scaling should behave:
   * - "width": scales based on container's width (default).
   * - "full": scales based on both width and height, preserving aspect ratio.
   */
  scaleMode?: "width" | "full";

  /**
   * Optional class name to apply to the outer container.
   */
  className?: string;

  /**
   * Optional inline styles to apply to the outer container.
   */
  style?: React.CSSProperties;
};

/**
 * Visually scales any fixed-size content to fit inside a responsive container.
 * Ideal for previewing documents such as PDFs with consistent layout.
 *
 * The component does not alter the actual layout or flow of the content —
 * it uses CSS `transform: scale(...)` to visually shrink or enlarge it.
 */
export const ScalableContainer: React.FC<ScalableContainerProps> = ({
  children,
  contentWidth,
  scaleMode = "width",
  className,
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const computeScale = () => {
      const container = containerRef.current;
      const content = contentRef.current;

      if (!container || !content) return;

      // Calculate horizontal scale based on container width
      const scaleX = container.offsetWidth / contentWidth;
      let newScale = scaleX;

      // Optionally scale by height as well
      if (scaleMode === "full") {
        const contentHeight = content.scrollHeight;
        const scaleY = container.offsetHeight / contentHeight;
        newScale = Math.min(scaleX, scaleY);
      }

      setScale(newScale);
    };

    computeScale();
    window.addEventListener("resize", computeScale);

    // Clean up listener on unmount
    return () => window.removeEventListener("resize", computeScale);
  }, [contentWidth, scaleMode]);

  return (
    <div style={style} ref={containerRef} className={className}>
      <div
        ref={contentRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${contentWidth}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
