import { PagePreview } from "@/components/generation/page-preview";
import { usePagination } from "@/hooks/use-pagination";
import { usePageStore } from "@/store/page-store";
import { useRef } from "react";

export interface PageRenderContentProps {
  children: React.ReactNode;
  cover?: () => JSX.Element;
  header?: (pageIndex: number, totalPages: number) => JSX.Element;
  footer?: (pageIndex: number, totalPages: number) => JSX.Element;

  contentRef: React.RefObject<HTMLDivElement>;
  renderContent?: boolean;

  handleLoading: (state: boolean) => void;
  handleRenderContent: (state: boolean) => void;
}

export default function PageRenderContent({
  children,
  cover,
  header,
  footer,
  contentRef: printContentRef,
  renderContent,
  handleLoading,
  handleRenderContent,
}: PageRenderContentProps) {
  const hiddenContentRef = useRef<HTMLDivElement>(null);

  // Page dimensions from store
  const pageWidth = usePageStore((state) => state.pageWidth);
  const pageHeight = usePageStore((state) => state.pageHeight);
  const marginTop = usePageStore((state) => state.marginTop);
  const marginBottom = usePageStore((state) => state.marginBottom);
  const marginLeft = usePageStore((state) => state.marginLeft);
  const marginRight = usePageStore((state) => state.marginRight);

  const pageContentWidth = pageWidth - marginLeft - marginRight;

  // Use pagination hook
  const { pages, hasMounted } = usePagination({
    containerRef: hiddenContentRef,
    enabled: renderContent ?? false,
    onLoadingChange: handleLoading,
    onRenderContentChange: handleRenderContent,
  });

  return (
    <>
      {/* Hidden container for content measurement */}
      {renderContent && (
        <div
          id="rsp-hidden-content"
          ref={hiddenContentRef}
          style={{
            visibility: "hidden",
            position: "absolute",
            left: -9999,
            width: `${pageContentWidth}px`,
            pointerEvents: "none",
            paddingRight: `${marginRight}px`,
            paddingLeft: `${marginLeft}px`,
          }}
        >
          {children}
        </div>
      )}

      {/* Rendered paginated preview */}
      {renderContent && hasMounted && (
        <div id="rsp-page-preview" className="rsp-print-content" ref={printContentRef}>
          <PagePreview
            pages={pages}
            pageHeight={pageHeight}
            pageWidth={pageWidth}
            marginTop={marginTop}
            marginBottom={marginBottom}
            marginLeft={marginLeft}
            marginRight={marginRight}
            cover={cover}
            header={header}
            footer={footer}
          />
        </div>
      )}
    </>
  );
}
