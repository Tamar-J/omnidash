import { memo } from 'react'

import { parseMarkdownSimpleText } from './parseMarkdownSimpleText'

import { TextBody } from '../Text/textStyles'

type MarkdownSimpleTextProps = {
  textToNormalize: string
}

export const MarkdownSimpleText = memo(({ textToNormalize }: MarkdownSimpleTextProps) => {
  if (!textToNormalize) return null

  const parsedText = parseMarkdownSimpleText(textToNormalize)

  return (
    <TextBody textPreset="mediumRegular">
      {parsedText.map(({ text, isBold }, index) =>
        isBold ?
          <TextBody textPreset="mediumMedium" key={`markdown-simple-text-bold-${index}`}>
            {text}
          </TextBody>
        : text
      )}
    </TextBody>
  )
})

MarkdownSimpleText.displayName = 'MarkdownSimpleText'
