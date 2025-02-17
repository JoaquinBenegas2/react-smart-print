export type PaperSize = "a4" | "letter" | "legal";

export type PaperSizeObject = {
  width: number;
  height: number;
};

export const PAPER_SIZES: Record<PaperSize, PaperSizeObject> = {
  a4: {
    width: 1050,
    height: 1485,
  },
  letter: {
    width: 425,
    height: 550,
  },
  legal: {
    width: 425,
    height: 70,
  },
};
