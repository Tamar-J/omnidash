import { FlatList } from 'react-native'

import { ActiveModal, useSectionFeed } from './useSectionFeed'

import { FeedCarouselCard, FeedListCard } from './components'

import { Box, ModalToggleResources, SectionContainer, SectionHeader, TouchableBox, TouchableIcon } from '@/components'

import { getTimeSinceDateShort } from '@/utils'
import { useNavigation } from '@react-navigation/native'

export function SectionFeed() {
  const {
    feedListData,
    feedCarouselData,
    handleOpenArticle,
    openModal,
    closeModal,
    isToggleResourcesModalVisible,
    resourcesData,
    isFeedListCardVisible,
    isFeedCarouselCardVisible,
  } = useSectionFeed()

  const { navigate } = useNavigation()

  const hasFeedData = feedCarouselData.length > 0 || feedListData.length > 0

  return (
    <SectionContainer>
      <SectionHeader
        title={'Feed'}
        status={''}
        rightIcon={
          <>
            <TouchableIcon
              iconName="bookBookmark"
              iconColor={hasFeedData ? 'primary' : 'highlightPrimary'}
              handlePressIcon={() => navigate('feed')}
            />
            <TouchableIcon
              iconName="dotsThreeOutlineVertical"
              iconWeight="fill"
              handlePressIcon={() => openModal(ActiveModal.TOGGLE_RESOURCES)}
            />
          </>
        }
      />
      {hasFeedData && (
        <Box>
          <FlatList
            data={isFeedListCardVisible ? feedListData : []}
            renderItem={({ item }) => (
              <TouchableBox activeOpacity={0.9} onPress={() => handleOpenArticle(item)}>
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
            keyExtractor={(item) => item.link}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerStyle={{ gap: 8 }}
            ListHeaderComponent={
              <>
                {isFeedCarouselCardVisible && feedCarouselData && (
                  <Box gap="s10" backgroundColor="sectionListBackground">
                    <FlatList
                      data={feedCarouselData}
                      horizontal
                      renderItem={({ item }) => (
                        <TouchableBox activeOpacity={0.9} onPress={() => handleOpenArticle(item)}>
                          <FeedCarouselCard
                            link={item.link}
                            faviconUrl={item.faviconUrl}
                            imageSrc={item.image?.src || ''}
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
                      keyExtractor={(item) => item.link}
                    />
                  </Box>
                )}
              </>
            }
          />
        </Box>
      )}

      {isToggleResourcesModalVisible && (
        <ModalToggleResources
          isModalVisible={isToggleResourcesModalVisible}
          closeModal={closeModal}
          resourcesData={resourcesData}
        />
      )}
    </SectionContainer>
  )
}
