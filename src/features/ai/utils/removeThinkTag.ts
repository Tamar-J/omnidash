/**
 * Removes the <think> tag and its contents from a text string.
 * @param text - The input string that may contain a <think> tag.
 * @returns The cleaned string without the <think> tag and its content.
 *
 * @example
 * removeThinkTag("Result: <think>internal reasoning</think> Final summary.") //"Result: Final summary."
 */
export const removeThinkTag = (text: string) => {
  return text.replace(/<think>[\s\S]*?<\/think>/, '').trim()
}
