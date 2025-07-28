import parse from "html-react-parser";
import { Fragment } from "react/jsx-runtime";
import { PageElement } from "@/models/page-content/page";
import { useEffect } from "react";

interface PagePreviewProps {
  pages: PageElement[][];
  handleRenderFinish: () => void;
  pageHeight: number;
  pageWidth: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  cover?: () => JSX.Element;
  header?: (page: number, totalPages: number) => React.ReactNode;
  footer?: (page: number, totalPages: number) => React.ReactNode;
}

export const PagePreview: React.FC<PagePreviewProps> = ({
  pages,
  handleRenderFinish,
  pageHeight,
  pageWidth,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  cover,
  header,
  footer,
}) => {
  const contentHeight = pageHeight - marginTop - marginBottom;

  useEffect(() => {
    if (pages.length > 0) {
      handleRenderFinish();
    }
  }, [pages, handleRenderFinish]);

  return (
    <>
      {/* Cover */}
      {cover && (
        <div
          id="rsp-cover"
          style={{
            height: pageHeight,
            width: pageWidth,
            backgroundColor: "white",
            pageBreakAfter: "always",
          }}
        >
          {cover()}
        </div>
      )}

      {/* Pages */}
      {pages.map((page, pageIndex) => (
        <>
          {page.length > 0 && (
            <div
              id={"rsp-page-" + `${cover ? pageIndex + 1 : pageIndex}`}
              key={pageIndex}
              style={{
                height: pageHeight,
                width: pageWidth,
                backgroundColor: "white",
                pageBreakAfter: "always",
              }}
            >
              {/* Header */}
              <div id="rsp-header" style={{ height: marginTop }}>
                {header && header(pageIndex + 1, pages.length)}
              </div>

              {/* Content */}
              <div
                id="rsp-content"
                style={{
                  height: contentHeight,
                  paddingLeft: marginLeft,
                  paddingRight: marginRight,
                }}
              >
                {page.map((item, index) => (
                  <Fragment key={index}>{parse(item.content)}</Fragment>
                ))}
              </div>

              {/* Footer */}
              <div id="rsp-footer" style={{ height: marginBottom }}>
                {footer && footer(pageIndex + 1, pages.length)}
              </div>
            </div>
          )}
        </>
      ))}
    </>
  );
};
