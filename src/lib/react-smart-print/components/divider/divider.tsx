interface DividerProps {
  width?: string;
  height?: string;
  color?: string;
  marginTop?: string;
  marginBottom?: string;
  className?: string;
}

export function Divider({
  width = "100%",
  height = "1px",
  color = "#c2c2c2",
  marginTop = "24px",
  marginBottom = "24px",
  className = "",
}: DividerProps) {
  return (
    <div
      id="rsp-divider"
      className={className}
      style={{
        width,
        height,
        backgroundColor: color,
        marginTop,
        marginBottom,
      }}
    ></div>
  );
}
