import { Box, SafeImage, TextLabel } from '@/components'

import { MarkdownBlockProps } from '../../types'
import { markdownToTextSegments } from '../../logic/markdownToTextSegments'

import { openLink } from '@/utils'

export type VideoBlockProps = Required<Pick<MarkdownBlockProps, 'type' | 'src' | 'alt' | 'link' | 'text'>>

export function renderVideoBlock(block: VideoBlockProps, key: string) {
  return (
    <Box key={key} maxWidth={650} gap="s4">
      <SafeImage uri={block.src} style={{ width: '100%', aspectRatio: 16 / 9 }} />
      <TextLabel textPreset="smallMediumItalic" color="highlightSecondary" onPress={() => openLink(block.link)}>
        Ver no YouTube ↗
      </TextLabel>
    </Box>
  )
}

export type ImageBlockProps = Required<Pick<MarkdownBlockProps, 'type' | 'aspectRatio' | 'src' | 'alt' | 'caption' | 'text'>>

export function renderImageBlock(block: ImageBlockProps, key: string) {
  const aspectRatio = getAspectRatioFromBlockSrc(block.src, block.aspectRatio)
  const captionSegments = markdownToTextSegments(block.caption || '')
  const hasCaption = captionSegments.length > 0

  return (
    <Box key={key} maxWidth={650} gap="s4">
      <SafeImage uri={block.src} style={{ width: '100%', aspectRatio }} />
      {hasCaption && (
        <TextLabel textPreset="smallMediumItalic" alignSelf="center">
          {captionSegments.map((segment, index) =>
            segment.link ?
              <TextLabel
                key={`caption-link-${index}`}
                textPreset="smallMediumItalic"
                color="highlightSecondary"
                onPress={() => openLink(segment.link!)}
              >
                {segment.text} {'↗ '}
              </TextLabel>
            : segment.text
          )}
        </TextLabel>
      )}
    </Box>
  )
}

function getAspectRatioFromBlockSrc(blockSrc: string, blockAspectRatio?: number) {
  const { imageWidth, imageHeight } = blockSrc.match(/(?<imageWidth>\d+)x(?<imageHeight>\d+)/)?.groups ?? {
    imageWidth: '0',
    imageHeight: '0',
  }

  const width = Number(imageWidth)
  const height = Number(imageHeight)
  const hasValidRatio = width > 0 && height > 0

  let aspectRatio

  if (hasValidRatio) {
    aspectRatio = width > height ? width / height : height / width
  } else {
    aspectRatio = blockAspectRatio || 16 / 9
  }

  return aspectRatio
}
