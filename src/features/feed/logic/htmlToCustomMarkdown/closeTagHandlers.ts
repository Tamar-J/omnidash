import { MarkdownConversionContext } from './htmlToCustomMarkdown'

function generateMarkdownTable(tableRows: string[][]): string {
  if (!tableRows || tableRows.length === 0) return ''

  const numberOfColumns = Math.max(...tableRows.map((row) => row.length))

  const columnWidths = Array(numberOfColumns).fill(0)
  for (const row of tableRows) {
    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      const cellContent = row[columnIndex] ?? ''
      columnWidths[columnIndex] = Math.max(columnWidths[columnIndex], cellContent.length)
    }
  }

  const padCell = (cellText: string, columnIndex: number): string => {
    return (cellText ?? '').padEnd(columnWidths[columnIndex], ' ')
  }

  const [headerRow, ...dataRows] = tableRows
  const headerLine = '| ' + headerRow.map((cellText, index) => padCell(cellText, index)).join(' | ') + ' |'

  const headerSeparatorLine = '| ' + columnWidths.map((width) => '–'.repeat(width)).join(' | ') + ' |'

  const bodyLines = dataRows.map((row) => {
    const rowLine =
      '| ' + Array.from({ length: numberOfColumns }, (_, index) => padCell(row[index] ?? '', index)).join(' | ') + ' |'

    return rowLine
  })

  return [headerLine, headerSeparatorLine, ...bodyLines].join('\n')
}

export const closeTagHandlers: Record<string, (context: MarkdownConversionContext) => void> = {
  a: (context) => {
    const href = context.openTagStack.pop() || '#'
    const linkContent = context.markdownParts.splice(context.linkStartIndex)
    const linkText = linkContent.join('').replace(/\s\s+/g, ' ') || context.altImageTextForLink || href
    context.markdownParts.push(`[${linkText}](${href})`)
    context.isInsideLink = false
    context.linkStartIndex = -1
    context.altImageTextForLink = ''
  },

  h1: (context) => context.markdownParts.push('\n\n'),
  h2: (context) => context.markdownParts.push('\n\n'),
  h3: (context) => context.markdownParts.push('\n\n'),

  td: (context) => {
    context.currentTableRow.push(context.tableCellContent.trim())
    context.currentTableCellTag = null
    context.tableCellContent = ''
  },
  th: (context) => {
    context.currentTableRow.push(context.tableCellContent.trim())
    context.currentTableCellTag = null
    context.tableCellContent = ''
  },
  tr: (context) => {
    context.tableRows.push(context.currentTableRow)
    context.currentTableRow = []
  },
  table: (context) => {
    context.isInsideTable = false
    if (context.tableRows.length > 0) {
      context.markdownParts.push('\n\n' + generateMarkdownTable(context.tableRows) + '\n\n')
    }
    context.tableRows = []
  },
  ul: (context) => {
    context.openTagStack.pop()
    context.orderedListCounter = 1
    context.markdownParts.push('\n')
  },
  ol: (context) => {
    context.openTagStack.pop()
    context.orderedListCounter = 1
    context.markdownParts.push('\n')
  },
  li: (context) => context.markdownParts.push('\n'),

  strong: (context) => context.markdownParts.push('**'),
  b: (context) => context.markdownParts.push('**'),
  em: (context) => context.markdownParts.push('_'),
  i: (context) => context.markdownParts.push('_'),

  p: (context) => {
    context.isInsideParagraph = false
  },
}
