import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { type FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useAllFeedsRss } from '../../hooks/useAllFeedsRss'
import { useDebounceValue } from '@/hooks/useDebounceValue'

import { FeedArticleProps } from '../../types'

export function useFeedScreen() {
  const { data: feedListData = [] } = useAllFeedsRss({ articleType: 'short-articles' })
  const { data: feedCarouselData = [] } = useAllFeedsRss({ articleType: 'full-articles' })

  const feedListArticlesRef = useRef<FlatList<FeedArticleProps>>(null)
  const feedCarouselArticlesRef = useRef<FlatList<FeedArticleProps>>(null)

  const [searchFeedArticle, setSearchFeeds] = useState('')
  const searchFeedArticleDebounced = useDebounceValue(searchFeedArticle, 300)

  const { goBack, navigate } = useNavigation()

  const hasFeedData = feedCarouselData.length > 0 || feedListData.length > 0

  const handleUserSearchFeedArticleInput = useCallback((input: string) => {
    setSearchFeeds(input)
  }, [])

  const [isModalManageFeedSourcesVisible, setIsModalManageFeedSourcesVisible] = useState(false)

  const openModal = () => setIsModalManageFeedSourcesVisible(true)
  const closeModal = () => setIsModalManageFeedSourcesVisible(false)

  const showArticle = (article: FeedArticleProps) => {
    __DEV__ && console.log('link:', article.link)
    navigate('feedArticle', article)
  }

  const filteredFeedListArticles = useMemo(() => {
    if (!searchFeedArticleDebounced.trim()) return feedListData || []

    return feedListData?.filter((article) => article.title.toLowerCase().includes(searchFeedArticleDebounced.toLowerCase()))
  }, [searchFeedArticleDebounced, feedListData])
  const filteredFeedCarouselArticles = useMemo(() => {
    if (!searchFeedArticleDebounced.trim()) return feedCarouselData || []

    return feedCarouselData?.filter((article) => article.title.toLowerCase().includes(searchFeedArticleDebounced.toLowerCase()))
  }, [searchFeedArticleDebounced, feedCarouselData])

  const resetFeedScroll = () => {
    feedListArticlesRef.current?.scrollToOffset({ offset: 0, animated: false })
    feedCarouselArticlesRef.current?.scrollToOffset({ offset: 0, animated: false })
  }

  useEffect(() => {
    resetFeedScroll()
  }, [searchFeedArticleDebounced])

  return {
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
  }
}
