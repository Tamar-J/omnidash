import { useRef } from 'react'
import { onlineManager, useQuery, useQueryClient } from '@tanstack/react-query'

import { dayjs } from '@/libs/dayjs'

import { AI_WEATHER_INSIGHT_KEY, getAiWeatherResponse } from '../services'
import { CachedAiChatDataProps } from '../types/CachedAiChatDataProps'
import { CachedWeatherDataProps } from '@/features/weather/types/CachedWeatherDataProps'

export const useAiWeather = (weatherData?: CachedWeatherDataProps | null) => {
  const abortControllerRef = useRef<AbortController | null>(null)

  const aiData = useQueryClient().getQueryData<CachedAiChatDataProps>([AI_WEATHER_INSIGHT_KEY])

  const shouldFetchAi = () => {
    if (!weatherData) return false
    if (!aiData) return true

    const aiUpdatedAt = dayjs(aiData.lastFetchedAt)
    const weatherUpdatedAt = dayjs(weatherData.lastFetchedAt)

    return weatherUpdatedAt.isAfter(aiUpdatedAt)
  }

  const {
    data,
    isLoading,
    isError,
    refetch: fetchWeatherInsightData,
    isFetching,
  } = useQuery({
    queryKey: [AI_WEATHER_INSIGHT_KEY],
    queryFn: async () => {
      try {
        if (!weatherData) throw new Error('weather data is empty')

        if (abortControllerRef.current) {
          abortControllerRef.current.abort()
        }

        const abortController = (abortControllerRef.current = new AbortController())

        const data = await getAiWeatherResponse(JSON.stringify(weatherData), abortController.signal)
        return data
      } catch (error) {
        __DEV__ && console.error('Failed to fetching AI Chat:', error)
        return aiData ? aiData : null
      }
    },
    staleTime: Infinity,
    retry: 3,
    retryDelay: 1000 * 30, // 30 seconds
    enabled: shouldFetchAi(),
    subscribed: onlineManager.isOnline(),
  })

  return { data, fetchWeatherInsightData, isLoading, isError, isFetching }
}
