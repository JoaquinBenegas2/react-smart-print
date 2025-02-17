/**
 * Calculates the effective top margin for a given element within an array of elements.
 * If the previous valid element (ignoring page-breaks) has a larger bottom margin, the top margin is set to 0.
 * If the bottom margin is smaller, it is subtracted from the top margin to prevent margin collapse.
 *
 * @param {HTMLElement} element - The current element.
 * @param {HTMLElement[]} elements - The full array of elements.
 * @returns {number} The effective top margin in pixels.
 */
const getEffectiveMarginTop = (element: HTMLElement, elements: HTMLElement[]): number => {
  const computedStyle = window.getComputedStyle(element);
  let marginTop = parseInt(computedStyle.marginTop, 10) || 0;

  const index = elements.indexOf(element);

  if (index > 0) {
    // Find the previous valid element (ignoring elements with id containing "page-break")
    let prevIndex = index - 1;
    let prevElem = elements[prevIndex];

    while (prevElem && prevElem.id && prevElem.dataset.break && prevIndex > 0) {
      prevIndex--;
      prevElem = elements[prevIndex];
    }

    if (prevElem) {
      const prevComputedStyle = window.getComputedStyle(prevElem);
      const prevMarginBottom = parseInt(prevComputedStyle.marginBottom, 10) || 0;

      // Collapse the top margin if the previous element's bottom margin is larger or equal
      if (prevMarginBottom >= marginTop) {
        marginTop = 0;
      } else {
        // Subtract the previous element's bottom margin from the current top margin
        marginTop = marginTop - prevMarginBottom;
      }
    }
  }

  return marginTop;
};

/**
 * Calculates the total height of an HTML element, including its height and vertical margins,
 * adjusting the top margin based on the bottom margin of the previous element (ignoring elements
 * with id containing "page-break").
 *
 * @param {HTMLElement} element - The DOM element to measure.
 * @param {HTMLElement[]} elements - The full array of elements (e.g., the children of the container).
 * @returns {number} The total height in pixels.
 */
export const getElementTotalHeight = (element: HTMLElement, elements: HTMLElement[]): number => {
  // Get the element's height (excluding margins)
  const rect = element.getBoundingClientRect();
  const baseHeight = parseFloat(rect.height.toFixed(2)); // Rounded to 2 decimal places for precision

  const computedStyle = window.getComputedStyle(element);

  // Calculate the effective top margin, adjusted to avoid margin collapse
  const effectiveMarginTop = getEffectiveMarginTop(element, elements);

  const marginBottom = parseInt(computedStyle.marginBottom, 10) || 0;

  // Return the total height, including the element's height, effective top margin, and bottom margin
  return baseHeight + effectiveMarginTop + marginBottom;
};
