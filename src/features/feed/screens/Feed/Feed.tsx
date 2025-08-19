import { FlatList } from 'react-native'

import { useFeedScreen } from './useFeedScreen'

import { FeedListCard, FeedCarouselCard, ModalManageFeedSources } from '../../components'

import { Box, BoxRow, BoxSafe, Icon, TextInput, TextTitle, TouchableBox, TouchableIcon } from '@/components'

import { getTimeSinceDateShort } from '@/utils'

export function Feed() {
  const {
    filteredFeedListArticles,
    filteredFeedCarouselArticles,
    hasFeedData,
    feedListArticlesRef,
    feedCarouselArticlesRef,
    goBack,
    isModalManageFeedSourcesVisible,
    showArticle,
    openModal,
    closeModal,
    searchFeedArticle,
    handleUserSearchFeedArticleInput,
  } = useFeedScreen()

  return (
    <BoxSafe flex={1}>
      <BoxRow width={'100%'} alignItems="center" paddingHorizontal="s16" paddingVertical="s8">
        <Box flex={1}>
          <TouchableIcon iconName="arrowLeft" handlePressIcon={goBack} iconSize="medium" />
        </Box>
        <TextTitle textPreset="LargeBold" alignSelf="center">
          Feed
        </TextTitle>
        <Box flex={1}>
          <BoxRow gap="s10" alignSelf="flex-end">
            <TouchableIcon
              iconName="plus"
              handlePressIcon={openModal}
              iconSize="medium"
              boxDimension={36}
              iconColor={hasFeedData ? 'primary' : 'highlightPrimary'}
            />
          </BoxRow>
        </Box>
      </BoxRow>
      <Box paddingHorizontal="s16" paddingBottom="s16">
        <BoxRow
          backgroundColor="textInputBackground"
          width={'100%'}
          alignItems="center"
          gap="s10"
          borderWidth={0.5}
          borderRadius="full"
          paddingHorizontal="s16"
          paddingVertical="s16"
        >
          <Icon iconName="magnifyingGlass" />
          <TextInput value={searchFeedArticle} onChangeText={handleUserSearchFeedArticleInput} placeholder="título do feed" />
        </BoxRow>
      </Box>
      <Box flex={1} height={'100%'}>
        {hasFeedData && (
          <FlatList
            ref={feedListArticlesRef}
            data={filteredFeedListArticles}
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
            keyExtractor={(item) => `${item.link}-${item.creator} `}
            initialNumToRender={6}
            maxToRenderPerBatch={8}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ paddingBottom: 100, gap: 8 }}
            ListHeaderComponent={
              filteredFeedCarouselArticles && (
                <Box gap="s10" backgroundColor="sectionListBackground">
                  <FlatList
                    ref={feedCarouselArticlesRef}
                    data={filteredFeedCarouselArticles}
                    horizontal
                    renderItem={({ item }) => (
                      <TouchableBox activeOpacity={0.9} onPress={() => showArticle(item)}>
                        <FeedCarouselCard
                          link={item.link}
                          faviconUrl={item.faviconUrl}
                          imageSrc={item.image?.src || null}
                          title={item.title}
                          siteName={item.siteName}
                          pubDate={getTimeSinceDateShort(item.pubDate)}
                          tags={item.categories}
                          maxTags={2}
                        />
                      </TouchableBox>
                    )}
                    contentContainerStyle={{ gap: 8, paddingRight: 16 }}
                    showsHorizontalScrollIndicator={false}
                    initialNumToRender={4}
                    maxToRenderPerBatch={6}
                    keyExtractor={(item) => `${item.link}-${item.creator} `}
                  />
                </Box>
              )
            }
          />
        )}
      </Box>

      {isModalManageFeedSourcesVisible && (
        <ModalManageFeedSources isModalVisible={isModalManageFeedSourcesVisible} closeModal={closeModal} />
      )}
    </BoxSafe>
  )
}
