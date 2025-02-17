import { CSSProperties } from "react";

interface TableCellProps {
  children: React.ReactNode;
  style?: CSSProperties;
}

const defaultStyle: CSSProperties = {
  padding: "8px 16px",
  textAlign: "left",
  border: "1px solid #ddd",
  fontSize: "14px",
  color: "#555",
  flex: 1,
  marginLeft: "-1px",
};

export const TableCell = ({ children, style }: TableCellProps) => {
  return (
    <div id="rsp-table-cell" style={{ ...defaultStyle, ...style }}>
      {children}
    </div>
  );
};
