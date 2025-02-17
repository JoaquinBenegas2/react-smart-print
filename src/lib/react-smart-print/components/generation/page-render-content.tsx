import { PagePreview } from "@/components/generation/page-preview";
import { PageElement } from "@/models/page-content/page";
import { usePageStore } from "@/store/page-store";
import { paginateContent } from "@/utils/paginate-content";
import { isEqual } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";

export interface PageRenderContentProps {
  children: React.ReactNode;
  cover?: () => JSX.Element;
  header?: (pageIndex: number, totalPages: number) => JSX.Element;
  footer?: (pageIndex: number, totalPages: number) => JSX.Element;
  handleLoading: (state: boolean) => void;
  handleRenderContent: (state: boolean) => void;
  contentRef: React.RefObject<HTMLDivElement>;
  renderContent?: boolean;
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
  /* Pages State */
  const [pages, setPages] = useState<PageElement[][]>([]);

  /* Has Hidden Mounted */
  const [hasHiddenMounted, setHasHiddenMounted] = useState(false);

  /* Page Dimensions */
  const pageWidth = usePageStore((state) => state.pageWidth);
  const pageHeight = usePageStore((state) => state.pageHeight);
  const marginTop = usePageStore((state) => state.marginTop);
  const marginBottom = usePageStore((state) => state.marginBottom);
  const marginLeft = usePageStore((state) => state.marginLeft);
  const marginRight = usePageStore((state) => state.marginRight);

  /* Paragraph Spacing */
  const paragraphSpacing = usePageStore((state) => state.paragraphSpacing);

  /* Page Size */
  const pageContentWidth = pageWidth - marginLeft - marginRight;
  const pageContentHeight = pageHeight - marginTop - marginBottom;

  /* Content Ref */
  const hiddenContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hiddenContentRef.current) {
      // Get the list of children elements of the hidden content container.
      const elements = Array.from(hiddenContentRef.current.children) as HTMLElement[];

      // Paginate the content
      const newPages = paginateContent(elements, pageContentHeight, paragraphSpacing);

      // If the pages have changed, update the state
      if (!isEqual(newPages, pages)) {
        setPages(newPages);
      }
    }
  }, [pageContentHeight, paragraphSpacing, pages, hasHiddenMounted]);

  // Effect to mark that the hidden content has already mounted
  useEffect(() => {
    if (renderContent && hiddenContentRef.current) {
      setHasHiddenMounted(true);
    } else {
      setHasHiddenMounted(false);
    }
  }, [renderContent]);

  const handleRenderFinish = useCallback(() => {
    handleLoading(false);
    handleRenderContent(true);
  }, [handleLoading, handleRenderContent]);

  return (
    <>
      {/* Invisible container to render the content */}
      {renderContent && (
        <div
          id="rsp-hidden-content"
          className=""
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

      {/* Render the paginated preview and print */}
      {renderContent && hasHiddenMounted && (
        <div id="rsp-page-preview" className="rsp-print-content" ref={printContentRef}>
          <PagePreview
            pages={pages}
            handleRenderFinish={handleRenderFinish}
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
