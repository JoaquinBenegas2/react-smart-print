import PageRenderContent from "@/components/generation/page-render-content";
import { DEFAULT_MARGINS } from "@/models/paper/paper-margin";
import { PaperOptions } from "@/models/paper/paper-options";
import { PAPER_SIZES } from "@/models/paper/paper-size";
import { PageProvider } from "@/store/page-store";
import { GlobalStyleInjector } from "@/styles/GlobalStyleInjector";
import { useMemo } from "react";

interface PageRenderProps {
  children: React.ReactNode;
  paperOptions: PaperOptions;
  cover?: () => JSX.Element;
  header?: (pageIndex: number, totalPages: number) => JSX.Element;
  footer?: (pageIndex: number, totalPages: number) => JSX.Element;
  contentRef: React.RefObject<HTMLDivElement>;
  renderContent?: boolean;
  handleLoading: (state: boolean) => void;
  handleRenderContent: (state: boolean) => void;
}

export function PageRender({
  children,
  paperOptions,
  cover,
  header,
  footer,
  contentRef,
  renderContent = false,
  handleLoading,
  handleRenderContent,
}: PageRenderProps) {
  const { paperSize, margin = "normal", paragraphSpacing = 12 } = paperOptions;

  const memoizedPaperSize = useMemo(() => {
    if (typeof paperSize === "string") {
      return PAPER_SIZES[paperSize];
    }

    return paperSize;
  }, [paperSize]);

  const memoizedMargin = useMemo(() => {
    if (typeof margin === "string") {
      return DEFAULT_MARGINS[margin];
    }

    return margin;
  }, [margin]);

  return (
    <PageProvider
      paperOptions={{ paperSize: memoizedPaperSize, margin: memoizedMargin, paragraphSpacing }}
    >
      <GlobalStyleInjector />
      <PageRenderContent
        cover={cover}
        header={header}
        footer={footer}
        contentRef={contentRef}
        renderContent={renderContent}
        handleLoading={handleLoading}
        handleRenderContent={handleRenderContent}
      >
        {children}
      </PageRenderContent>
    </PageProvider>
  );
}
