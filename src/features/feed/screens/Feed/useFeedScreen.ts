import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { FeedArticleProps } from '../../types'

export function useFeedScreen() {
  const feedListData = [] as FeedArticleProps[]
  const feedCarouselData = [] as FeedArticleProps[]

  const { goBack } = useNavigation()

  const [isModalManageFeedSourcesVisible, setIsModalManageFeedSourcesVisible] = useState(false)

  const openModal = () => setIsModalManageFeedSourcesVisible(true)
  const closeModal = () => setIsModalManageFeedSourcesVisible(false)

  const showArticle = (article: FeedArticleProps) => {
    __DEV__ && console.log('link:', article.link)
  }

  return {
    feedListData,
    feedCarouselData,
    goBack,
    isModalManageFeedSourcesVisible,
    showArticle,
    openModal,
    closeModal,
  }
}
