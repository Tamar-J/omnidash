import { memo } from 'react'
import { Image } from 'expo-image'

import { FeedCardHeader } from '../FeedCardHeader'
import { NoImagePlaceholder } from '../NoImagePlaceHolder'
import { TagList } from '../TagList'
import { FeedCardProps } from '../../types'

import { Box, BoxGradient, TextTitle } from '@/components'

import { shareLink } from '@/utils'

type Props = FeedCardProps & {
  imageSrc: string | null
}

export const FeedCarouselCard = memo(({ title, tags = [], maxTags, imageSrc, siteName, pubDate, faviconUrl, link }: Props) => {
  const handleShare = async () => await shareLink(link)

  return (
    <Box backgroundColor="background" width={300} borderRadius="medium" borderWidth={0.5} overflow="hidden">
      <Box position="relative">
        {imageSrc ?
          <Image source={{ uri: imageSrc }} style={{ width: '100%', aspectRatio: 3 / 2, maxHeight: 200 }} />
        : <NoImagePlaceholder />}
        <BoxGradient
          width={'100%'}
          presetType="translucentDark"
          position="absolute"
          bottom={0}
          paddingHorizontal="s16"
          paddingVertical="s8"
        >
          <FeedCardHeader siteName={siteName} pubDate={pubDate} faviconUrl={faviconUrl} onShare={handleShare} />
        </BoxGradient>
      </Box>

      <Box paddingHorizontal="s16" paddingBottom="s16" backgroundColor="sectionListBackground" gap="s8">
        <TextTitle textPreset="mediumBold" textAlign="left" numberOfLines={2} minHeight={48}>
          {title}
        </TextTitle>
        <TagList tags={tags} maxTags={maxTags} />
      </Box>
    </Box>
  )
})

FeedCarouselCard.displayName = 'FeedCarouselCard'
