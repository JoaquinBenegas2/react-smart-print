import { useEffect } from "react";

export const GlobalStyleInjector = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .rsp-print-content {
        display: none;
      }

      @media print {
        .rsp-print-content {
          display: block;
        }
      }
    `;
    document.head.appendChild(style);

    // Limpia el estilo al desmontar el componente
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};
