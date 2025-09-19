# React Smart Print 🖨️

[![npm version](https://badge.fury.io/js/react-smart-print.svg)](https://badge.fury.io/js/react-smart-print)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**React Smart Print** is a modern, lightweight, and highly customizable React library for generating professional PDF reports. Build complex documents using familiar React components with advanced features like custom headers, footers, cover pages, and responsive layouts.

## 🎯 Why React Smart Print?

- **⚡ Zero Learning Curve**: Use your existing React knowledge
- **🎨 Full Design Control**: Customize every aspect of your documents
- **📱 Responsive**: Automatic scaling and responsive layouts
- **🚀 Performance**: Optimized for fast PDF generation
- **🔧 TypeScript Ready**: Full TypeScript support out of the box

---

## ✨ Features

### Core Functionality
- ⚛️ **React Integration:** Build PDFs using familiar React components and JSX
- 🖌️ **Full Customization:** Configure paper sizes, margins, orientation, and spacing
- 📝 **Advanced Layout:** Custom headers, footers, cover pages, and page breaks
- 🚀 **One-Click Operations:** Generate, print, or do both with single method calls

### Components & Tools
- 🛠️ **Rich Component Library:** `Typography`, `Paragraph`, `Table`, `List`, `PageBreak`, `BlankPage`, `Divider`
- 📊 **Table Support:** Full-featured tables with headers, bodies, and custom styling
- 📋 **List Components:** Ordered and unordered lists with custom formatting
- 🎨 **Typography System:** Flexible text styling with size, weight, and alignment options

### Developer Experience
- 🔧 **TypeScript Support:** Full type definitions and IntelliSense
- 🎯 **Simple API:** Intuitive hooks and components with minimal configuration
- 📱 **Responsive Design:** Automatic scaling and responsive layouts
- ⚡ **Performance Optimized:** Fast rendering and efficient memory usage

---

## 📦 Installation

Install **React Smart Print** using your preferred package manager:

```bash
# npm
npm install react-smart-print

# pnpm
pnpm add react-smart-print

# yarn
yarn add react-smart-print
```

### Requirements

- React 16.8+ (hooks support required)
- Modern browser with ES6+ support

---

## 🚀 Quick Start

### Basic Example

Here's a simple example to get you started:

```tsx
import React from "react";
import { 
  PageRender, 
  Typography, 
  Paragraph, 
  useSmartPrint 
} from "react-smart-print";

const SalesReport = () => {
  const { 
    config, 
    render, 
    print, 
    renderAndPrint, 
    unmount, 
    isLoading 
  } = useSmartPrint("sales-report");

  return (
    <div>
      {/* Action Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={render} disabled={isLoading}>
          Generate PDF
        </button>
        <button onClick={print} disabled={isLoading}>
          Print PDF
        </button>
        <button onClick={renderAndPrint} disabled={isLoading}>
          Generate & Print
        </button>
        <button onClick={unmount}>
          Close PDF
        </button>
      </div>

      {isLoading && <p>Generating PDF...</p>}

      {/* PDF Content */}
      <PageRender
        {...config}
        paperOptions={{
          paperSize: "a4",
          margin: "normal",
          paragraphSpacing: 12,
        }}
        header={(page, total) => (
          <div style={{ textAlign: "center", padding: "10px" }}>
            <Typography fontSize={12}>Sales Report - Page {page} of {total}</Typography>
          </div>
        )}
        footer={(page, total) => (
          <div style={{ textAlign: "center", padding: "10px" }}>
            <Typography fontSize={10}>© 2024 Company Name</Typography>
          </div>
        )}
      >
        <Typography bold fontSize={18} align="center">
          Monthly Sales Report
        </Typography>
        
        <Paragraph align="justify">
          This report contains the sales data for the current month, 
          including revenue analysis and performance metrics.
        </Paragraph>
        
        <Typography bold fontSize={14}>
          Key Metrics
        </Typography>
        
        <Paragraph>
          • Total Revenue: $125,000
          • Units Sold: 1,250
          • Growth Rate: 15%
        </Paragraph>
      </PageRender>
    </div>
  );
};

export default SalesReport;
```

### What's Happening?

1. **`useSmartPrint`**: Manages the PDF lifecycle and provides configuration
2. **`PageRender`**: Renders your content with the specified paper options
3. **Action Buttons**: Control PDF generation, printing, and cleanup
4. **Components**: Use `Typography`, `Paragraph`, and other components to build content

---

## 📚 API Reference

### 🔷 Core Components

#### `<PageRender />`

The main component responsible for rendering PDF content. Highly configurable to meet various design requirements.

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactNode` | ✅ | The report content to be rendered |
| `paperOptions` | `PaperOptions` | ✅ | Document configuration (size, margins, spacing) |
| `cover` | `() => JSX.Element` | ❌ | Function that returns the cover page |
| `header` | `(page: number, total: number) => JSX.Element` | ❌ | Function to render page headers |
| `footer` | `(page: number, total: number) => JSX.Element` | ❌ | Function to render page footers |
| `contentRef` | `React.RefObject<HTMLDivElement>` | ✅ | Reference to content container (from `useSmartPrint`) |
| `renderContent` | `boolean` | ✅ | Controls content rendering (from `useSmartPrint`) |
| `handleLoading` | `(state: boolean) => void` | ✅ | Loading state handler (from `useSmartPrint`) |
| `handleRenderContent` | `(state: boolean) => void` | ✅ | Render state handler (from `useSmartPrint`) |

**Example:**

```tsx
<PageRender
  {...config}
  paperOptions={{
    paperSize: "a4",
    margin: "normal",
    paragraphSpacing: 12,
  }}
  cover={() => <CoverPage />}
  header={(page, total) => <Header page={page} total={total} />}
  footer={(page, total) => <Footer page={page} total={total} />}
>
  <YourContent />
</PageRender>
```

---

### 📄 Paper Configuration (`PaperOptions`)

Configure your document's physical properties and layout.

**Interface:**

```tsx
interface PaperOptions {
  paperSize: PaperSize | PaperSizeObject;
  margin?: PaperMargin | PaperMarginObject;
  orientation?: "portrait" | "landscape";
  paragraphSpacing?: number;
}

interface PaperSizeObject {
  width: number;
  height: number;
}

interface PaperMarginObject {
  top: number;
  bottom: number;
  left: number;
  right: number;
}
```

**Properties:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `paperSize` | `string \| PaperSizeObject` | `"a4"` | Paper size (predefined or custom) |
| `margin` | `string \| PaperMarginObject` | `"normal"` | Document margins |
| `orientation` | `"portrait" \| "landscape"` | `"portrait"` | Page orientation |
| `paragraphSpacing` | `number` | `12` | Spacing between paragraphs (px) |

**Predefined Values:**

```tsx
// Paper Sizes
const PAPER_SIZES = {
  a4: { width: 1050, height: 1485 },      // A4 (210 × 297 mm)
  letter: { width: 425, height: 550 },    // US Letter (8.5 × 11 in)
  legal: { width: 425, height: 700 },     // US Legal (8.5 × 14 in)
};

// Margins
const DEFAULT_MARGINS = {
  normal: { top: 125, bottom: 125, left: 150, right: 150 },
  narrow: { top: 62.5, bottom: 62.5, left: 62.5, right: 62.5 },
  wide: { top: 125, bottom: 125, left: 250, right: 250 },
};
```

**Examples:**

```tsx
// Using predefined values
paperOptions={{
  paperSize: "a4",
  margin: "normal",
  paragraphSpacing: 12,
}}

// Using custom values
paperOptions={{
  paperSize: { width: 800, height: 1200 },
  margin: { top: 100, bottom: 100, left: 120, right: 120 },
  orientation: "landscape",
  paragraphSpacing: 16,
}}
```

---

### 🎣 Hook: `useSmartPrint`

The core hook that manages the PDF generation lifecycle and provides all necessary configuration.

**Signature:**

```tsx
const result = useSmartPrint(identifier: string);
```

**Returns:**

| Property | Type | Description |
|----------|------|-------------|
| `config` | `object` | Configuration object for `<PageRender />` |
| `isLoading` | `boolean` | Loading state during PDF operations |
| `isRendered` | `boolean` | Whether PDF has been generated |
| `isError` | `boolean` | Whether an error occurred |
| `render` | `() => void` | Generate PDF function |
| `print` | `() => void` | Print PDF function |
| `renderAndPrint` | `() => void` | Generate and print in one operation |
| `unmount` | `() => void` | Clean up PDF resources |

**Example:**

```tsx
const {
  config,
  isLoading,
  isRendered,
  isError,
  render,
  print,
  renderAndPrint,
  unmount,
} = useSmartPrint("my-report");

// Usage
<button onClick={render} disabled={isLoading}>
  Generate PDF
</button>
<button onClick={print} disabled={!isRendered}>
  Print PDF
</button>
<button onClick={renderAndPrint} disabled={isLoading}>
  Generate & Print
</button>
<button onClick={unmount}>
  Close PDF
</button>
```

**The `config` Object:**

The `config` object contains essential properties for `<PageRender />`:

```tsx
const config = {
  contentRef: React.RefObject<HTMLDivElement>,     // Content container reference
  renderContent: boolean,                          // Controls content rendering
  handleLoading: (state: boolean) => void,        // Loading state handler
  handleRenderContent: (state: boolean) => void,  // Render state handler
};
```

#### 🚀 `renderAndPrint` Method

Combines PDF generation and printing into a single operation for better UX:

```tsx
const { renderAndPrint, isLoading } = useSmartPrint("my-report");

<button onClick={renderAndPrint} disabled={isLoading}>
  {isLoading ? "Generating..." : "Generate & Print"}
</button>
```

**Benefits:**
- **Streamlined workflow**: Single operation instead of two separate steps
- **Better UX**: One-click solution for complete print workflow
- **Automatic state management**: Handles loading states during the operation
- **Error handling**: Built-in error handling for the combined operation

---

### 🧩 Content Components

Build your PDF content using these specialized components designed for document layout:

#### `Typography`

Renders text with customizable styling options.

```tsx
<Typography 
  fontSize={16}
  bold={true}
  italic={false}
  underline={false}
  color="#333"
  align="center"
  marginTop={10}
  marginBottom={10}
>
  Your text content
</Typography>
```

**Props:**
- `fontSize?: number` - Font size in pixels (default: 11)
- `bold?: boolean` - Bold text (default: false)
- `italic?: boolean` - Italic text (default: false)
- `underline?: boolean` - Underlined text (default: false)
- `color?: string` - Text color (default: "#000")
- `align?: "left" | "center" | "right" | "justify"` - Text alignment
- `marginTop?: number` - Top margin in pixels
- `marginBottom?: number` - Bottom margin in pixels

#### `Paragraph`

Formatted text paragraphs with automatic line wrapping and spacing.

```tsx
<Paragraph 
  align="justify"
  fontSize={12}
  lineSpacing={1.5}
  marginTop={8}
  marginBottom={8}
>
  Your paragraph content with automatic line wrapping and proper spacing.
</Paragraph>
```

**Props:**
- `align?: "left" | "center" | "right" | "justify"` - Text alignment
- `fontSize?: number` - Font size in pixels (default: 11)
- `lineSpacing?: number` - Line spacing multiplier (default: 1)
- `marginTop?: number` - Top margin in pixels
- `marginBottom?: number` - Bottom margin in pixels

#### `Table`

Create structured data tables with headers and rows.

```tsx
<Table width="100%">
  <TableHead>
    <TableRow>
      <TableCell>Header 1</TableCell>
      <TableCell>Header 2</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>Data 1</TableCell>
      <TableCell>Data 2</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

**Components:**
- `Table` - Main table container
- `TableHead` - Table header section
- `TableBody` - Table body section
- `TableRow` - Table row
- `TableCell` - Table cell

#### `List` & `ListItem`

Create ordered or unordered lists.

```tsx
<List>
  <ListItem>First item</ListItem>
  <ListItem>Second item</ListItem>
  <ListItem>Third item</ListItem>
</List>
```

#### `PageBreak`

Inserts a page break in the document.

```tsx
<PageBreak />
```

#### `BlankPage`

Adds a blank page to the document.

```tsx
<BlankPage />
```

#### `Divider`

Inserts a horizontal dividing line to separate sections.

```tsx
<Divider />
```

### 🧪 Beta Components

The following components are currently in **beta** and may have breaking changes in future versions:

#### `ScalableContainer` (Beta)

A responsive container that visually scales fixed-size content to fit within a container while preserving aspect ratio. Perfect for document previews.

```tsx
import { ScalableContainer } from "react-smart-print";

<ScalableContainer 
  contentWidth={1050} // Original content width (e.g., A4 = 1050px)
  scaleMode="width"   // "width" or "full"
  style={{ maxWidth: "800px", border: "1px solid #ddd" }}
>
  <YourDocumentContent />
</ScalableContainer>
```

**Props:**
- `contentWidth: number` - Original width of the content in pixels
- `scaleMode?: "width" | "full"` - Scaling behavior (default: "width")
- `style?: React.CSSProperties` - Optional CSS styles for the container
- `className?: string` - Optional CSS class name

**Use Cases:**
- Document previews in responsive layouts
- Scaling PDF content for different screen sizes
- Creating zoomable document viewers

#### `DocumentPreview` (Beta)

Creates a live preview of rendered document content by cloning the original DOM. Automatically syncs changes using MutationObserver.

```tsx
import { DocumentPreview } from "react-smart-print";

<DocumentPreview 
  previewRef={contentRef}     // Reference to the original document
  renderContent={isRendered}  // Whether to show the preview
  style={{ 
    border: "1px solid #ccc", 
    borderRadius: "8px",
    padding: "16px" 
  }}
/>
```

**Props:**
- `previewRef: React.RefObject<HTMLDivElement>` - Reference to the original document element
- `renderContent?: boolean` - Boolean to control preview visibility
- `style?: React.CSSProperties` - Optional CSS styles for the preview container

**Features:**
- Real-time synchronization with original content
- Automatic DOM cloning and updates
- Performance optimized with MutationObserver
- Non-interactive preview (pointer events disabled)

**Note:** These beta components are experimental and their API may change in future releases. Use with caution in production environments.

---

## 🎨 Advanced Examples

### Complete Report with Cover Page

```tsx
import React from "react";
import { 
  PageRender, 
  Typography, 
  Paragraph, 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell,
  List,
  ListItem,
  Divider,
  PageBreak,
  useSmartPrint 
} from "react-smart-print";

const CompleteReport = () => {
  const { config, renderAndPrint, isLoading } = useSmartPrint("complete-report");

  const coverPage = () => (
    <div style={{ 
      height: "100%", 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center", 
      alignItems: "center",
      textAlign: "center",
      padding: "50px"
    }}>
      <Typography bold fontSize={32} color="#1a365d">
        Annual Report 2024
      </Typography>
      <Typography fontSize={18} color="#4a5568" marginTop={20}>
        Company Performance & Financial Analysis
      </Typography>
      <Divider />
      <Typography fontSize={14} color="#718096" marginTop={30}>
        Generated on {new Date().toLocaleDateString()}
      </Typography>
    </div>
  );

  const header = (page: number, total: number) => (
    <div style={{ 
      height: "100%",
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center",
      padding: "10px 20px",
      borderBottom: "1px solid #e2e8f0"
    }}>
      <Typography fontSize={12} color="#4a5568">
        Annual Report 2024
      </Typography>
      <Typography fontSize={12} color="#4a5568">
        Page {page} of {total}
      </Typography>
    </div>
  );

  const footer = (page: number, total: number) => (
    <div style={{ 
      height: "100%",
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center",
      padding: "10px",
      borderTop: "1px solid #e2e8f0"
    }}>
      <Typography fontSize={10} color="#718096">
        © 2024 Your Company. All rights reserved.
      </Typography>
    </div>
  );

  return (
    <div>
      <button onClick={renderAndPrint} disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate & Print Report"}
      </button>

      <PageRender
        {...config}
        paperOptions={{
          paperSize: "a4",
          margin: "normal",
          paragraphSpacing: 12,
        }}
        cover={coverPage}
        header={header}
        footer={footer}
      >
        <Typography bold fontSize={20} align="center" marginBottom={20}>
          Executive Summary
        </Typography>
        
        <Paragraph align="justify">
          This comprehensive report provides an in-depth analysis of our company's 
          performance throughout 2024, including financial metrics, operational 
          achievements, and strategic initiatives.
        </Paragraph>

        <Typography bold fontSize={16} marginTop={20} marginBottom={10}>
          Key Performance Indicators
        </Typography>

        <Table width="100%">
          <TableHead>
            <TableRow>
              <TableCell>Metric</TableCell>
              <TableCell>2023</TableCell>
              <TableCell>2024</TableCell>
              <TableCell>Growth</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Revenue</TableCell>
              <TableCell>$1.2M</TableCell>
              <TableCell>$1.5M</TableCell>
              <TableCell>+25%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Customers</TableCell>
              <TableCell>1,200</TableCell>
              <TableCell>1,800</TableCell>
              <TableCell>+50%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Profit Margin</TableCell>
              <TableCell>15%</TableCell>
              <TableCell>18%</TableCell>
              <TableCell>+3%</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <PageBreak />

        <Typography bold fontSize={20} align="center" marginBottom={20}>
          Strategic Initiatives
        </Typography>

        <List>
          <ListItem>Digital transformation implementation</ListItem>
          <ListItem>Market expansion in European regions</ListItem>
          <ListItem>Sustainability program launch</ListItem>
          <ListItem>Customer experience enhancement</ListItem>
        </List>

        <Divider />

        <Typography bold fontSize={16} marginTop={20}>
          Conclusion
        </Typography>

        <Paragraph align="justify">
          The year 2024 has been marked by significant growth and strategic 
          achievements. Our focus on innovation and customer satisfaction has 
          resulted in strong financial performance and market expansion.
        </Paragraph>
      </PageRender>
    </div>
  );
};

export default CompleteReport;
```

---

## 🚀 Best Practices

### Performance Tips

1. **Use `renderAndPrint` for better UX**: Combine generation and printing when possible
2. **Optimize images**: Compress images before including them in your PDFs
3. **Limit content per page**: Avoid extremely long content that might cause memory issues
4. **Use appropriate paper sizes**: Choose the right paper size for your content

### Design Guidelines

1. **Consistent spacing**: Use consistent margins and padding throughout your document
2. **Clear hierarchy**: Use different font sizes and weights to create visual hierarchy
3. **Professional headers/footers**: Include page numbers and document information
4. **Test printing**: Always test your PDFs in print preview before finalizing

### Common Patterns

```tsx
// Pattern 1: Simple report
const SimpleReport = () => {
  const { config, renderAndPrint, isLoading } = useSmartPrint("simple-report");
  
  return (
    <PageRender {...config} paperOptions={{ paperSize: "a4" }}>
      <Typography bold fontSize={18}>Title</Typography>
      <Paragraph>Content...</Paragraph>
    </PageRender>
  );
};

// Pattern 2: Multi-page document with cover
const MultiPageReport = () => {
  const { config, renderAndPrint, isLoading } = useSmartPrint("multi-page");
  
  return (
    <PageRender 
      {...config} 
      paperOptions={{ paperSize: "a4" }}
      cover={() => <CoverPage />}
      header={(page, total) => <Header page={page} total={total} />}
      footer={(page, total) => <Footer page={page} total={total} />}
    >
      <Content />
    </PageRender>
  );
};
```

---

## 🤝 Contributing

Contributions are welcome! To collaborate on the project, follow these steps:

1. **Fork the Repository**
   ```bash
   git clone https://github.com/your-username/react-smart-print.git
   cd react-smart-print
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **Make Your Changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

5. **Test Your Changes**
   ```bash
   npm run test
   npm run build
   ```

6. **Commit Your Changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```

7. **Push and Create Pull Request**
   ```bash
   git push origin feature/amazing-feature
   ```

### Development Guidelines

- **Code Style**: Follow the existing ESLint configuration
- **Documentation**: Update README and inline documentation
- **TypeScript**: Maintain full TypeScript support
- **Performance**: Consider performance implications of changes

---

## 🛣️ Roadmap

- **More Customization:** Include additional styling options for components.
- **New Components:** Add extra components to enhance report building.
- **Performance Optimization:** Improve PDF generation and rendering efficiency.
- **Extended Documentation:** Incorporate more examples and practical guides.

---

## 🐛 Troubleshooting

### Common Issues

**Q: PDF not generating?**
A: Ensure you're calling `render()` or `renderAndPrint()` after the component mounts.

**Q: Content not appearing?**
A: Check that `renderContent` is `true` and your content is inside `<PageRender>`.

**Q: Styling issues?**
A: Use inline styles or CSS-in-JS. External stylesheets may not work in PDFs.

**Q: Performance problems?**
A: Limit the amount of content per page and optimize images.

### Getting Help

- 📖 **Documentation**: Check this README and inline documentation
- 🐛 **Issues**: Report bugs on [GitHub Issues](https://github.com/JoaquinBenegas2/react-smart-print/issues)

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
