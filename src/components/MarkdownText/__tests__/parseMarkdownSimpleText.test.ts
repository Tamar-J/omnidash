import { parseMarkdownSimpleText } from '../parseMarkdownSimpleText'

describe('parseMarkdownSimpleText', () => {
  it('should parse bold text correctly', () => {
    const markdownText = parseMarkdownSimpleText('This is **bold** text')
    expect(markdownText).toEqual([
      { text: 'This is ', isBold: false },
      { text: 'bold', isBold: true },
      { text: ' text', isBold: false },
    ])
  })

  it('should parse headings as bold', () => {
    const heading1 = parseMarkdownSimpleText('# Title1')
    const heading2 = parseMarkdownSimpleText('## Title2\n')
    const heading3 = parseMarkdownSimpleText('### Title3')

    expect(heading1).toEqual([{ text: 'Title1', isBold: true }])
    expect(heading2).toEqual([{ text: 'Title2\n', isBold: true }])
    expect(heading3).toEqual([{ text: 'Title3', isBold: true }])
  })

  it('should parse bullet point', () => {
    const bulletPoint = parseMarkdownSimpleText('* ')
    expect(bulletPoint).toEqual([{ text: '• ', isBold: false }])
  })

  it('should handle mixed markdown', () => {
    const mixedMarkdownText = parseMarkdownSimpleText('## Title\nSome **bold** text\n* ')
    expect(mixedMarkdownText).toEqual([
      { text: 'Title\n', isBold: true },
      { text: 'Some ', isBold: false },
      { text: 'bold', isBold: true },
      { text: ' text\n', isBold: false },
      { text: '• ', isBold: false },
    ])
  })
})
