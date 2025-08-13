import { useMemo } from 'react'
import { FlatList } from 'react-native'

import { Box, BoxCenter, BoxRow, ModalContainer, TextBody, TextInput, TextTitle, TouchableIcon } from '@/components'

import { FeedSourcesCard } from '../../cards/FeedSourcesCard/FeedSourcesCard'

import { useModalManageFeedSources } from './useModalManageFeedSources'

type ModalLocationProps = {
  isModalVisible: boolean
  closeModal: () => void
}

export function ModalManageFeedSources({ closeModal, isModalVisible }: ModalLocationProps) {
  const { userInput, handleUserInput, handlePressAddFeed, handlePressDeleteFeed, userFeedsData } = useModalManageFeedSources()

  const MemoizedFeedSourcesList = useMemo(() => {
    return (
      <FlatList
        data={userFeedsData}
        renderItem={({ item }) => (
          <FeedSourcesCard
            faviconUri={item.favicon}
            htmlUrl={item.htmlUrl}
            title={item.name}
            id={item.id}
            onDelete={handlePressDeleteFeed}
          />
        )}
        contentContainerStyle={{ gap: 10 }}
        keyExtractor={(item) => item.id}
      />
    )
  }, [userFeedsData, handlePressDeleteFeed])

  const hasFeedSources = userFeedsData?.length > 0

  return (
    <ModalContainer isModalVisible={isModalVisible} onRequestClose={closeModal}>
      <Box
        borderWidth={1}
        padding="s24"
        flex={1}
        gap="s24"
        borderRadius="large"
        backgroundColor="sectionListBackground"
        maxHeight={500}
        maxWidth={450}
      >
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
        <BoxCenter>
          <TextTitle textPreset="LargeBold" textAlign="center">
            Gerenciar Feed
          </TextTitle>
        </BoxCenter>
        <Box width={'100%'}>
          <BoxRow minWidth={300}>
            <Box
              backgroundColor="textInputBackground"
              flex={1}
              alignItems="center"
              gap="s10"
              borderWidth={0.5}
              borderTopLeftRadius="full"
              borderBottomLeftRadius="full"
              paddingHorizontal="s16"
              paddingVertical="s16"
            >
              <BoxRow>
                <TextBody textPreset="mediumMedium">https://</TextBody>
                <TextInput
                  value={userInput}
                  onChangeText={handleUserInput}
                  textAlignVertical="top"
                  placeholder="example.com/feed"
                />
              </BoxRow>
            </Box>
            <TouchableIcon
              iconName="plus"
              handlePressIcon={handlePressAddFeed}
              backgroundColor="textInputListBackground"
              borderWidth={0.5}
              boxDimension={54}
              iconSize="medium"
              iconColor={hasFeedSources ? 'primary' : 'highlightPrimary'}
              borderTopRightRadius="full"
              borderBottomRightRadius="full"
              borderLeftWidth={0}
            />
          </BoxRow>
        </Box>
        {MemoizedFeedSourcesList}
      </Box>
    </ModalContainer>
  )
}
