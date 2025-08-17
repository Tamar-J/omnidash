/**
 * Cleans an image URL by removing query strings and hash fragments,
 * and filters out URLs that end with disallowed file extensions.
 * @param urlString - The input URL string to clean.
 * @returns The cleaned URL containing only the origin and pathname,
 * or null if the URL is invalid or has a disallowed extension.
 *
 * @example
 * ```ts
 * cleanImageUrl('https://example.com/image.jpg?size=large') // 'https://example.com/image.jpg'
 * cleanImageUrl('https://example.com/script.js') // null
 * cleanImageUrl('invalid-url') // null
 * ```
 */
export const cleanImageUrl = (urlString: string) => {
  try {
    const url = new URL(urlString)
    const pathname = url.pathname.toLowerCase()

    const disallowedExtensions = ['.php', '.asp', '.aspx', '.cgi', '.jsp', '.html', '.htm', '.js']

    if (disallowedExtensions.some((ext) => pathname.endsWith(ext))) {
      return null
    }
    const newUrl = url.origin + url.pathname

    return newUrl
  } catch {
    return null
  }
}
