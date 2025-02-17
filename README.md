# React Smart Print 🖨️

**React Smart Print** es una librería moderna y minimalista que te permite generar reportes PDF de manera sencilla y personalizable utilizando componentes de React. Aprovecha el poder de React para construir documentos complejos, con opciones avanzadas para configurar encabezados, pies de página, carátulas y mucho más.

---

## ✨ Características

- ⚛️ **Integración con React:** Usa tus componentes para construir el contenido del PDF.
- 🖌️ **Personalización Total:** Configura tamaños de papel, márgenes, orientación y espaciado entre párrafos.
- 📝 **Encabezados, Pies de Página y Carátulas Personalizadas:** Define funciones que retornen componentes JSX para cada sección.
- 🛠️ **Hooks y Componentes Listos para Usar:** Utiliza el hook `useSmartPrint` para gestionar el ciclo de vida del reporte y componentes como `Typography`, `Paragraph`, `Table`, `List`, `PageBreak`, `BlankPage` y `Divider` para facilitar la composición.
- 📈 **Rendimiento Óptimo:** Generación e impresión de PDF de forma rápida y eficiente.

---

## 📦 Instalación

Instala **React Smart Print** utilizando el gestor de paquetes de tu preferencia:

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

## 🚀 Uso Básico

A continuación, un ejemplo básico que muestra cómo generar y renderizar un PDF:

```tsx
import React from "react";
import { PageRender, Typography, useSmartPrint } from "react-smart-print";

const ReporteVentas = () => {
  // Inicializa el hook con un identificador para el reporte
  const { config, render, print, unmount, isLoading } = useSmartPrint("reporte-ventas");

  return (
    <div>
      <button onClick={render}>Generar PDF</button>
      <button onClick={print}>Imprimir PDF</button>
      <button onClick={unmount}>Cerrar PDF</button>

      {isLoading && <p>Cargando...</p>}

      <PageRender
        {...config}
        paperOptions={{
          paperSize: "a4",
          margin: "normal",
          paragraphSpacing: 10,
        }}
        header={(page, total) => (
          <header>
            Encabezado - Página {page} de {total}
          </header>
        )}
        footer={(page, total) => (
          <footer>
            Pie de página - Página {page} de {total}
          </footer>
        )}
      >
        <Typography bold fontSize={16}>
          Reporte de Ventas
        </Typography>
        <p>Contenido del reporte...</p>
      </PageRender>
    </div>
  );
};

export default ReporteVentas;
```

---

## ⚙️ API y Configuración

### 🔷 Componente Principal: `<PageRender />`

`<PageRender />` es el componente encargado de renderizar el contenido del PDF. Es altamente configurable para adaptarse a distintos requerimientos de diseño.

#### Props de `<PageRender />`

| Prop                  | Tipo                                                                | Descripción                                                                                                                        |
| --------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `children`            | `React.ReactNode`                                                   | Contenido del reporte.                                                                                                             |
| `paperOptions`        | `PaperOptions`                                                      | Configuración del documento, incluyendo tamaño, márgenes, orientación y espaciado de párrafos.                                     |
| `cover`               | `() => JSX.Element` (opcional)                                      | Función que retorna la carátula del reporte.                                                                                       |
| `header`              | `(pageIndex: number, totalPages: number) => JSX.Element` (opcional) | Función para renderizar el encabezado en cada página.                                                                              |
| `footer`              | `(pageIndex: number, totalPages: number) => JSX.Element` (opcional) | Función para renderizar el pie de página en cada página, pudiendo incluir información como el número de página y total de páginas. |
| `contentRef`          | `React.RefObject<HTMLDivElement>`                                   | Referencia al contenedor principal del contenido.                                                                                  |
| `renderContent`       | `boolean`                                                           | Indica si se debe renderizar el contenido del reporte.                                                                             |
| `handleLoading`       | `(state: boolean) => void`                                          | Función para actualizar el estado de carga durante la generación del PDF.                                                          |
| `handleRenderContent` | `(state: boolean) => void`                                          | Función para controlar la renderización del contenido.                                                                             |

---

### Configuración de Papel (`PaperOptions`)

La interfaz `PaperOptions` te permite definir detalles importantes del documento:

- **`paperSize`**: Define el tamaño del papel. Puede ser uno de los siguientes strings: `"a4"`, `"letter"`, `"legal"`, o un objeto con las propiedades `width` y `height`.
- **`margin`**: Define los márgenes del documento. Puedes usar strings predefinidos: `"normal"`, `"narrow"`, o `"wide"`, o un objeto con `top`, `bottom`, `left` y `right`.
- **`orientation`**: Establece la orientación del documento: `"portrait"` o `"landscape"`.
- **`paragraphSpacing`**: Espaciado entre párrafos (valor numérico).

#### Valores Predefinidos

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

El hook `useSmartPrint` gestiona el ciclo de vida de la generación del PDF y te provee de toda la configuración necesaria para utilizar `<PageRender />`.

#### Ejemplo de uso del hook:

```tsx
const {
  config, // Objeto con { contentRef, renderContent, handleLoading, handleRenderContent }
  isLoading, // Estado de carga
  isRendered, // Indica si el PDF ya fue generado
  isError, // Indica si ocurrió un error durante la generación
  render, // Función para iniciar la generación del PDF
  unmount, // Función para desmontar el PDF
  print, // Función para enviar el PDF a impresión
} = useSmartPrint("identificador");
```

El objeto `config` es esencial para que `<PageRender />` funcione correctamente, ya que contiene:

- `contentRef`: Referencia al contenedor del contenido.
- `renderContent`: Estado booleano para determinar si se renderiza el contenido.
- `handleLoading`: Función para actualizar el estado de carga.
- `handleRenderContent`: Función para controlar cuándo renderizar el contenido.

---

### 🔷 Componentes Adicionales

Además del componente principal, la librería incluye otros componentes que facilitan la construcción y el estilizado del reporte:

- **`Typography`**: Para renderizar textos con estilos predefinidos (tamaño, peso, etc.).
- **`Paragraph`**: Para definir párrafos de texto con formato.
- **`Table`**: Para la creación de tablas.
- **`List`** y **`ListItem`**: Para listas ordenadas o desordenadas.
- **`PageBreak`**: Inserta un salto de página en el documento.
- **`BlankPage`**: Permite agregar páginas en blanco.
- **`Divider`**: Inserta una línea divisoria para separar secciones del reporte.

Estos componentes están diseñados para trabajar de forma integrada y ayudarte a construir reportes modulares y fácilmente personalizables.

---

<!--
## 🔥 Ejemplo Avanzado

Este ejemplo demuestra cómo combinar varios componentes y opciones para crear un reporte completo y personalizado:

```tsx

```

---
-->

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Para colaborar con el proyecto, sigue estos pasos:

1. **Fork del Repositorio:**  
   Realiza un fork del repositorio en GitHub.

2. **Crear una Rama Nueva:**

   ```sh
   git checkout -b feature/nueva-funcionalidad
   ```

3. **Realiza los Cambios y Haz Commit:**

   ```sh
   git commit -m "Añadir nueva funcionalidad"
   ```

4. **Sube los Cambios a tu Fork:**

   ```sh
   git push origin feature/nueva-funcionalidad
   ```

5. **Crea un Pull Request:**  
   Abre un Pull Request para que tus cambios sean revisados e integrados.

---

## 🛣️ Roadmap

- **Mayor Personalización:** Incluir más opciones para configurar el estilo de los componentes.
- **Nuevos Componentes:** Agregar componentes adicionales para mejorar la construcción del reporte.
- **Optimización de Rendimiento:** Mejorar la eficiencia en la generación y renderizado de PDFs.
- **Documentación Ampliada:** Incorporar más ejemplos y guías prácticas.

---

## 📝 Créditos

Este proyecto utiliza las siguientes librerías de terceros:

- [React](https://reactjs.org/) (Licencia MIT)
- [Lodash](https://lodash.com/) (Licencia MIT)
- [react-to-print](https://github.com/gregnb/react-to-print) (Licencia MIT)
- [html-react-parser](https://github.com/remarkablemark/html-react-parser) (Licencia MIT)

---

## 📜 Licencia

Este proyecto está bajo la [Licencia MIT](LICENSE). Consulta el archivo para más detalles.