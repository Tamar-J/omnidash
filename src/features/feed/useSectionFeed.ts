import { useCallback, useState } from 'react'
import { useMMKVBoolean } from 'react-native-mmkv'

import { useAllFeedsRss } from './hooks/useAllFeedsRss'

import { FEED_CAROUSEL_CARD_KEY, FEED_LIST_CARD_KEY } from '@/libs/storage/storageKeys'

import { FeedArticleProps } from './types'

export enum ActiveModal {
  NONE = 0,
  TOGGLE_RESOURCES = 1,
  FEED_ARTICLES = 2,
}

export function useSectionFeed() {
  const [isFeedListCardVisible = true, setIsFeedListCardVisible] = useMMKVBoolean(FEED_LIST_CARD_KEY)
  const [isFeedCarouselCardVisible = true, setIsFeedCarouselCardVisible] = useMMKVBoolean(FEED_CAROUSEL_CARD_KEY)

  const [activeModal, setActiveModal] = useState(ActiveModal.NONE)
  const [feedArticleData, setFeedArticleData] = useState({} as FeedArticleProps)

  const { data: feedListData = [] } = useAllFeedsRss({ articleType: 'short-articles', numberOfArticles: 3 })
  const { data: feedCarouselData = [] } = useAllFeedsRss({ articleType: 'full-articles', numberOfArticles: 5 })

  const isToggleResourcesModalVisible = activeModal === ActiveModal.TOGGLE_RESOURCES
  const isFeedArticleModalVisible = activeModal === ActiveModal.FEED_ARTICLES

  const openModal = useCallback((modal: ActiveModal) => setActiveModal(modal), [])
  const closeModal = () => setActiveModal(ActiveModal.NONE)

  const toggleFeedListCard = () => {
    setIsFeedListCardVisible(!isFeedListCardVisible)
  }
  const toggleFeedCarouselCard = () => {
    setIsFeedCarouselCardVisible(!isFeedCarouselCardVisible)
  }

  const handleOpenArticle = (data: FeedArticleProps) => {
    __DEV__ && console.log(data.link)
    setFeedArticleData(data)
    openModal(ActiveModal.FEED_ARTICLES)
  }

  const resourcesData = [
    { title: 'Feed em Carrossel', isActive: isFeedCarouselCardVisible, toggleSwitch: toggleFeedCarouselCard },
    { title: 'Feed em Lista', isActive: isFeedListCardVisible, toggleSwitch: toggleFeedListCard },
  ]

  return {
    feedListData,
    feedCarouselData,
    resourcesData,
    feedArticleData,
    isToggleResourcesModalVisible,
    isFeedArticleModalVisible,
    isFeedListCardVisible,
    isFeedCarouselCardVisible,
    handleOpenArticle,
    openModal,
    closeModal,
  }
}
