/**
 * Converts numeric values to a string with the "px" unit, or returns the original value if it's already a string.
 * @param dimension - The dimension value to be formatted. Can be a number (representing the value in pixels) or an already formatted string.
 * @returns A string representing the dimension value with the "px" unit if the value is numeric, or the original value if it's already a string.
 * @example convertToPx(15) //'15px'
 * convertToPx('10px') //'10px'
 */
export const convertToPx = (dimension: string | number) => {
  return typeof dimension === 'number' ? `${dimension}px` : dimension
}
