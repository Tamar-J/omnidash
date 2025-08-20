import { TextBody, TextTitle } from '@/components'

import { TextColorsKeyType } from '@/themes'

import { MarkdownBlockProps } from '../../types'

import { markdownToTextSegments, markdownToTextSegmentsProps } from '../../logic/markdownToTextSegments'

import { openLink } from '@/utils'

export type ListBlockProps = Required<Pick<MarkdownBlockProps, 'type' | 'text'>>

export function renderListBlock(block: ListBlockProps, key: string) {
  const segments = markdownToTextSegments(block.text || '')

  return (
    <TextBody key={key} textPreset="mediumRegular">
      {segments.map((segment, index) => renderTextSegment(segment, `list-${index}`))}
    </TextBody>
  )
}

export type HeadingBlockProps = Required<Pick<MarkdownBlockProps, 'type' | 'text' | 'level'>>

export function renderHeadingBlock(block: HeadingBlockProps, key: string) {
  const cleanMarkdownText = block.text.replace(/^#{1,3} /, '').replace(/\*\*(.*?)\*\*/g, '$1')

  const { text, link } = cleanMarkdownText.match(/^\[(?<text>.+?)\]\((?<link>.+?)\)$/)?.groups ?? {
    text: cleanMarkdownText,
    link: '',
  }
  const hasValidLink = link && !link.startsWith('#') && !link.startsWith('/')
  const textSegments = markdownToTextSegments(text)
    .map(({ text }) => text)
    .join('')

  const pressableProps = hasValidLink ? { onPress: () => openLink(link) } : {}

  return (
    <TextTitle
      key={key}
      textPreset="mediumBold"
      textAlign="left"
      color={link ? 'highlightSecondary' : 'primary'}
      textDecorationLine={link ? 'underline' : 'none'}
      {...pressableProps}
    >
      {textSegments}
    </TextTitle>
  )
}

export type ParagraphBlockProps = Required<Pick<MarkdownBlockProps, 'type' | 'text'>>

export function renderParagraphBlock(block: ParagraphBlockProps, key: string) {
  if (!block.text) return null

  const segments = markdownToTextSegments(block.text)

  return (
    <TextBody key={key} textPreset="mediumRegular">
      {segments.map((segment, i) => renderTextSegment(segment, `paragraph-${i}`))}
    </TextBody>
  )
}

export function renderTextSegment(segment: markdownToTextSegmentsProps, key: string, inheritColor?: TextColorsKeyType) {
  const { text, isTitle, isBold, isItalic, link } = segment
  const isBoldItalic = isBold && isItalic

  const textPreset =
    isBoldItalic ? 'mediumMediumItalic'
    : isBold ? 'mediumMedium'
    : isItalic ? 'mediumRegularItalic'
    : 'mediumRegular'

  if (link) {
    const linkedSegments = markdownToTextSegments(text)
    const hasValidLink = link && !link.startsWith('#') && !link.startsWith('/')
    const pressableProps = hasValidLink ? { onPress: () => openLink(link) } : {}

    return (
      <TextBody key={key} textPreset={textPreset} textDecorationLine="underline" color="highlightSecondary" {...pressableProps}>
        {linkedSegments.map((sub, subIndex) => renderTextSegment(sub, `${key}-sub-${subIndex}`, 'highlightSecondary'))}
      </TextBody>
    )
  }

  if (isTitle) {
    return (
      <TextTitle key={key} textPreset="smallMedium">
        {'\n'}
        {text}
      </TextTitle>
    )
  }

  return (
    <TextBody key={key} textPreset={textPreset} color={inheritColor}>
      {text}
    </TextBody>
  )
}
