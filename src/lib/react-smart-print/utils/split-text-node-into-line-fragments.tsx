import { LineFragment } from "@/models/text/line-fragmet";

/**
 * Splits a text node into fragments that fit within a single line.
 * Uses binary search to determine the largest substring that fits on a single line.
 *
 * @param {Node} textNode - The text node to split.
 * @returns {LineFragment[]} An array of line fragments with their text and vertical position.
 */
export const splitTextNodeIntoLineFragments = (textNode: Node): LineFragment[] => {
  const fragments: LineFragment[] = [];
  const text = textNode.textContent || "";
  let start = 0;

  while (start < text.length) {
    let low = start;
    let high = text.length;
    let lastValid = start;
    let baseTop: number | null = null;

    // Binary search to determine the largest substring that fits in a single line.
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const range = document.createRange();
      range.setStart(textNode, start);
      range.setEnd(textNode, mid);
      const rects = Array.from(range.getClientRects());

      // If no rectangles are obtained, reduce the substring.
      if (rects.length === 0) {
        high = mid - 1;
        continue;
      }

      // Round the top coordinate to tolerate small variations.
      const currentTop = Math.round(rects[0].top);
      const isSingleLine = rects.every((rect) => Math.round(rect.top) === currentTop);

      if (isSingleLine) {
        lastValid = mid;
        baseTop = currentTop;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    // Avoid infinite loops in extreme cases.
    if (lastValid === start) {
      lastValid = start + 1;
    }

    fragments.push({ text: text.substring(start, lastValid), top: baseTop! });
    start = lastValid;
  }

  return fragments;
};
