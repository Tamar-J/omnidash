import { Box, BoxRow, TextLabel } from '@/components'

import { FeedCardProps } from '../types'

type Props = Pick<FeedCardProps, 'maxTags'> & Required<Pick<FeedCardProps, 'tags'>>

export const TagList = ({ tags, maxTags }: Props) => {
  if (tags.length === 0) return null

  const isLimitedToTwo = maxTags === 2
  const wrapOrNowrap = isLimitedToTwo ? 'nowrap' : 'wrap'
  const tagsVisible = maxTags ? tags.slice(0, maxTags) : tags

  return (
    <BoxRow gap="s10" flexWrap={wrapOrNowrap}>
      {tagsVisible.map((tag, index) => (
        <Box
          key={`${tag}-${index}`}
          backgroundColor="textInputListBackground"
          borderRadius="medium"
          paddingVertical="s4"
          paddingHorizontal="s8"
          flexShrink={isLimitedToTwo && index === 1 ? 1 : 0}
        >
          <TextLabel textPreset="smallMedium" color="primaryAlternate" numberOfLines={1}>
            {tag}
          </TextLabel>
        </Box>
      ))}
    </BoxRow>
  )
}
