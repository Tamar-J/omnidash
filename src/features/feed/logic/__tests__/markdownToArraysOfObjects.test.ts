import { convertMarkdownBlock } from '../markdownToArraysOfObjects'

describe('convertMarkdownBlock', () => {
  it('should decode HTML entities', () => {
    const input = '&lt;div&gt;Test &amp; stuff &quot;here&quot;&apos;&#33;&nbsp;done&lt;/div&gt;'
    const output = convertMarkdownBlock(input)
    expect(output).toEqual({ type: 'paragraph', text: '<div>Test & stuff "here\"\'! done</div>' })
  })

  it('should detect level of the heading', () => {
    const head1 = '# Heading One'
    const head2 = '## Heading One'
    const head3 = '### Heading One'

    const headLevel1 = convertMarkdownBlock(head1)
    const headLevel2 = convertMarkdownBlock(head2)
    const headLevel3 = convertMarkdownBlock(head3)

    expect(headLevel1).toEqual({ type: 'heading', level: 1, text: '# Heading One' })
    expect(headLevel2).toEqual({ type: 'heading', level: 2, text: '## Heading One' })
    expect(headLevel3).toEqual({ type: 'heading', level: 3, text: '### Heading One' })
  })

  it('should detect list item starting with *', () => {
    const input = '* Item in a list'
    const output = convertMarkdownBlock(input)
    expect(output).toEqual({ type: 'list', text: '* Item in a list' })
  })

  it('should detect image block with alt text and caption', () => {
    const input = '<!-- image:aspectRatio=1.78 -->\n![Alt text](https://image.com/pic.jpg)Image Caption here'.trim()

    const output = convertMarkdownBlock(input)
    expect(output).toEqual({
      type: 'image',
      aspectRatio: 1.78,
      src: 'https://image.com/pic.jpg',
      alt: 'Alt text',
      caption: 'Image Caption here',
      text: '',
    })
  })

  it('should detect video block and extract metadata and videoId', () => {
    const input =
      '<!-- video: https://www.youtube.com/embed/abcde-12345 -->\n![Video](https://img.youtube.com/vi/abcde-12345/hqdefault.jpg)'.trim()

    const output = convertMarkdownBlock(input)
    expect(output).toEqual({
      type: 'video',
      src: 'https://img.youtube.com/vi/abcde-12345/hqdefault.jpg',
      alt: 'Video',
      link: 'https://youtu.be/abcde-12345',
      text: '',
    })
  })

  it('should detect video block with no videoId', () => {
    const input = '<!-- video: https://some.other.site/video.mp4 -->\n![Video](https://some.other.site/thumbnail.jpg)'.trim()

    const output = convertMarkdownBlock(input)
    expect(output).toEqual({
      type: 'video',
      src: 'https://some.other.site/thumbnail.jpg',
      alt: 'Video',
      link: '', //do not support other types of videos yet
      text: '',
    })
  })

  it('should fallback to paragraph if no other match', () => {
    const input = 'This is a plain paragraph.'
    const output = convertMarkdownBlock(input)
    expect(output).toEqual({ type: 'paragraph', text: 'This is a plain paragraph.' })
  })

  it('should return paragraph type for empty string or whitespace string', () => {
    const whitespaces = convertMarkdownBlock('     ')
    const emptyString = convertMarkdownBlock('')

    expect(whitespaces).toEqual({ type: 'paragraph', text: '' })
    expect(emptyString).toEqual({ type: 'paragraph', text: '' })
  })
})
