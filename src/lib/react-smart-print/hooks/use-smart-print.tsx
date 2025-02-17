import { useCallback, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

export interface SmartPrintHook {
  config: {
    contentRef: React.RefObject<HTMLDivElement>;
    renderContent: boolean;
    handleLoading: (state: boolean) => void;
    handleRenderContent: (state: boolean) => void;
  };
  isLoading: boolean;
  isRendered: boolean;
  isError: boolean;
  render: () => Promise<void>;
  unmount: () => void;
  print: () => void;
}

export function useSmartPrint(fileName: string): SmartPrintHook {
  const contentRef = useRef<HTMLDivElement>(null);

  const [renderContent, setRenderContent] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const reactToPrintFn = useReactToPrint({
    contentRef: contentRef,
    documentTitle: fileName,
  });

  const render = useCallback(async () => {
    try {
      if (!renderContent) {
        setIsError(false);
        setIsLoading(true);
        setRenderContent(true);
      } else {
        console.warn("El contenido ya fue renderizado.");
      }
    } catch (error) {
      console.error("Error en render:", error);
      setIsError(true);
    }
  }, [renderContent]);

  const unmount = useCallback(() => {
    setIsRendered(false);
    setRenderContent(false);
    setIsError(false);
  }, []);

  const print = useCallback(() => {
    if (!isRendered) {
      console.warn("El contenido aún no se ha renderizado para imprimir.");
      return;
    }

    reactToPrintFn?.();
  }, [isRendered, reactToPrintFn]);

  const handleLoading = useCallback(
    (state: boolean) => {
      setIsLoading(state);
    },
    [setIsLoading]
  );

  const handleRenderContent = useCallback(
    (state: boolean) => {
      setIsRendered(state);
    },
    [setIsRendered]
  );

  return {
    config: {
      contentRef,
      renderContent,
      handleLoading,
      handleRenderContent,
    },
    isLoading,
    isRendered,
    isError,
    render,
    unmount,
    print,
  };
}
