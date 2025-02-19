# React Smart Print 🖨️

**React Smart Print** is a modern and minimalist library that allows you to generate PDF reports easily and customize them using React components. Leverage the power of React to build complex documents with advanced options for configuring headers, footers, cover pages, and much more.

---

## ✨ Features

- ⚛️ **React Integration:** Use your components to build the PDF content.
- 🖌️ **Full Customization:** Configure paper sizes, margins, orientation, and paragraph spacing.
- 📝 **Custom Headers, Footers, and Cover Pages:** Define functions that return JSX components for each section.
- 🛠️ **Ready-to-Use Hooks and Components:** Use the `useSmartPrint` hook to manage the report lifecycle and components like `Typography`, `Paragraph`, `Table`, `List`, `PageBreak`, `BlankPage`, and `Divider` to facilitate composition.
- 📈 **Optimal Performance:** Fast and efficient PDF generation and printing.

---

## 📦 Installation

Install **React Smart Print** using your preferred package manager:

```sh
npm install react-smart-print
```

```sh
pnpm install react-smart-print
```

```sh
yarn add react-smart-print
```

---

## 🚀 Basic Usage

Below is a basic example showing how to generate and render a PDF:

```tsx
import React from "react";
import { PageRender, Typography, useSmartPrint } from "react-smart-print";

const SalesReport = () => {
  // Initialize the hook with an identifier for the report
  const { config, render, print, unmount, isLoading } = useSmartPrint("sales-report");

  return (
    <div>
      <button onClick={render}>Generate PDF</button>
      <button onClick={print}>Print PDF</button>
      <button onClick={unmount}>Close PDF</button>

      {isLoading && <p>Loading...</p>}

      <PageRender
        {...config}
        paperOptions={{
          paperSize: "a4",
          margin: "normal",
          paragraphSpacing: 10,
        }}
        header={(page, total) => (
          <header>
            Header - Page {page} of {total}
          </header>
        )}
        footer={(page, total) => (
          <footer>
            Footer - Page {page} of {total}
          </footer>
        )}
      >
        <Typography bold fontSize={16}>
          Sales Report
        </Typography>
        <p>Report content...</p>
      </PageRender>
    </div>
  );
};

export default SalesReport;
```

---

## ⚙️ API and Configuration

### 🔷 Main Component: `<PageRender />`

`<PageRender />` is responsible for rendering the PDF content. It is highly configurable to meet various design requirements.

#### `<PageRender />` Props

| Prop                  | Type                                                                | Description                                                                                 |
| --------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `children`            | `React.ReactNode`                                                   | Report content.                                                                             |
| `paperOptions`        | `PaperOptions`                                                      | Document configuration, including size, margins, orientation, and paragraph spacing.        |
| `cover`               | `() => JSX.Element` (optional)                                      | Function that returns the report cover page.                                                |
| `header`              | `(pageIndex: number, totalPages: number) => JSX.Element` (optional) | Function to render the header on each page.                                                 |
| `footer`              | `(pageIndex: number, totalPages: number) => JSX.Element` (optional) | Function to render the footer on each page, which can include page numbers and total pages. |
| `contentRef`          | `React.RefObject<HTMLDivElement>`                                   | Reference to the main content container.                                                    |
| `renderContent`       | `boolean`                                                           | Indicates whether the report content should be rendered.                                    |
| `handleLoading`       | `(state: boolean) => void`                                          | Function to update the loading state during PDF generation.                                 |
| `handleRenderContent` | `(state: boolean) => void`                                          | Function to control content rendering.                                                      |

---

### Paper Configuration (`PaperOptions`)

The `PaperOptions` interface allows you to define key document details:

- **`paperSize`**: Defines the paper size. It can be one of the following strings: `"a4"`, `"letter"`, `"legal"`, or an object with `width` and `height` properties.
- **`margin`**: Defines document margins. You can use predefined strings: `"normal"`, `"narrow"`, or `"wide"`, or an object with `top`, `bottom`, `left`, and `right` values.
- **`orientation`**: Sets the document orientation: `"portrait"` or `"landscape"`.
- **`paragraphSpacing`**: Paragraph spacing (numeric value).

#### Predefined Values

```tsx
export const PAPER_SIZES = {
  a4: { width: 1050, height: 1485 },
  letter: { width: 425, height: 550 },
  legal: { width: 425, height: 70 },
};

export const DEFAULT_MARGINS = {
  normal: { top: 125, bottom: 125, left: 150, right: 150 },
  narrow: { top: 62.5, bottom: 62.5, left: 62.5, right: 62.5 },
  wide: { top: 125, bottom: 125, left: 250, right: 250 },
};
```

---

### 🔷 Hook: `useSmartPrint`

The `useSmartPrint` hook manages the PDF generation lifecycle and provides all the necessary configuration for `<PageRender />`.

#### Example usage:

```tsx
const {
  config, // Object with { contentRef, renderContent, handleLoading, handleRenderContent }
  isLoading, // Loading state
  isRendered, // Indicates whether the PDF has been generated
  isError, // Indicates if an error occurred during generation
  render, // Function to start PDF generation
  unmount, // Function to unmount the PDF
  print, // Function to send the PDF to print
} = useSmartPrint("identifier");
```

The `config` object is essential for `<PageRender />` to function correctly, as it contains:

- `contentRef`: Reference to the content container.
- `renderContent`: Boolean state to determine whether the content should be rendered.
- `handleLoading`: Function to update the loading state.
- `handleRenderContent`: Function to control when to render the content.

---

### 🔷 Additional Components

In addition to the main component, the library includes other components that simplify the construction and styling of the report:

- **`Typography`**: Renders text with predefined styles (size, weight, etc.).
- **`Paragraph`**: Defines formatted text paragraphs.
- **`Table`**: Enables table creation.
- **`List`** and **`ListItem`**: For ordered or unordered lists.
- **`PageBreak`**: Inserts a page break in the document.
- **`BlankPage`**: Adds blank pages.
- **`Divider`**: Inserts a dividing line to separate report sections.

These components are designed to work seamlessly together, helping you build modular and easily customizable reports.

---

<!--
## 🔥 Advanced Example

This example demonstrates how to combine various components and options to create a complete, customized report:

```tsx

```

---
-->

## 🤝 Contributing

Contributions are welcome! To collaborate on the project, follow these steps:

1. **Fork the Repository:**  
   Fork the repository on GitHub.

2. **Create a New Branch:**

   ```sh
   git checkout -b feature/new-feature
   ```

3. **Make Changes and Commit:**

   ```sh
   git commit -m "Add new feature"
   ```

4. **Push Changes to Your Fork:**

   ```sh
   git push origin feature/new-feature
   ```

5. **Create a Pull Request:**  
   Open a Pull Request for your changes to be reviewed and merged.

---

## 🛣️ Roadmap

- **More Customization:** Include additional styling options for components.
- **New Components:** Add extra components to enhance report building.
- **Performance Optimization:** Improve PDF generation and rendering efficiency.
- **Extended Documentation:** Incorporate more examples and practical guides.

---

## 📝 Credits

This project uses the following third-party libraries:

- [React](https://reactjs.org/) (MIT License)
- [Lodash](https://lodash.com/) (MIT License)
- [react-to-print](https://github.com/gregnb/react-to-print) (MIT License)
- [html-react-parser](https://github.com/remarkablemark/html-react-parser) (MIT License)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE). See the file for more details.
