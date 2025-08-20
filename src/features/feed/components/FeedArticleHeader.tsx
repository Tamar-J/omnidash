import { Box, BoxRow, TextTitle, TouchableIcon } from '@/components'

import { shareLink } from '@/utils'

type FeedArticleHeaderProps = {
  link: string
  goBack: () => void
}

export function FeedArticleHeader({ link, goBack }: FeedArticleHeaderProps) {
  const handleShare = async () => shareLink(link)

  return (
    <BoxRow width={'100%'} alignItems="center" paddingHorizontal="s16" paddingVertical="s8">
      <Box flex={1}>
        <TouchableIcon iconName="arrowLeft" handlePressIcon={goBack} iconSize="medium" />
      </Box>
      <TextTitle textPreset="LargeBold" alignSelf="center">
        Artigo do Feed
      </TextTitle>
      <Box flex={1}>
        <BoxRow gap="s10" alignSelf="flex-end">
          <TouchableIcon iconName="shareNetwork" handlePressIcon={handleShare} iconSize="medium" boxDimension={36} />
        </BoxRow>
      </Box>
    </BoxRow>
  )
}
