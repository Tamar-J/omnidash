import { ALLOWED_ATTRIBUTES, YOUTUBE_EMBED_HOSTS, YOUTUBE_EMBED_VIDEO_ID_REGEX } from './sanitizerRules'
import { isTag, isText, Node } from 'domhandler'

export function escapeHtmlText(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;')
}

export function decodeHtmlAttribute(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#(\d+);/g, (_, charcode) => String.fromCharCode(parseInt(charcode, 10)))
    .replace(/&nbsp;/g, ' ')
}

export function isHttpsUrl(value: string) {
  if (typeof value !== 'string') return false
  try {
    const url = new URL(value)
    return url.protocol === 'https:'
  } catch {
    return false
  }
}

export function isValidLink(value: string) {
  return isHttpsUrl(value) || value.startsWith('#') || value.startsWith('/')
}

export function validateSrcset(value: string) {
  if (typeof value !== 'string') return false

  return value.split(',').every((entry) => {
    const part = entry.trim()
    if (!part) return false
    const [url] = part.split(/\s+/)
    return isHttpsUrl(url)
  })
}

export function getNodeText(node: Node): string {
  if (isText(node)) return node.data
  return isTag(node) && Array.isArray(node.children) ? node.children.map(getNodeText).join('') : ''
}

export function isInvalidAttribute(name: string, value: string, allowed: string[]) {
  const isDangerous = name.startsWith('on') || name === 'style'
  const isNotAllowed = !allowed.includes(name)
  const isHrefOrSrc = name === 'href' || name === 'src'
  const isInvalidHrefOrSrc = isHrefOrSrc && !isValidLink(value)
  const isInvalidSrcset = name === 'srcset' && !validateSrcset(value)

  return isDangerous || isNotAllowed || isInvalidHrefOrSrc || isInvalidSrcset
}

export function serializeAttrs(attribs: Record<string, string> | undefined, tag: string): string {
  if (!attribs) return ''

  const allowedAttrs = ALLOWED_ATTRIBUTES[tag] || []

  const serializedParts = Object.entries(attribs)
    .map(([rawKey, rawValue]) => {
      const attrName = rawKey.toLowerCase()
      const trimmedValue = rawValue.trim()
      const decodedValue = decodeHtmlAttribute(trimmedValue)

      if (isInvalidAttribute(attrName, decodedValue, allowedAttrs)) return null

      const escapedValue = escapeHtmlText(decodedValue).replace(/"/g, '&quot;')
      return `${attrName}="${escapedValue}"`
    })
    .filter((part): part is string => part !== null)

  return serializedParts.length ? ' ' + serializedParts.join(' ') : ''
}

export function serializeMediaTag(tag: 'audio' | 'video', src: string): string {
  const escaped = escapeHtmlText(src).replace(/"/g, '&quot;')
  return `<${tag} src="${escaped}"></${tag}>`
}

export function isSafeYouTubeEmbed(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && YOUTUBE_EMBED_HOSTS.has(url.hostname) && YOUTUBE_EMBED_VIDEO_ID_REGEX.test(url.pathname)
  } catch {
    return false
  }
}
