import { Parser } from 'htmlparser2'

import { openTagHandlers } from './openTagHandlers'
import { closeTagHandlers } from './closeTagHandlers'

import { escapeMarkdownCharacters } from '@/features/feed/utils'

export type MarkdownConversionContext = {
  markdownParts: string[]
  isInsideParagraph: boolean
  isInsideLink: boolean
  isInsideTable: boolean
  linkStartIndex: number
  altImageTextForLink: string
  orderedListCounter: number
  openTagStack: string[]
  tableRows: string[][]
  currentTableRow: string[]
  currentTableCellTag: 'td' | 'th' | null
  tableCellContent: string
}

export function htmlToCustomMarkdown(htmlContent: string): string {
  const context: MarkdownConversionContext = {
    markdownParts: [],
    isInsideParagraph: false,
    isInsideLink: false,
    isInsideTable: false,
    linkStartIndex: -1,
    altImageTextForLink: '',
    orderedListCounter: 1,
    openTagStack: [],
    tableRows: [],
    currentTableRow: [],
    currentTableCellTag: null,
    tableCellContent: '',
  }

  const parser = new Parser(
    {
      onopentag: (tagName, attributes) => {
        openTagHandlers[tagName]?.(attributes, context)
      },
      ontext: (text) => {
        const escapedText = escapeMarkdownCharacters(text)
        if (context.isInsideTable && context.currentTableCellTag) {
          context.tableCellContent += escapedText
        } else {
          context.markdownParts.push(escapedText)
        }
      },
      onclosetag: (tagName) => {
        closeTagHandlers[tagName]?.(context)
      },
    },
    { decodeEntities: true }
  )

  parser.write(htmlContent)
  parser.end()

  return context.markdownParts.join('').replace(/\n{3,}/g, '\n\n')
}
