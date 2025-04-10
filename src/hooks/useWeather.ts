import { onlineManager, useQuery } from '@tanstack/react-query'

import { WEATHER_DATA_KEY } from '@/services/queryKeys'

import { dayjs } from '@/libs/dayjs'

import { UserLocationDataProps } from '@/services/geocodingServices'
import { CachedWeatherDataProps, weatherService } from '@/services/weather/weatherServices'

export const useWeather = (userLocationData?: UserLocationDataProps) => {
  const isDataExpired = (cachedWeatherData?: CachedWeatherDataProps) => {
    if (!cachedWeatherData) return false

    const { lastFetchedAt } = cachedWeatherData

    const hourNow = dayjs().utc(true).get('hours')
    const weatherDataLastUpdatedAt = dayjs(lastFetchedAt)
    const weatherDataLastUpdatedHour = weatherDataLastUpdatedAt.utc(false).get('hour')

    const userLocationLastUpdateAt = dayjs(userLocationData!.lastFetchedAt)

    const isDataOutdated = userLocationLastUpdateAt.isSameOrAfter(weatherDataLastUpdatedAt)

    return hourNow !== weatherDataLastUpdatedHour || isDataOutdated
  }

  const {
    data: weatherData,
    isError,
    isLoading,
    isFetching,
    refetch: refetchWeather,
  } = useQuery({
    queryKey: [WEATHER_DATA_KEY],
    queryFn: async ({ client }) => {
      try {
        if (!userLocationData) throw new Error('No coordinates available')

        const cachedWeatherData = client.getQueryData<CachedWeatherDataProps>([WEATHER_DATA_KEY])

        const isWeatherDataExpired = isDataExpired(cachedWeatherData)

        if (!isWeatherDataExpired || !onlineManager.isOnline()) {
          return await weatherService(userLocationData, cachedWeatherData)
        }

        const newResponse = await weatherService(userLocationData)

        return newResponse
      } catch (_) {
        return null
      }
    },
    retry: 3,
    enabled: Boolean(userLocationData),
    refetchInterval: Boolean(userLocationData) ? 1000 * 60 * 15 : false,
  })
  return { weatherData, refetchWeather, isLoading, isFetching, isError }
}
