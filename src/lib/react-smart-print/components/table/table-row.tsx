import { CSSProperties } from "react";

interface TableRowProps {
  children: React.ReactNode;
  style?: CSSProperties;
}

const defaultStyle: CSSProperties = {
  display: "flex",
  width: "100%",
  marginTop: "-1px",
};

export const TableRow = ({ children, style }: TableRowProps) => {
  return (
    <div id="rsp-table-row" style={{ ...defaultStyle, ...style }}>
      {children}
    </div>
  );
};
