/**
 * Calculates a responsive font size based on the given size and page width.
 *
 * @param {number} size - The original font size to scale.
 * @param {number} pageWidth - The width of the page to use for scaling.
 * @returns {number} The scaled font size adjusted to the page width.
 */
export const calculateResponsiveFontSize = (size: number, pageWidth: number): number => {
  const baseSize = 11; // Reference base font size.
  return (size / baseSize) * (pageWidth / 80); // Approximate scaling based on page width.
};