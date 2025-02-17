import React, { cloneElement, CSSProperties, ReactElement, ReactNode, useMemo } from "react";
import { usePageStore } from "../../store/page-store";
import { calculateResponsiveFontSize } from "../../utils/calculate-responsive-font-size";
import { ListItem } from "./list-item";

export type OrderedType = "num" | "alpha";

interface ListProps {
  children: ReactNode;
  ordered?: boolean;
  orderedType?: OrderedType;
  orderedFormat?: (computedMarker: string) => string;
  marker?: string;
  markerStyle?: CSSProperties;
  fontSize?: number;
  align?: "left" | "center" | "right";
  marginTop?: number;
  marginBottom?: number;
  color?: string;
}

// Función para calcular el marcador base según el índice y el tipo
function getDefaultMarker(index: number, type: OrderedType): string {
  if (type === "alpha") {
    return String.fromCharCode(65 + index);
  }

  return (index + 1).toString();
}

const topMarginItem = (marginTop: number) => (
  <li
    style={{
      height: `${marginTop}px`,
      lineHeight: 0,
      margin: 0,
      padding: 0,
      border: 0,
      listStyleType: "none",
    }}
  />
);
const bottomMarginItem = (marginBottom: number) => (
  <li
    style={{
      height: `${marginBottom}px`,
      lineHeight: 0,
      margin: 0,
      padding: 0,
      border: 0,
      listStyleType: "none",
    }}
  />
);

export function List({
  children,
  ordered = false,
  orderedType = "num",
  orderedFormat,
  marker = "•",
  markerStyle,
  fontSize = 11,
  align = "left",
  marginTop = 0,
  marginBottom = 0,
  color = "#000",
}: ListProps) {
  const pageWidth = usePageStore((state) => state.pageWidth);
  const adjustedFontSize = useMemo(
    () => calculateResponsiveFontSize(fontSize, pageWidth),
    [fontSize, pageWidth]
  );

  const defaultOrderedFormat = (computedMarker: string) => {
    return `${computedMarker}.`;
  };

  const formatFn = orderedFormat || defaultOrderedFormat;

  let enhancedChildren: ReactNode = children;

  if (ordered) {
    const childrenArray = React.Children.toArray(children);

    enhancedChildren = childrenArray.map((child, index) => {
      if (React.isValidElement(child) && child.type === ListItem) {
        const computedMarker = getDefaultMarker(index, orderedType);
        const finalMarker = child.props.marker ?? formatFn(computedMarker);

        const isLast = index === childrenArray.length - 1;

        const existingClass = child.props.className || "";
        const extraClass = isLast ? " rsp-add-p-spacing" : "";

        return cloneElement(child as ReactElement, {
          fontSize: child.props.fontSize ?? adjustedFontSize,
          align: child.props.align ?? align,
          color: child.props.color ?? color,
          marker: finalMarker,
          markerStyle: child.props.markerStyle ?? markerStyle,
          className: (existingClass + extraClass).trim(),
        });
      }

      return child;
    });
  } else if (!ordered && marker) {
    const childrenArray = React.Children.toArray(children);

    enhancedChildren = childrenArray.map((child, index) => {
      if (React.isValidElement(child) && child.type === ListItem) {
        const isLast = index === childrenArray.length - 1;

        const existingClass = child.props.className || "";
        const extraClass = isLast ? " rsp-add-p-spacing" : "";

        return cloneElement(child as ReactElement, {
          fontSize: child.props.fontSize ?? adjustedFontSize,
          align: child.props.align ?? align,
          color: child.props.color ?? color,
          marker: child.props.marker ?? marker,
          markerStyle: child.props.markerStyle ?? markerStyle,
          className: (existingClass + extraClass).trim(),
        });
      }

      return child;
    });
  }

  return (
    <>
      {/* Margin Top */}
      {marginTop > 0 && topMarginItem(marginTop)}

      {/* List */}
      {ordered && !orderedFormat ? (
        <ol id="rsp-list">{enhancedChildren}</ol>
      ) : (
        <ul id="rsp-list">{enhancedChildren}</ul>
      )}

      {/* Margin Bottom */}
      {marginBottom > 0 && bottomMarginItem(marginBottom)}
    </>
  );
}
