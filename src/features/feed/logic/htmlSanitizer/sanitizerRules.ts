// prettier-ignore
export const ALLOWED_TAGS = new Set([
  'p', 'br', 'strong', 'b', 'em', 'i', 'u', 'q', 'font',
  'a', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'center',
  'img', 'iframe', 'video', 'audio',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'figure', 'figcaption', 'div',
  'small', 'hr', 'del', 'ins', 'mark', 'cite',
  'sub', 'sup', 'menu', 'dir',
  'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption',
  'details', 'summary'
])

// prettier-ignore
export const BLACKLISTED_TAGS = new Set([
  'script', 'style', 'noscript', 'template',
  'object', 'embed', 'base', 'link', 'meta',
  'form', 'input', 'button', 'select', 'textarea',
  'frameset', 'frame'
])

export const ALLOWED_ATTRIBUTES: Record<string, string[]> = {
  a: ['href'],
  img: ['src', 'srcset', 'alt', 'width', 'height', 'data-image-caption'],
  iframe: ['src', 'width', 'height'],
}

export const SELF_CLOSING_TAGS = new Set(['img', 'br', 'hr'])

export const YOUTUBE_EMBED_HOSTS = new Set(['www.youtube.com', 'youtube.com', 'www.youtube-nocookie.com', 'youtube-nocookie.com'])

export const YOUTUBE_EMBED_VIDEO_ID_REGEX = /^\/embed\/([\w-]{11})$/
