import React, { CSSProperties } from "react";

interface TableHeadProps {
  children: React.ReactNode;
  style?: CSSProperties;
}

const defaultStyle: CSSProperties = {
  backgroundColor: "#f0f0f0",
  fontWeight: "bold",
};

export const TableHead = ({ children, style }: TableHeadProps) => {
  return (
    <>
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement, { style: { ...defaultStyle, ...style } })
      )}
    </>
  );
};
