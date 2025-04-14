import { memo } from 'react'

import { parseMarkdown } from './parseMarkdown'

import { TextBody } from '../Text/textStyles'

type MarkdownTextProps = {
  textToNormalize: string
}

export const MarkdownText = memo(({ textToNormalize }: MarkdownTextProps) => {
  if (!textToNormalize) return null

  const parsedText = parseMarkdown(textToNormalize)

  return (
    <TextBody textPreset="mediumRegular">
      {parsedText.map(({ text, isBold }, index) =>
        isBold ?
          <TextBody textPreset="mediumMedium" key={`bold-${index}`}>
            {text}
          </TextBody>
        : text
      )}
    </TextBody>
  )
})

MarkdownText.displayName = 'MarkdownText'
