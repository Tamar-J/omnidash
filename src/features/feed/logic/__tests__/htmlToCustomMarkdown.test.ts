import { htmlToCustomMarkdown } from '../htmlToCustomMarkdown/htmlToCustomMarkdown'

describe('htmlToCustomMarkdown', () => {
  it('should return empty string for empty input', () => {
    expect(htmlToCustomMarkdown('')).toBe('')
  })

  it('should convert headings h1, h2, h3 correctly', () => {
    const h1 = htmlToCustomMarkdown('<h1>Main Title</h1>')
    expect(h1).toContain('# Main Title')
    const h2 = htmlToCustomMarkdown('<h2>Subtitle</h2>')
    expect(h2).toContain('## Subtitle')
    const h3 = htmlToCustomMarkdown('<h3>Subsubtitle</h3>')
    expect(h3).toContain('### Subsubtitle')
  })

  it('should convert a paragraph to normal text', () => {
    const input = '<p>This is a paragraph.</p>'
    const output = htmlToCustomMarkdown(input)

    expect(output.trim()).toBe('This is a paragraph.')
  })

  it('should convert <strong> / <b> and <em> / <i> inside text', () => {
    const input = '<p>Some <strong>bold</strong> and <b>also bold</b>, plus <em>italic</em> and <i>also italic</i>.</p>'
    const output = htmlToCustomMarkdown(input)
    expect(output).toContain('**bold**')
    expect(output).toContain('**also bold**')
    expect(output).toContain('_italic_')
    expect(output).toContain('_also italic_')
  })

  it('should convert <br> to newline', () => {
    const input = 'Line1<br>Line2<br/>Line3'
    const output = htmlToCustomMarkdown(input)

    expect(output).toContain('Line1\nLine2')
    expect(output).toContain('Line2\nLine3')
  })

  it('should convert a text link with text content', () => {
    const input = '<a href="https://example.com">Click here</a>'
    const output = htmlToCustomMarkdown(input)

    expect(output).toContain('[Click here](https://example.com)')
  })

  it('should convert a link without inner text (empty) to [href](href)', () => {
    const input = '<a href="https://example.com"></a>'
    const output = htmlToCustomMarkdown(input).trim()

    expect(output).toBe('[https://example.com](https://example.com)')
  })

  it('should convert an image alone (no <a>) picking fallback src if no srcset', () => {
    // width=0, height=0 => invalid dimensions => aspect ratio fallback 1.78
    const input = '<img src="fallback.jpg" alt="AltText" width="0" height="0">'
    const output = htmlToCustomMarkdown(input)
    expect(output).toMatch(/<!-- image:aspectRatio=1.78 -->/)
    expect(output).toContain('![AltText](fallback.jpg)')
  })

  it('should convert an image with srcset picking the smallest >=600w or fallback to largest', () => {
    const input = `<img src="fallback.jpg" srcset="https://small.jpg 400w, https://medium.jpg 600w, https://large.jpg 800w" alt="ImgAlt" width="800" height="400">`
    const output = htmlToCustomMarkdown(input)

    expect(output).toMatch(/<!-- image:aspectRatio=2.00 -->/) //  800 / 400 = 2.00
    expect(output).toContain('![ImgAlt](https://medium.jpg)')
  })

  it('should extract caption from data-image-caption with HTML entities and tags', () => {
    const input = `<img src="img.jpg" alt="Alt" width="800" height="600" data-image-caption="&lt;strong&gt;Caption &amp; More&lt;/strong&gt;">`
    const output = htmlToCustomMarkdown(input)

    expect(output).toContain('Caption & More')
  })

  it('should convert an image inside a link: push markdown image first, then wrap in [alt](href)', () => {
    const input = `<a href="https://target.com"><img src="image.jpg" alt="MyImage" width="800" height="600"/></a>`
    const output = htmlToCustomMarkdown(input)

    expect(output).toMatch('<!-- image:aspectRatio=1.33 -->\n![MyImage](image.jpg)[MyImage](https://target.com)')
  })

  it('should convert unordered list <ul><li> items', () => {
    const input = '<ul><li>Item A</li><li>Item B</li></ul>'
    const output = htmlToCustomMarkdown(input)
    expect(output).toContain('* Item A')
    expect(output).toContain('* Item B')
  })

  it('should convert ordered list <ol><li> items with numbering reset per list', () => {
    const input = '<ol><li>First</li><li>Second</li></ol>'
    const output = htmlToCustomMarkdown(input)
    expect(output).toContain('1. First')
    expect(output).toContain('2. Second')
  })

  it('should convert nested lists appropriately', () => {
    const input = `
      <ul>
        <li>Parent
          <ol>
            <li>Child1</li>
            <li>Child2</li>
          </ol>
        </li>
        <li>Another Parent</li>
      </ul>`
    const output = htmlToCustomMarkdown(input)

    expect(output).toContain('* Parent')
    expect(output).toContain('* Another Parent')

    expect(output).toContain('1. Child1')
    expect(output).toContain('2. Child2')
  })

  it('should convert a simple table with headers and rows', () => {
    const html = `<table>
      <tr><th>H1</th><th>H2</th></tr>
      <tr><td>R1C1</td><td>R1C2</td></tr>
      <tr><td>R2C1</td><td>R2C2</td></tr>
    </table>`
    const output = htmlToCustomMarkdown(html)

    expect(output).toMatch(/\| *H1 *\| *H2 *\|\s*\|\s*–+/)

    expect(output).toContain('| R1C1 | R1C2 |')
    expect(output).toContain('| R2C1 | R2C2 |')
  })

  it('should convert iframe with YouTube src to markdown image thumbnail and comment', () => {
    const input = '<iframe src="https://www.youtube.com/embed/xyzio789213"></iframe>' // id always has 11 caracteres on YouTube
    const output = htmlToCustomMarkdown(input)

    expect(output).toContain('<!-- video: https://www.youtube.com/embed/xyzio789213 -->')
    expect(output).toContain('![Video](https://img.youtube.com/vi/xyzio789213/hqdefault.jpg)')
  })

  it('should ignore iframe with non-YouTube src (no crash, no video comment)', () => {
    const input = '<iframe src="https://example.com/xyzio789213"></iframe>'
    const output = htmlToCustomMarkdown(input)

    expect(output).not.toContain('<!-- video:')
    expect(output).not.toContain('img.youtube.com')
  })

  it('should handle mixed content with div, p, headings, links, lists etc.', () => {
    const input = `
      <div>
        <h2>Test Section</h2>
        <p>Intro with <strong>bold</strong> and a <a href="https://link.test">link</a>.</p>
        <ul><li>ListItem</li></ul>
        <p>End paragraph.</p>
      </div>
    `
    const output = htmlToCustomMarkdown(input)
    expect(output).toContain('## Test Section')
    expect(output).toContain('**bold**')
    expect(output).toContain('[link](https://link.test)')
    expect(output).toContain('* ListItem')
    expect(output).toContain('End paragraph.')
  })

  it('should handle complex and mixed content', () => {
    const input = `
      <p>
        <h2><a href="https://exemple.test"><strong>Test Section</strong></a></h2>
        <div>Paragraph with <strong>bold text</strong> and <em><a href="https://link.test">italic link</a>.</em></div>
        <ul><li><em><strong>ListItem</strong></em></li><li><a href="https://site.test">site</a></li></ul>
        <p>End <br>paragraph.</p>
      </p>
    `
    const output = htmlToCustomMarkdown(input)
    expect(output).toContain('## [**Test Section**](https://exemple.test)')
    expect(output).toContain('Paragraph with **bold text** and _[italic link](https://link.test)._')
    expect(output).toContain('* _**ListItem**_')
    expect(output).toContain('* [site](https://site.test)')
    expect(output).toContain('End \nparagraph.')
  })
})
