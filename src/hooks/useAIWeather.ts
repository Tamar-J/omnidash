import { useRef } from 'react'

import { onlineManager, useQuery, useQueryClient } from '@tanstack/react-query'

import { AI_WEATHER_INSIGHT_KEY } from '@/services/queryKeys'

import { dayjs } from '@/libs/dayjs'

import { CachedAiChatDataProps, getAiWeatherResponse } from '@/services/aiWeatherService'
import { CachedWeatherDataProps } from '@/services/weather/weatherServices'

export const useAIWeather = (weatherData?: CachedWeatherDataProps | null) => {
  const abortControllerRef = useRef<AbortController | null>(null)

  const aiData = useQueryClient().getQueryData<CachedAiChatDataProps>([AI_WEATHER_INSIGHT_KEY])

  const shouldFetchAI = () => {
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
    refetch: fetchAIData,
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
    enabled: shouldFetchAI(),
    subscribed: onlineManager.isOnline(),
  })

  return { data, fetchAIData, isLoading, isError, isFetching }
}
