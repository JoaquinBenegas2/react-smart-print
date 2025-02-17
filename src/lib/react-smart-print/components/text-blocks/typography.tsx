import { usePageStore } from "@/store/page-store";
import { calculateResponsiveFontSize } from "@/utils/calculate-responsive-font-size";
import { CSSProperties, useMemo } from "react";

type TypographyProps = {
  children: React.ReactNode;
  fontSize?: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
  highlight?: string;
  align?: "left" | "center" | "right" | "justify";
  marginTop?: number;
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
};

export function Typography({
  children,
  fontSize = 11,
  bold = false,
  italic = false,
  underline = false,
  color = "#000",
  highlight,
  align = "left",
  marginTop,
  marginBottom,
  marginRight,
  marginLeft,
}: TypographyProps) {
  const pageWidth = usePageStore((state) => state.pageWidth);

  const adjustedFontSize = useMemo(
    () => calculateResponsiveFontSize(fontSize, pageWidth),
    [fontSize, pageWidth]
  );

  const typographyStyles: CSSProperties = {
    fontSize: `${adjustedFontSize}px`,
    fontWeight: bold ? "bold" : "normal",
    fontStyle: italic ? "italic" : "normal",
    textDecoration: underline ? "underline" : "none",
    color,
    backgroundColor: highlight || "transparent",
    textAlign: align,
    margin: 0,
    marginTop: `${marginTop || 0}px`,
    marginBottom: `${marginBottom || 0}px`,
    marginRight: `${marginRight || 0}px`,
    marginLeft: `${marginLeft || 0}px`,
  };

  return (
    <p id="rsp-typography" className="rsp-add-p-spacing" style={typographyStyles}>
      {children}
    </p>
  );
}
