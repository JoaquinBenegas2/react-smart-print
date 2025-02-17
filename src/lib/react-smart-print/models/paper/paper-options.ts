import { PaperMargin, PaperMarginObject } from "@/models/paper/paper-margin";
import { PaperOrientation } from "@/models/paper/paper-orientation";
import { PaperSize, PaperSizeObject } from "@/models/paper/paper-size";

export interface PaperOptions {
  paperSize: PaperSizeObject | PaperSize;
  margin?: PaperMarginObject | PaperMargin;
  orientation?: PaperOrientation;
  paragraphSpacing?: number;
}
