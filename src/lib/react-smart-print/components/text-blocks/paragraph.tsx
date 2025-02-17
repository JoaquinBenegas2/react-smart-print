import { usePageStore } from "@/store/page-store";
import { calculateResponsiveFontSize } from "@/utils/calculate-responsive-font-size";
import { extractLinesFromContainer } from "@/utils/extract-lines-from-container";
import React, { CSSProperties, useEffect, useMemo, useRef, useState } from "react";

interface ParagraphProps {
  children: React.ReactNode;
  fontSize?: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
  highlight?: string;
  lineSpacing?: number;
  align?: "left" | "center" | "right" | "justify";
  marginTop?: number;
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
}

export function Paragraph({
  children,
  fontSize = 11,
  bold = false,
  italic = false,
  underline = false,
  color = "#000",
  highlight,
  align = "left",
  lineSpacing = 1,
  marginTop: paragraphMarginTop,
  marginBottom: paragraphMarginBottom,
  marginRight: paragraphMarginRight,
  marginLeft: paragraphMarginLeft,
}: ParagraphProps) {
  const pageWidth = usePageStore((state) => state.pageWidth);
  const marginRight = usePageStore((state) => state.marginRight);
  const marginLeft = usePageStore((state) => state.marginLeft);
  const pageContentWidth = pageWidth - marginRight - marginLeft;

  const adjustedFontSize = useMemo(
    () => calculateResponsiveFontSize(fontSize, pageWidth),
    [fontSize, pageWidth]
  );

  const paragraphStyles: CSSProperties = useMemo(
    () => ({
      fontSize: `${adjustedFontSize}px`,
      fontWeight: bold ? "bold" : "normal",
      fontStyle: italic ? "italic" : "normal",
      textDecoration: underline ? "underline" : "none",
      color,
      backgroundColor: highlight || "transparent",
      overflow: "hidden",
      wordWrap: "break-word",
      width: `${pageContentWidth}px`,
      paddingBottom: `${lineSpacing}px`,
      textAlign: align,
      textAlignLast: align,
      margin: 0,
      marginRight: `${paragraphMarginRight || 0}px`,
      marginLeft: `${paragraphMarginLeft || 0}px`,
    }),
    [
      adjustedFontSize,
      bold,
      italic,
      underline,
      color,
      highlight,
      pageContentWidth,
      lineSpacing,
      align,
      paragraphMarginRight,
      paragraphMarginLeft,
    ]
  );

  const hiddenContainerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    if (!hiddenContainerRef.current) return;

    const groupedLines = extractLinesFromContainer(hiddenContainerRef.current);
    setLines(groupedLines.map((line) => line.text));
  }, [children, pageContentWidth, adjustedFontSize]);

  return (
    <>
      {/* This container is used only for measurement and is hidden */}
      <div
        id="rsp-ignore-element"
        ref={hiddenContainerRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          left: -9999,
          width: `${pageContentWidth}px`,
        }}
      >
        <div style={paragraphStyles}>{children}</div>
      </div>

      {/* Margin top */}
      {paragraphMarginTop && <div style={{ height: paragraphMarginTop }}></div>}

      {/* Render the content “partitioned” into lines */}
      {lines.map((line, idx) => (
        <p
          id="rsp-paragraph-line"
          key={idx}
          className={idx === lines.length - 1 ? "rsp-add-p-spacing" : ""}
          style={{
            ...paragraphStyles,
            textAlignLast: idx === lines.length - 1 ? undefined : align,
          }}
        >
          {line}
        </p>
      ))}

      {/* Margin bottom */}
      {paragraphMarginBottom && <div style={{ height: paragraphMarginBottom }}></div>}
    </>
  );
}
