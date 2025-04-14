import { useCallback, useEffect, useState } from 'react'

import { useWeather } from '@/hooks/useWeather'
import { useAIWeather } from '@/hooks/useAIWeather'

import { dayjs } from '@/libs/dayjs'
import { storage } from '@/services/storage/storage'
import { AI_WEATHER_INSIGHT_CARD_KEY } from '@/services/storage/storageKeys'

export enum ActiveModal {
  NONE = 0,
  INFO = 1,
  TOGGLE_SOURCES = 2,
}

export function useSectionAI() {
  const [activeModal, setActiveModal] = useState(ActiveModal.NONE)

  const isModalInfoVisible = activeModal === ActiveModal.INFO
  const isModalToggleResourcesVisible = activeModal === ActiveModal.TOGGLE_SOURCES

  const [isAiWeatherInsightCardVisible, setIsAiWeatherInsightCardVisible] = useState(false)

  const { weatherData } = useWeather()
  const { data: aiData, isLoading, fetchAIData, isFetching, isError } = useAIWeather(weatherData)

  const aiWeatherInsight = aiData?.aiResponse || ''

  const shouldFetchAI = useCallback(() => {
    if (!weatherData) return false
    if (aiWeatherInsight === '' || !aiData) return true

    const { lastFetchedAt: lastFetchedWeatherAt } = weatherData
    const { lastFetchedAt: lastFetchedAiDataAt } = aiData

    const weatherDataLastUpdatedAt = dayjs(lastFetchedWeatherAt)
    const aiDataLastUpdateAt = dayjs(lastFetchedAiDataAt)

    return weatherDataLastUpdatedAt.isAfter(aiDataLastUpdateAt)
  }, [weatherData, aiData, aiWeatherInsight])

  const openModal = (modal: ActiveModal) => setActiveModal(modal)
  const closeModal = () => setActiveModal(ActiveModal.NONE)

  const toggleAiInsights = () => {
    setIsAiWeatherInsightCardVisible((previewState) => {
      storage.setItem(AI_WEATHER_INSIGHT_CARD_KEY, !previewState)
      return !previewState
    })
  }

  const resourcesData = [{ title: 'Insights de Clima', isActive: isAiWeatherInsightCardVisible, toggleSwitch: toggleAiInsights }]

  useEffect(() => {
    const loadCards = async () => {
      const aiCard = await storage.getItem(AI_WEATHER_INSIGHT_CARD_KEY)
      setIsAiWeatherInsightCardVisible(aiCard ?? true)
    }

    loadCards()
  }, [])

  useEffect(() => {
    const isReadyToFetch = shouldFetchAI()
    if (isReadyToFetch) {
      fetchAIData()
    }
  }, [weatherData, aiData, fetchAIData, shouldFetchAI])

  return {
    isModalInfoVisible,
    isModalToggleResourcesVisible,
    isAiWeatherInsightCardVisible,
    aiWeatherInsight,
    openModal,
    closeModal,
    isLoading,
    isFetching,
    isError,
    resourcesData,
  }
}
