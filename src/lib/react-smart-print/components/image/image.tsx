import { CSSProperties, useMemo } from "react";
import { usePageStore } from "../../store/page-store";

export type ImageFit = "contain" | "cover" | "fill" | "none" | "scale-down";
export type ImageRepeat = "no-repeat" | "repeat" | "repeat-x" | "repeat-y";
export type ImageAlign = "left" | "center" | "right";

interface ImageProps {
  src: string;
  alt?: string;

  width?: number | string;
  height?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;

  fit?: ImageFit;
  repeat?: ImageRepeat;

  align?: ImageAlign;

  marginTop?: number;
  marginBottom?: number;

  borderRadius?: number;
  opacity?: number;

  style?: CSSProperties;
  className?: string;

  loading?: "eager" | "lazy";
  crossOrigin?: "anonymous" | "use-credentials";

  onLoad?: () => void;
  onError?: () => void;
}

const toCssSize = (value?: number | string) => {
  if (value === undefined || value === null) return undefined;
  return typeof value === "number" ? `${value}px` : value;
};

const topMarginBlock = (marginTop: number) => (
  <div
    id="rsp-ignore-element"
    style={{
      height: `${marginTop}px`,
      lineHeight: 0,
      margin: 0,
      padding: 0,
      border: 0,
    }}
  />
);

const bottomMarginBlock = (marginBottom: number) => (
  <div
    id="rsp-ignore-element"
    style={{
      height: `${marginBottom}px`,
      lineHeight: 0,
      margin: 0,
      padding: 0,
      border: 0,
    }}
  />
);

export function Image({
  src,
  alt = "",
  width = "100%",
  height,
  maxWidth,
  maxHeight,
  fit = "contain",
  repeat = "no-repeat",
  align = "left",
  marginTop = 0,
  marginBottom = 0,
  borderRadius = 0,
  opacity = 1,
  style,
  className,
  loading = "eager",
  crossOrigin,
  onLoad,
  onError,
}: ImageProps) {
  const pageWidth = usePageStore((state) => state.pageWidth);
  const marginLeft = usePageStore((state) => state.marginLeft);
  const marginRight = usePageStore((state) => state.marginRight);

  const maxAllowedWidth = useMemo(() => {
    const w = pageWidth - marginLeft - marginRight;
    return w > 0 ? w : pageWidth;
  }, [pageWidth, marginLeft, marginRight]);

  const alignStyles = useMemo((): CSSProperties => {
    if (align === "center") return { display: "block", marginLeft: "auto", marginRight: "auto" };
    if (align === "right") return { display: "block", marginLeft: "auto", marginRight: 0 };
    return { display: "block", marginLeft: 0, marginRight: "auto" };
  }, [align]);

  const computedStyle = useMemo((): CSSProperties => {
    const w = toCssSize(width);
    const h = toCssSize(height);

    const base: CSSProperties = {
      ...alignStyles,
      width: w,
      height: h,
      maxWidth: toCssSize(maxWidth) ?? `${maxAllowedWidth}px`,
      maxHeight: toCssSize(maxHeight),
      borderRadius: `${borderRadius}px`,
      opacity,
      objectFit: fit,
      objectPosition: "center",
    };

    const useBg = repeat !== "no-repeat";
    if (useBg) {
      return {
        ...base,
        width: w ?? `${maxAllowedWidth}px`,
        height: h ?? "200px",
        backgroundImage: `url("${src}")`,
        backgroundRepeat: repeat,
        backgroundSize: fit === "cover" ? "cover" : fit === "contain" ? "contain" : "auto",
        backgroundPosition: "center",
      };
    }

    return { ...base, ...style };
  }, [
    alignStyles,
    width,
    height,
    maxWidth,
    maxHeight,
    maxAllowedWidth,
    borderRadius,
    opacity,
    fit,
    repeat,
    src,
    style,
  ]);

  const shouldUseBackground = repeat !== "no-repeat";

  return (
    <>
      {marginTop > 0 && topMarginBlock(marginTop)}

      {shouldUseBackground ? (
        <div id="rsp-image" className={className} style={computedStyle} />
      ) : (
        <img
          id="rsp-image"
          className={className}
          src={src}
          alt={alt}
          loading={loading}
          crossOrigin={crossOrigin}
          style={computedStyle}
          onLoad={onLoad}
          onError={onError}
        />
      )}

      {marginBottom > 0 && bottomMarginBlock(marginBottom)}
    </>
  );
}
