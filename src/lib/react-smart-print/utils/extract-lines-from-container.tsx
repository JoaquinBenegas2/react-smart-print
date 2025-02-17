import { LineFragment } from "@/models/text/line-fragmet";
import { splitTextNodeIntoLineFragments } from "@/utils/split-text-node-into-line-fragments";

/**
 * Extracts lines of text from a container by iterating over its text nodes.
 * It splits each text node into line fragments and groups fragments that belong to the same line
 * based on a vertical position tolerance of ±2 pixels.
 *
 * @param {Node} container - The container from which to extract lines of text.
 * @returns {LineFragment[]} An array of grouped lines, each containing its text content and vertical position (`top`).
 *
 * LineFragment:
 *   @property {string} text - The text content of the line.
 *   @property {number} top - The vertical position (`top` in pixels) of the line.
 */
export const extractLinesFromContainer = (container: Node): LineFragment[] => {
  // Create a TreeWalker to iterate over all text nodes in the container
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);
  const allFragments: LineFragment[] = [];

  // Traverse all text nodes in the container
  while (walker.nextNode()) {
    const currentNode = walker.currentNode;

    // Split the current text node into individual line fragments
    const fragments = splitTextNodeIntoLineFragments(currentNode);

    // Collect all fragments from the current node
    allFragments.push(...fragments);
  }

  // Group fragments into lines based on their vertical position (`top`)
  const groupedLines: LineFragment[] = [];
  allFragments.forEach((fragment) => {
    const lastGroup = groupedLines[groupedLines.length - 1];

    if (lastGroup && Math.abs(lastGroup.top - fragment.top) < 2) {
      // If the fragment belongs to the same line (within 2 pixels), append its text to the last group
      lastGroup.text += fragment.text;
    } else {
      // Otherwise, start a new group for this fragment
      groupedLines.push({ text: fragment.text, top: fragment.top });
    }
  });

  return groupedLines;
};
