import { FlatList } from 'react-native'

import { ActiveModal, useSectionFeed } from './useSectionFeed'

import { FeedListCard } from './components'

import { Box, ModalToggleResources, SectionContainer, SectionHeader, TouchableBox, TouchableIcon } from '@/components'

import { getTimeSinceDateShort } from '@/utils'

export function SectionFeed() {
  const {
    feedListData,
    handleOpenArticle,
    openModal,
    closeModal,
    isToggleResourcesModalVisible,
    resourcesData,
    isFeedListCardVisible,
  } = useSectionFeed()

  const hasFeedData = feedListData.length > 0

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
              handlePressIcon={() => {}}
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
