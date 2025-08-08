import { useCallback, useState } from 'react'
import { useMMKVBoolean } from 'react-native-mmkv'

import { FeedArticleProps } from './types'

import { FEED_LIST_CARD_KEY } from '@/libs/storage/storageKeys'

export enum ActiveModal {
  NONE = 0,
  TOGGLE_RESOURCES = 1,
  FEED_ARTICLES = 2,
}

export function useSectionFeed() {
  const [isFeedListCardVisible = true, setIsFeedListCardVisible] = useMMKVBoolean(FEED_LIST_CARD_KEY)

  const [activeModal, setActiveModal] = useState(ActiveModal.NONE)

  const feedListData = [] as FeedArticleProps[]

  const isToggleResourcesModalVisible = activeModal === ActiveModal.TOGGLE_RESOURCES

  const openModal = useCallback((modal: ActiveModal) => setActiveModal(modal), [])
  const closeModal = () => setActiveModal(ActiveModal.NONE)

  const toggleFeedListCard = () => {
    setIsFeedListCardVisible(!isFeedListCardVisible)
  }

  const handleOpenArticle = (data: FeedArticleProps) => {
    __DEV__ && console.log(data.link)
  }

  let resourcesData = [{ title: 'Notícias em Lista', isActive: isFeedListCardVisible, toggleSwitch: toggleFeedListCard }]

  return {
    feedListData,
    handleOpenArticle,
    isToggleResourcesModalVisible,
    isFeedListCardVisible,
    openModal,
    closeModal,
    resourcesData,
  }
}
