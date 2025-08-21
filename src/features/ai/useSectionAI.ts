import { useCallback, useEffect, useMemo, useState } from 'react'
import { useMMKVBoolean } from 'react-native-mmkv'

import { dayjs } from '@/libs/dayjs'
import { AI_FEED_INSIGHT_CARD_KEY, AI_WEATHER_INSIGHT_CARD_KEY } from '@/libs/storage/storageKeys'

import { FeedArticleProps } from '../feed/types'

import { useWeather } from '@/features/weather/hooks/useWeather'
import { useAiWeather } from './hooks/useAiWeather'

import { useAllFeedsRss } from '../feed/hooks/useAllFeedsRss'
import { useAiFeed } from './hooks/useAiFeed'

export enum InsightType {
  WEATHER = 0,
  FEED = 1,
}

const insightInfoData = {
  [InsightType.WEATHER]: {
    title: 'Clima com IA',
    description:
      'A IA analisa os dados meteorológicos e fornece insights de forma mais compreensível do que simplesmente números.',
  },
  [InsightType.FEED]: {
    title: 'Feed com IA',
    description:
      'A IA analisa as notícias procurando informações relevantes, padrões e tendências sem esquecer de apontar as fontes para que você posso ler a matéria na integra.',
  },
}

export enum ActiveModal {
  NONE = 0,
  INFO = 1,
  TOGGLE_SOURCES = 2,
  FEED_ARTICLES_LIST = 3,
}

export function useSectionAi() {
  const [activeModal, setActiveModal] = useState(ActiveModal.NONE)
  const [modalInfoContent, setModalInfoContent] = useState<{ title: string; description: string } | null>(null)
  const [feedArticleData, setFeedArticleData] = useState<FeedArticleProps | null>(null)

  const { weatherData } = useWeather()
  const { data: feedsData } = useAllFeedsRss({ articleType: 'full-articles' })

  const [feedArticles, setFeedArticles] = useState(feedsData)

  const isModalInfoVisible = activeModal === ActiveModal.INFO
  const isModalToggleResourcesVisible = activeModal === ActiveModal.TOGGLE_SOURCES
  const isModalAiListFromInsightVisible = activeModal === ActiveModal.FEED_ARTICLES_LIST

  const [isAiWeatherInsightCardVisible = true, setIsAiWeatherInsightCardVisible] = useMMKVBoolean(AI_WEATHER_INSIGHT_CARD_KEY)
  const [isAiFeedInsightCardVisible = true, setIsAiFeedInsightCardVisible] = useMMKVBoolean(AI_FEED_INSIGHT_CARD_KEY)

  const {
    data: aiWeatherInsightData,
    isLoading: isLoadingWeatherInsight,
    refetch: fetchWeatherInsightData,
    isFetching: isFetchingWeatherInsight,
    isError: isErrorWeatherInsight,
  } = useAiWeather(weatherData)
  const {
    data: aiFeedInsightData,
    isLoading: isLoadingFeedInsight,
    refetch: fetchAiFeedInsightData,
    isFetching: isFetchingFeedInsight,
    isError: isErrorFeedInsight,
  } = useAiFeed(feedsData)

  const isLoading = isLoadingFeedInsight || isLoadingWeatherInsight
  const isFetching = isFetchingFeedInsight || isFetchingWeatherInsight
  const isError = isErrorFeedInsight || isErrorWeatherInsight

  const isFeedInsightOutdated = useMemo(() => {
    if (!aiFeedInsightData || feedsData.length === 0) return false
    const lastFeedPubDate = dayjs(feedsData[0].pubDate).utc(true)
    const lastFetchedAiFeedInsightAt = dayjs(aiFeedInsightData.lastFetchedAt)

    return lastFeedPubDate.isAfter(lastFetchedAiFeedInsightAt)
  }, [aiFeedInsightData, feedsData])

  const aiWeatherInsight = aiWeatherInsightData?.aiResponse || ''
  const aiFeedInsight = aiFeedInsightData?.aiResponse || ''

  const shouldFetchAiWeather = useCallback(() => {
    if (!weatherData) return false
    if (aiWeatherInsight === '' || !aiWeatherInsightData) return true

    const { lastFetchedAt: lastFetchedWeatherAt } = weatherData
    const { lastFetchedAt: lastFetchedAiWeatherInsightAt } = aiWeatherInsightData

    const weatherDataLastUpdatedAt = dayjs(lastFetchedWeatherAt)
    const aiInsightLastUpdateAt = dayjs(lastFetchedAiWeatherInsightAt)

    return weatherDataLastUpdatedAt.isAfter(aiInsightLastUpdateAt)
  }, [weatherData, aiWeatherInsightData, aiWeatherInsight])

  const shouldFetchAiFeed = useCallback(() => {
    if (feedsData.length === 0) return false
    if (aiFeedInsight === '' || !aiFeedInsightData) return true
  }, [feedsData, aiFeedInsight, aiFeedInsightData])

  const openModal = (modal: ActiveModal) => setActiveModal(modal)
  const closeModal = () => setActiveModal(ActiveModal.NONE)

  const showArticle = (article: FeedArticleProps) => setFeedArticleData(article)
  const closeArticle = () => setFeedArticleData(null)

  const toggleAiWeatherInsight = () => {
    setIsAiWeatherInsightCardVisible(!isAiWeatherInsightCardVisible)
  }
  const toggleAiFeedInsight = () => {
    setIsAiFeedInsightCardVisible(!isAiFeedInsightCardVisible)
  }

  const handleOpenModalInfo = (insightType: InsightType) => {
    openModal(ActiveModal.INFO)
    const insightData = insightInfoData[insightType]
    setModalInfoContent(insightData)
  }

  const handleOpenListOfArticles = (articleIndexes: string) => {
    const indexes = new Set(JSON.parse(articleIndexes))
    const data = feedsData.filter((_, index) => indexes.has(index))
    setFeedArticles(data)
    openModal(ActiveModal.FEED_ARTICLES_LIST)
  }

  const resourcesData = [
    { title: 'Insights de Clima', isActive: isAiWeatherInsightCardVisible, toggleSwitch: toggleAiWeatherInsight },
    { title: 'Insights do Feed', isActive: isAiFeedInsightCardVisible, toggleSwitch: toggleAiFeedInsight },
  ]

  useEffect(() => {
    const isReadyToFetch = shouldFetchAiWeather()
    if (isReadyToFetch) {
      fetchWeatherInsightData()
    }
  }, [weatherData, aiWeatherInsightData, fetchWeatherInsightData, shouldFetchAiWeather])

  useEffect(() => {
    const isFeedInsightReadyToFetch = shouldFetchAiFeed()
    if (isFeedInsightReadyToFetch) {
      fetchAiFeedInsightData()
    }
  }, [feedsData, aiFeedInsightData, fetchAiFeedInsightData, shouldFetchAiFeed])

  return {
    aiWeatherInsight,
    aiFeedInsight,
    openModal,
    closeModal,
    showArticle,
    closeArticle,
    isAiWeatherInsightCardVisible,
    isAiFeedInsightCardVisible,
    isModalInfoVisible,
    isModalToggleResourcesVisible,
    isModalAiListFromInsightVisible,
    isFeedInsightOutdated,
    isLoading,
    isFetching,
    isError,
    resourcesData,
    feedArticles,
    feedArticleData,
    fetchAiFeedInsightData,
    modalInfoContent,
    handleOpenModalInfo,
    handleOpenListOfArticles,
  }
}
