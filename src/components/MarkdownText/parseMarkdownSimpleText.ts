/**
 * Parses a markdown-formatted string and returns an array of text parts
 * along with a flag indicating whether each part should be rendered as bold.
 *
 * Supports:
 * - Bold text: **text**
 * - Headings: ## Heading
 * - Bullet points: *
 * - Plain text: all other content
 *
 * @param markdownText - The markdown string to be parsed.
 * @returns An array of objects containing `text` and `isBold` properties
 *
 * @example
 * parseMarkdownSimpleText('## Title\n**Bold text**\n* Normal text');
 * // [
 * //   { text: "Title\n", isBold: true },
 * //   { text: "Bold text", isBold: true },
 * //   { text: "• ", isBold: false },
 * //   { text: "Normal text", isBold: false }
 * // ]
 */
export const parseMarkdownSimpleText = (markdownText: string) => {
  const regex = /(\*\*.*?\*\*|\* |#+ .*(?:\n|$))/g
  const parts = markdownText.split(regex).filter(Boolean)

  return parts.map((part) => {
    const isBold = part.startsWith('**') && part.endsWith('**')
    const isHeading = /^#+ /.test(part)
    const isBulletPoint = part === '* '

    if (isBold) return { text: part.slice(2, -2), isBold: true }

    if (isHeading) {
      const textWithoutHash = part.replace(/^#+ /, '')
      return { text: textWithoutHash, isBold: true }
    }

    if (isBulletPoint) return { text: '• ', isBold: false }

    return { text: part, isBold: false }
  })
}
