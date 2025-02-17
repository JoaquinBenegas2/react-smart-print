import { PageElement } from "@/models/page-content/page";
import { getElementTotalHeight } from "@/utils/get-element-total-height";

/**
 * Paginates the content by iterating over elements and grouping them into pages based on the maximum allowed height.
 *
 * @param {HTMLElement[]} elements - List of HTML elements to paginate.
 * @param {number} maxHeight - Maximum available height for content on each page.
 * @returns {PageElement[][]} An array of pages, where each page is an array of PageElements.
 */
export const paginateContent = (
  elements: HTMLElement[],
  maxHeight: number,
  paragraphSpacing: number
): PageElement[][] => {
  const pages: PageElement[][] = [];
  let currentPage: PageElement[] = [];
  let currentHeight = 0;

  elements.forEach((element, index) => {
    // If the element has the data-break attribute, force a page break.
    if (element.dataset.break === "true") {
      if (currentPage.length > 0) {
        pages.push(currentPage);
        currentPage = [];
        currentHeight = 0;
      }
      // The page-break element is not included in the content.
      return;
    }

    // Ignore elements with id "rsp-ignore-element".
    if (element.id === "rsp-ignore-element") return;

    if (element.id === "rsp-blank-page") {
      if (currentPage.length > 0) {
        pages.push(currentPage);
      }

      pages.push([{ id: index, content: element.outerHTML }]);
      currentPage = [];
      currentHeight = 0;

      return;
    }

    // Si el elemento es una lista (id="rsp-list"), procesamos sus hijos (los li) individualmente.
    if (element.id === "rsp-list") {
      const listItems = Array.from(element.children) as HTMLElement[];
      for (let j = 0; j < listItems.length; j++) {
        const listItem = listItems[j];

        // Si el li tiene la clase "rsp-add-p-spacing", ajustamos su padding.
        if (listItem.classList.contains("rsp-add-p-spacing")) {
          let paddingBottomToAdd = paragraphSpacing;
          let nextItem = listItems[j + 1];

          // Se salta aquellos que tengan id "rsp-ignore-element".
          while (nextItem && nextItem.id === "rsp-ignore-element") {
            j++;
            nextItem = listItems[j + 1];
          }

          // Si el siguiente li es del mismo tipo, se reduce el espaciado.
          if (nextItem && nextItem.id === listItem.id) {
            paddingBottomToAdd = paragraphSpacing / 2;
          }
          listItem.style.paddingBottom = paddingBottomToAdd + "px";
        }

        const itemHeight = getElementTotalHeight(listItem, listItems);
        if (currentHeight + itemHeight > maxHeight) {
          if (currentPage.length > 0) {
            pages.push(currentPage);
            currentPage = [];
            currentHeight = 0;
          }
        }

        // Se agrega solo el li (su outerHTML) en lugar de toda la lista.
        currentPage.push({ id: index, content: listItem.outerHTML });
        currentHeight += itemHeight;
      }
      // Finalizada la lista, pasamos al siguiente elemento.
      return;
    }

    // Add padding to the bottom of the element if it has the class "rsp-add-p-spacing".
    if (element.classList.contains("rsp-add-p-spacing")) {
      let paddingBottomToAdd = paragraphSpacing;

      let nextElement = elements[index + 1];

      // Busca el próximo elemento que no tenga el id "rsp-ignore-element".
      while (nextElement && nextElement.id === "rsp-ignore-element") {
        index++; // Avanza al siguiente elemento.
        nextElement = elements[index + 1];
      }

      // If the next element is of the same type, add less padding.
      if (nextElement && nextElement.id === element.id) {
        paddingBottomToAdd = paragraphSpacing / 2;
      }

      element.style.paddingBottom = paddingBottomToAdd + "px";
    }

    const elementHeight = getElementTotalHeight(element, elements);

    // If the next element exceeds the available height, start a new page.
    if (currentHeight + elementHeight > maxHeight) {
      if (currentPage.length > 0) {
        pages.push(currentPage);
        currentPage = [];
        currentHeight = 0;
      }
    }

    currentPage.push({ id: index, content: element.outerHTML });
    currentHeight += elementHeight;
  });

  // Add the last page if it has content.
  if (currentPage.length > 0) {
    pages.push(currentPage);
  }

  return pages;
};
