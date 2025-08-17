import { cleanImageUrl } from '../cleanImageUrl'

describe('cleanImageUrl', () => {
  it('returns cleaned URL when valid and without disallowed extension', () => {
    const result = cleanImageUrl('https://example.com/image.jpg?size=large')
    expect(result).toBe('https://example.com/image.jpg')
  })

  it('removes query parameters and returns only origin + pathname', () => {
    const result = cleanImageUrl('https://site.org/img/banner.webp?id=1382')
    expect(result).toBe('https://site.org/img/banner.webp')
  })

  it('returns null for disallowed extensions', () => {
    const result = cleanImageUrl('https://example.com/script.php?id=123')
    expect(result).toBeNull()
  })

  it('returns null for an invalid URL string', () => {
    const result = cleanImageUrl('notaurl')
    expect(result).toBeNull()
  })

  it('treats uppercase disallowed extensions as invalid', () => {
    const result = cleanImageUrl('https://test.com/test.ASPX')
    expect(result).toBeNull()
  })
})
