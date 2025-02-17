import React, { CSSProperties } from "react";

interface TableProps {
  children: React.ReactNode;
  width?: CSSProperties["width"];
  marginTop?: CSSProperties["marginTop"];
  marginBottom?: CSSProperties["marginBottom"];
}

export const Table = ({ children, width = "100%", marginBottom, marginTop }: TableProps) => {
  return (
    <>
      {/* Margin Top */}
      {marginTop && <div style={{ height: marginTop, display: "flex" }}></div>}

      {/* Table Rows */}
      {React.Children.map(children, (child) => {
        return React.cloneElement(child as React.ReactElement, {
          id: "rsp-table-row",
          style: { ...((child as React.ReactElement).props.style || {}), width: width || "100%" },
        });
      })}

      {/* Margin Bottom */}
      {marginBottom && <div style={{ height: marginBottom, display: "flex" }}></div>}

      {/* Paragraph Spacing */}
      <div className="rsp-add-p-spacing" style={{ height: 0 }}></div>
    </>
  );
};
