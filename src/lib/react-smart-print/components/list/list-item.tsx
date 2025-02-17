import { usePageStore } from "@/store/page-store";
import { calculateResponsiveFontSize } from "@/utils/calculate-responsive-font-size";
import { CSSProperties, ReactNode, useLayoutEffect, useMemo, useRef, useState } from "react";

interface ListItemProps {
  children: ReactNode;
  marker?: string;
  markerStyle?: CSSProperties;
  fontSize?: number;
  align?: "left" | "center" | "right";
  color?: string;
  className?: string;
}

export function ListItem({
  children,
  marker,
  markerStyle,
  fontSize,
  align = "left",
  color = "#000",
  className,
}: ListItemProps) {
  const markerRef = useRef<HTMLSpanElement>(null);

  const [markerWidth, setMarkerWidth] = useState(32);

  const pageWidth = usePageStore((state) => state.pageWidth);
  const adjustedFontSize = useMemo(
    () => calculateResponsiveFontSize(fontSize ?? 11, pageWidth),
    [fontSize, pageWidth]
  );

  const itemStyles: CSSProperties = {
    width: "100%",
    fontSize: `${adjustedFontSize}px`,
    color,
    display: "flex",
    justifyContent: align,
  };

  useLayoutEffect(() => {
    if (markerRef.current) {
      const markerElement = markerRef.current;
      const baseWidth = 32;
      let newWidth = baseWidth;

      while (markerElement.scrollWidth > markerElement.offsetWidth) {
        newWidth += 16;
        markerElement.style.width = `${newWidth}px`;
      }

      setMarkerWidth(newWidth);
    }
  }, [marker, adjustedFontSize, children]);

  return (
    <li id="rsp-list-item" style={itemStyles} className={className}>
      {marker && (
        <span
          ref={markerRef}
          style={{
            display: "inline-block",
            width: `${markerWidth}px`,
            minWidth: `${markerWidth}px`,
            whiteSpace: "nowrap",
            textWrap: "nowrap",
            overflow: "hidden",
            ...markerStyle,
          }}
        >
          {marker}
        </span>
      )}
      <span>{children}</span>
    </li>
  );
}
