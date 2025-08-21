import { FlatList } from 'react-native'

import { Box, ModalContainer, TouchableBox, TouchableIcon } from '@/components'

import { FeedListCard } from '@/features/feed/components'

import { FeedArticleProps } from '@/features/feed/types'

import { getTimeSinceDateShort } from '@/utils'

type Props = {
  closeModal: () => void
  articlesData: FeedArticleProps[]
  showArticle: (article: FeedArticleProps) => void
}

export function ModalAiList({ closeModal, articlesData, showArticle }: Props) {
  return (
    <ModalContainer type="center" isModalVisible={true} onRequestClose={closeModal}>
      <Box flex={1} width={'100%'} maxHeight={400} maxWidth={700} justifyContent="center">
        <Box paddingHorizontal="s4">
          <TouchableIcon
            backgroundColor="translucentBlack"
            iconName="x"
            iconWeight="bold"
            handlePressIcon={closeModal}
            position="absolute"
            top={-30}
            alignSelf="flex-end"
            borderRadius="full"
          />
          <FlatList
            data={articlesData}
            renderItem={({ item }) => (
              <TouchableBox activeOpacity={0.9} onPress={() => showArticle(item)}>
                <FeedListCard
                  link={item.link}
                  faviconUrl={item.faviconUrl}
                  title={item.title}
                  siteName={item.siteName}
                  pubDate={getTimeSinceDateShort(item.pubDate)}
                  tags={item.categories}
                  maxTags={2}
                />
              </TouchableBox>
            )}
            keyExtractor={(item) => `article-ai-reference-${item.link}-${item.creator} `}
            initialNumToRender={6}
            maxToRenderPerBatch={8}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ gap: 8 }}
          />
        </Box>
      </Box>
    </ModalContainer>
  )
}
