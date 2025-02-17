export type PaperMargin = "normal" | "narrow" | "wide";

export type PaperMarginObject = {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export const DEFAULT_MARGINS = {
  normal: { top: 125, bottom: 125, left: 150, right: 150 }, // 2.5 cm top/bottom, 3 cm left/right
  narrow: { top: 62.5, bottom: 62.5, left: 62.5, right: 62.5 }, // Reduced margins 1.25 cm 
  wide: { top: 125, bottom: 125, left: 250, right: 250 }, // Margins wide (5 cm)
};
