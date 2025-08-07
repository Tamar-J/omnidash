import { useCallback, useEffect, useState } from 'react'
import { useMMKVBoolean } from 'react-native-mmkv'

import { dayjs } from '@/libs/dayjs'
import { AI_WEATHER_INSIGHT_CARD_KEY } from '@/libs/storage/storageKeys'

import { useWeather } from '@/features/weather/hooks/useWeather'
import { useAiWeather } from '@/features/ai/hooks/useAiWeather'

export enum ActiveModal {
  NONE = 0,
  INFO = 1,
  TOGGLE_SOURCES = 2,
}

export function useSectionAi() {
  const [activeModal, setActiveModal] = useState(ActiveModal.NONE)

  const isModalInfoVisible = activeModal === ActiveModal.INFO
  const isModalToggleResourcesVisible = activeModal === ActiveModal.TOGGLE_SOURCES

  const [isAiWeatherInsightCardVisible = true, setIsAiWeatherInsightCardVisible] = useMMKVBoolean(AI_WEATHER_INSIGHT_CARD_KEY)

  const { weatherData } = useWeather()
  const { data: aiData, isLoading, fetchWeatherInsightData, isFetching, isError } = useAiWeather(weatherData)

  const aiWeatherInsight = aiData?.aiResponse || ''

  const shouldFetchAi = useCallback(() => {
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
    setIsAiWeatherInsightCardVisible(!isAiWeatherInsightCardVisible)
  }

  const resourcesData = [{ title: 'Insights de Clima', isActive: isAiWeatherInsightCardVisible, toggleSwitch: toggleAiInsights }]

  useEffect(() => {
    const isReadyToFetch = shouldFetchAi()
    if (isReadyToFetch) {
      fetchWeatherInsightData()
    }
  }, [weatherData, aiData, fetchWeatherInsightData, shouldFetchAi])

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
