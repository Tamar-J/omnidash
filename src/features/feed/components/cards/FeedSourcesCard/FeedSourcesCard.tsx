import { memo, useCallback } from 'react'
import { Image } from 'expo-image'

import { useFeedSourcesCard } from './useFeedSourcesCard'

import { Box, BoxRow, TextBody, TextTitle, TouchableIcon } from '@/components'

type FeedSourcesCardProps = {
  id: string
  faviconUri: string
  title: string
  htmlUrl: string
  onDelete: (id: string) => void
}

export const FeedSourcesCard = memo(({ id, faviconUri, title, htmlUrl, onDelete }: FeedSourcesCardProps) => {
  const { isImageError, onFaviconImageError } = useFeedSourcesCard()

  const site = htmlUrl.replace(/^https:\/\/|\/$/g, '')

  const handleDeleteFeed = useCallback(() => {
    onDelete(id)
  }, [id, onDelete])

  return (
    <BoxRow alignItems="center" borderWidth={0.5} borderRadius="medium" padding="s16">
      {isImageError ?
        <Box width={16} height={16} backgroundColor="inactive" marginRight="s10" borderRadius="small" />
      : <Image
          style={{ marginRight: 10, borderRadius: 50, width: 16, height: 16 }}
          source={{ uri: faviconUri }}
          onError={onFaviconImageError}
        />
      }
      <Box flex={1}>
        <TextTitle textPreset="mediumBold" textAlign="left" numberOfLines={1}>
          {title}
        </TextTitle>
        <TextBody textPreset="mediumRegular" textAlign="left" numberOfLines={1}>
          {site}
        </TextBody>
      </Box>
      <TouchableIcon iconName="trash" handlePressIcon={handleDeleteFeed} iconSize="large" iconWeight="light" />
    </BoxRow>
  )
})

FeedSourcesCard.displayName = 'FeedSourcesCard'
