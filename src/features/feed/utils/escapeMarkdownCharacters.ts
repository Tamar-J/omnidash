export const escapeMarkdownCharacters = (text: string) => {
  if (!text) return ''

  const escapedText = text.replace(/([*_])/g, '\\$1')
  return escapedText
}
