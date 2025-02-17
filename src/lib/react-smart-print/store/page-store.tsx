import { PaperMarginObject } from "@/models/paper/paper-margin";
import { PaperSizeObject } from "@/models/paper/paper-size";
import { createContext, ReactNode, useContext, useState } from "react";

export interface PageState {
  pageWidth: number;
  pageHeight: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  paragraphSpacing: number;
  setPageDimensions: (dims: { width: number; height: number }) => void;
  setMargins: (margins: { top: number; bottom: number; left: number; right: number }) => void;
}

interface PaperOptions {
  paperSize: PaperSizeObject;
  margin?: PaperMarginObject;
  paragraphSpacing?: number;
}

interface PageProviderProps {
  children: ReactNode;
  paperOptions: Required<PaperOptions>;
}

const PageContext = createContext<PageState | undefined>(undefined);

export const PageProvider = ({ children, paperOptions }: PageProviderProps) => {
  const { paperSize, margin, paragraphSpacing } = paperOptions;

  const [pageDimensions, setPageDimensionsState] = useState({
    pageWidth: paperSize.width,
    pageHeight: paperSize.height,
  });

  const [margins, setMarginsState] = useState({
    marginTop: margin.top,
    marginBottom: margin.bottom,
    marginLeft: margin.left,
    marginRight: margin.right,
  });

  const setPageDimensions = ({ width, height }: PaperSizeObject) => {
    setPageDimensionsState({ pageWidth: width, pageHeight: height });
  };

  const setMargins = ({ top, bottom, left, right }: PaperMarginObject) => {
    setMarginsState({
      marginTop: top,
      marginBottom: bottom,
      marginLeft: left,
      marginRight: right,
    });
  };

  const state: PageState = {
    ...pageDimensions,
    ...margins,
    paragraphSpacing,
    setPageDimensions,
    setMargins,
  };

  return <PageContext.Provider value={state}>{children}</PageContext.Provider>;
};

export const usePageStore = <T,>(selector: (state: PageState) => T): T => {
  const context = useContext(PageContext);

  if (!context) {
    throw new Error("usePageStore must be used within a PageProvider");
  }

  return selector(context);
};
