import { parseDocument } from 'htmlparser2'
import { isTag, isText, Node } from 'domhandler'

import { ALLOWED_TAGS, BLACKLISTED_TAGS, SELF_CLOSING_TAGS } from './sanitizerRules'
import {
  decodeHtmlAttribute,
  escapeHtmlText,
  getNodeText,
  isHttpsUrl,
  isSafeYouTubeEmbed,
  isValidLink,
  serializeAttrs,
  serializeMediaTag,
} from './htmlHelpers'

import { cleanImageUrl } from '@/utils'

const tagSanitizers: Record<string, (attribs: Record<string, string>) => boolean | string> = {
  a: (attribs) => {
    const href = decodeHtmlAttribute(attribs?.href || '')
    return isValidLink(href)
  },
  img: (attribs) => {
    const src = decodeHtmlAttribute(attribs?.src || '')
    const isValidSrc = Boolean(cleanImageUrl(src))
    return isValidSrc && isHttpsUrl(src)
  },
  iframe: (attribs) => {
    const src = decodeHtmlAttribute(attribs?.src || '')
    return isSafeYouTubeEmbed(src)
  },
  audio: (attribs) => {
    const src = decodeHtmlAttribute(attribs?.src || '')
    if (!isHttpsUrl(src)) return false
    return serializeMediaTag('audio', src)
  },
  video: (attribs) => {
    const src = decodeHtmlAttribute(attribs?.src || '')
    if (!isHttpsUrl(src)) return false
    return serializeMediaTag('video', src)
  },
}

function sanitizeAndSerializeNode(node: Node): string {
  if (isText(node)) return escapeHtmlText(node.data)
  if (!isTag(node)) return ''

  const tag = (node.name || '').toLowerCase()

  if (BLACKLISTED_TAGS.has(tag)) return ''
  if (!ALLOWED_TAGS.has(tag)) return escapeHtmlText(getNodeText(node))

  const applySanitizer = tagSanitizers[tag]
  if (applySanitizer) {
    const sanitizedOutput = applySanitizer(node.attribs ?? {})
    const tagShouldBeRemoved = sanitizedOutput === false
    const tagWasModified = typeof sanitizedOutput === 'string'

    if (tagShouldBeRemoved) return ''
    if (tagWasModified) return sanitizedOutput
  }

  const attrs = tag === 'div' ? '' : serializeAttrs(node.attribs, tag)

  const childrenStr = Array.isArray(node.children) ? node.children.map(sanitizeAndSerializeNode).join('') : ''

  const isSelfClosing = SELF_CLOSING_TAGS.has(tag)

  return isSelfClosing ? `<${tag}${attrs}>` : `<${tag}${attrs}>${childrenStr}</${tag}>`
}

export function sanitizeHtml(html: string): string {
  const dom = parseDocument(html)

  return dom.children.map(sanitizeAndSerializeNode).join('')
}
