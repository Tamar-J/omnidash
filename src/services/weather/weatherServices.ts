import { fetchWeather } from '@/api/weatherApi'

import { UserLocationDataProps } from '../geocodingServices'

import { dayjs } from '@/libs/dayjs'

import { CurrentDataProps, processCurrentCachedData, processCurrentData } from './processCurrentData'
import { Minutely15Props, processMinutely15Data } from './processMinutely15Data'
import { DailyProps, processDailyData } from './processDailyData'
import { HourlyProps, processHourlyData } from './processHourlyData'
import { formatCityName } from './formatCityName'

export type CachedWeatherDataProps = {
  minutely15Data: Minutely15Props[]
  hourlyData: HourlyProps[]
  dailyData: DailyProps[]
  currentData: CurrentDataProps
  lastFetchedAt: string
}

export const weatherService = async (userLocationData: UserLocationDataProps, cachedWeatherData?: CachedWeatherDataProps) => {
  try {
    if (cachedWeatherData) {
      const isCachedWeatherDataExpired = isCacheExpired(cachedWeatherData.lastFetchedAt)

      if (isCachedWeatherDataExpired) throw new Error('Cached data has expired')

      return {
        ...cachedWeatherData,
        currentData: processCurrentCachedData(cachedWeatherData),
      }
    }
    __DEV__ && console.log('NEW FETCH!')
    const { coordinates, city, state, countryCode } = userLocationData

    const weatherData = await fetchWeather(coordinates.latitude, coordinates.longitude)
    const lastFetchedAt = dayjs().utc(true).toISOString()
    const cityName = formatCityName({ city, countryCode, state })

    const data = {
      minutely15Data: processMinutely15Data(weatherData),
      hourlyData: processHourlyData(weatherData),
      dailyData: processDailyData(weatherData),
      currentData: processCurrentData(cityName, weatherData),
      lastFetchedAt,
    }

    return data
  } catch (error) {
    __DEV__ && console.error('Error fetching weather data:', error)
    throw error
  }
}

const isCacheExpired = (lastFetchedAt: string) => {
  const now = dayjs().utc(true)
  const expiredCacheTime = dayjs(lastFetchedAt).add(24, 'hours').subtract(1, 'minute')
  return now.isSameOrAfter(expiredCacheTime)
}
