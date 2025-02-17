import React, { CSSProperties } from "react";

interface TableBodyProps {
  children: React.ReactNode;
  style?: CSSProperties;
}

const defaultStyle: CSSProperties = {
  backgroundColor: "#fafafa",
  fontWeight: "normal",
};

export const TableBody = ({ children, style }: TableBodyProps) => {
  return (
    <>
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement, {
          style: {
            ...defaultStyle,
            ...((child as React.ReactElement).props.style || {}),
            ...style,
          },
        })
      )}
    </>
  );
};
