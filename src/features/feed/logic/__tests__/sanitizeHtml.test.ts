import { BLACKLISTED_TAGS, sanitizeHtml } from '../htmlSanitizer'

describe('sanitizeHtml', () => {
  it('should remove inline style attributes', () => {
    expect(sanitizeHtml('<p style="color:red">Hello</p>')).toBe('<p>Hello</p>')
  })

  it('should remove event handler attributes', () => {
    expect(sanitizeHtml('<div onclick="doBad()">Click</div>')).toBe('<div>Click</div>')
  })

  it('should preserve href from <a> tags with https://', () => {
    const html = '<a href="https://safe.com" target="_blank">Go</a>'
    const safeHtml = '<a href="https://safe.com">Go</a>'

    expect(sanitizeHtml(html)).toBe(safeHtml)
  })

  it('should remove <a> links with javascript: and their content', () => {
    expect(sanitizeHtml('<p><a href="javascript:evil()">Bad</a></p>')).toBe('<p></p>')
  })

  it('should keep only HTTPS <img> sources and strip unsafe attributes', () => {
    const input = '<img src="https://good.com/pic.jpg" alt="ok" onerror="hack()" />'
    expect(sanitizeHtml(input)).toBe('<img src="https://good.com/pic.jpg" alt="ok">')
  })

  it('should remove <img> with non-HTTPS src', () => {
    expect(sanitizeHtml('<img src="http://bad.com/pic.png">')).toBe('')
  })

  it('should allow safe YouTube <iframe> embeds', () => {
    const src = 'https://www.youtube.com/embed/xyzjhgnjotw'
    expect(sanitizeHtml(`<iframe src="${src}"></iframe>`)).toBe(`<iframe src="${src}"></iframe>`)
  })

  it('should remove unsafe <iframe> embeds', () => {
    expect(sanitizeHtml('<iframe src="http://evil.com/embed"></iframe>')).toBe('')
  })

  it('should remove all blacklisted tags completely', () => {
    const selfClosingTags = new Set(['input', 'meta', 'base', 'link', 'embed', 'frame'])
    const tests = Array.from(BLACKLISTED_TAGS).map((tag) => {
      return selfClosingTags.has(tag) ? `<${tag} random-attr>` : `<${tag}>malicious content<script>alert("X")</script></${tag}>`
    })

    const combinedInput = tests.join('')

    const sanitized = sanitizeHtml(combinedInput)

    expect(sanitized).toBe('')
  })

  it('should remove <form>, <input>, <button> tags', () => {
    expect(sanitizeHtml('<form><input><button>Go</button></form>')).toBe('')
  })

  it('should sanitize table captions and remove unsafe children', () => {
    const raw = '<table><caption>Title <i onclick="bad()">here</i></caption></table>'
    expect(sanitizeHtml(raw)).toBe('<table><caption>Title <i>here</i></caption></table>')
  })

  it('should preserve <del>, <ins>, <sub>, <sup> tags and content', () => {
    const html = '<del>old</del><ins>new</ins><sub>a</sub><sup>b</sup>'
    expect(sanitizeHtml(html)).toBe(html)
  })

  it('should remove cite attribute from <blockquote> but keep text', () => {
    const raw = '<blockquote cite="url">Quote</blockquote>'
    expect(sanitizeHtml(raw)).toBe('<blockquote>Quote</blockquote>')
  })

  it('should preserve <pre><code> blocks and inline <code>', () => {
    const raw1 = '<pre><code>let x=1;</code></pre>'
    const raw2 = '<code>alert()</code>'
    expect(sanitizeHtml(raw1)).toBe(raw1)
    expect(sanitizeHtml(raw2)).toBe(raw2)
  })

  it('should preserve <video> with https and remove <audio> with http', () => {
    expect(sanitizeHtml('<video src="https://ok.com/v.mp4" controls></video>')).toBe('<video src="https://ok.com/v.mp4"></video>')
    expect(sanitizeHtml('<audio src="http://bad.com/a.mp3"></audio>')).toBe('')
  })

  it('should preserve <details>/<summary> structure', () => {
    const raw = '<details open><summary>More</summary><p>Info</p></details>'
    expect(sanitizeHtml(raw)).toBe('<details><summary>More</summary><p>Info</p></details>')
  })

  it('should remove class attributes from <div> and <span> but keep content', () => {
    const raw = '<div class="x"><span class="y">Text</span></div>'
    expect(sanitizeHtml(raw)).toBe('<div>Text</div>')
  })

  it('should keep <hr> tags', () => {
    expect(sanitizeHtml('<hr style="height:30px">')).toBe('<hr>')
  })

  it('sanitizes a complex HTML fragment correctly as a whole', () => {
    const complexInput = `
      <h1>Bem-vindo!</h1>
      <h2>Subtítulo com <mark>destaque</mark> e <small>nota pequena</small></h2>
      <p style="color: green;" onclick="stealCookies()">Paragraph with inline style and event</p>
      <p>Good link: <a href="https://exemplo.com" target="_blank" rel="noopener">click here</a></p>
      <p>Bad link: <a href="javascript:alert('XSS')">don't click</a></p>
      <script>alert('bad');</script>
      <table border="1" style="width:100%">
        <caption>Sheet <i onclick="bad()">secret</i></caption>
        <tbody>
          <tr><td>Item A</td><td>100</td></tr>
          <tr><td>Item B<script>alert(1)</script></td><td>200</td></tr>
        </tbody>
      </table>
      <img src="https://good.com/img.jpg" alt="Good" width="50" onerror="hack()" />
      <img src="http://bad.com/img.jpg" alt="Bad" />
      <iframe src="https://www.youtube.com/embed/abcdefgh123"></iframe>
      <iframe src="http://evil.com/embed"></iframe>
      <details><summary>More</summary><p>Details text</p></details>
      <div class="foo"><span style="font-weight:bold">Text</span></div>
      <hr>
    `

    const expectedOutput = `
      <h1>Bem-vindo!</h1>
      <h2>Subtítulo com <mark>destaque</mark> e <small>nota pequena</small></h2>
      <p>Paragraph with inline style and event</p>
      <p>Good link: <a href="https://exemplo.com">click here</a></p>
      <p>Bad link: </p>
      <table>
        <caption>Sheet <i>secret</i></caption>
        <tbody>
          <tr><td>Item A</td><td>100</td></tr>
          <tr><td>Item B</td><td>200</td></tr>
        </tbody>
      </table>
      <img src="https://good.com/img.jpg" alt="Good" width="50">
      <iframe src="https://www.youtube.com/embed/abcdefgh123"></iframe>
      <details><summary>More</summary><p>Details text</p></details>
      <div>Text</div>
      <hr>
    `
      .replace(/\s+/g, ' ')
      .trim()
    const result = sanitizeHtml(complexInput).replace(/\s+/g, ' ').trim()
    expect(result).toBe(expectedOutput)
  })
})
