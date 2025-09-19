import { useCallback, useEffect, useRef, useState } from "react";
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
  renderAndPrint: () => Promise<void>;
}

export function useSmartPrint(fileName: string): SmartPrintHook {
  const contentRef = useRef<HTMLDivElement>(null);

  const [renderContent, setRenderContent] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [shouldPrintAfterRender, setShouldPrintAfterRender] = useState<boolean>(false);

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
        console.warn("Content has already been rendered.");
      }
    } catch (error) {
      console.error("Error in render:", error);
      setIsError(true);
    }
  }, [renderContent]);

  const unmount = useCallback(() => {
    setIsRendered(false);
    setRenderContent(false);
    setIsError(false);
    setShouldPrintAfterRender(false);
  }, []);

  const print = useCallback(() => {
    if (!isRendered) {
      console.warn("The content has not been rendered for printing.");
      return;
    }

    reactToPrintFn?.();
  }, [isRendered, reactToPrintFn]);

  const renderAndPrint = useCallback(async () => {
    try {
      await render();

      setShouldPrintAfterRender(true);
    } catch (error) {
      console.error("Error in renderAndPrint:", error);
      setIsError(true);
    }
  }, [render]);

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

  // Effect to handle printing after render is complete
  useEffect(() => {
    if (shouldPrintAfterRender && isRendered) {
      setShouldPrintAfterRender(false);
      reactToPrintFn?.();
      unmount();
    }
  }, [isRendered, shouldPrintAfterRender, reactToPrintFn, unmount]);

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
    renderAndPrint,
  };
}
