import { Image } from 'expo-image'

import { Box, BoxRow, TextTitle, TouchableIcon } from '@/components'

import { FeedArticleProps } from '../types'

type Props = Pick<FeedArticleProps, 'siteName' | 'pubDate' | 'faviconUrl'> & {
  onShare: () => void
}

export const FeedCardHeader = ({ siteName, pubDate, faviconUrl, onShare }: Props) => {
  return (
    <BoxRow alignItems="center" gap="s8" width="100%">
      {faviconUrl ?
        <Image
          source={{ uri: faviconUrl }}
          style={{ width: 16, height: 16, borderRadius: 100, borderWidth: 0.5, borderColor: 'white' }}
        />
      : <Box borderRadius="full" backgroundColor="buttonSecondary50" width={10} height={10} />}
      <TextTitle textPreset="smallMedium" color="primaryAlternate" textAlign="left" flex={1}>
        {siteName} • {pubDate}
      </TextTitle>
      <TouchableIcon iconColor="primaryAlternate" iconName="shareNetwork" borderRadius="full" handlePressIcon={onShare} />
    </BoxRow>
  )
}
