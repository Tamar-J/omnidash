import { memo } from 'react'

import { TagList } from '../TagList'
import { FeedCardHeader } from '../FeedCardHeader'

import { Box, TextTitle } from '@/components'

import { FeedCardProps } from '../../types'

import { shareLink } from '@/utils'

export const FeedListCard = memo(({ title, tags = [], maxTags, siteName, pubDate, faviconUrl, link }: FeedCardProps) => {
  const handleShare = async () => await shareLink(link)

  return (
    <Box backgroundColor="background" borderRadius="medium" borderWidth={0.5} overflow="hidden">
      <Box paddingHorizontal="s16" paddingVertical="s16" gap="s8" backgroundColor="sectionListBackground">
        <FeedCardHeader siteName={siteName} pubDate={pubDate} faviconUrl={faviconUrl} onShare={handleShare} />
        <Box flex={1} gap="s8">
          <TextTitle textPreset="mediumBold" textAlign="left" numberOfLines={2}>
            {title}
          </TextTitle>
          <TagList tags={tags} maxTags={maxTags} />
        </Box>
      </Box>
    </Box>
  )
})

FeedListCard.displayName = 'FeedListCard'
