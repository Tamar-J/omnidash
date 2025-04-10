import { fetchGeoDirect, fetchGeoReverse } from '@/api/geocodingApi'

import { dayjs } from '@/libs/dayjs'

export const getLocationByCity = async (cityName: string) => {
  try {
    const cityData = await fetchGeoDirect(cityName)

    return cityData || []
  } catch (error) {
    __DEV__ && console.error(error)
    return []
  }
}

export type UserLocationDataProps = {
  coordinates: {
    latitude: number
    longitude: number
  }
  countryCode: string
  city: string
  state?: string
  userLocationBy?: string
  lastFetchedAt?: string
}

export const getLocationByCoordinates = async (latitude: number, longitude: number): Promise<UserLocationDataProps> => {
  try {
    const cityData = await fetchGeoReverse(latitude, longitude)
    const lastFetchedAt = dayjs().utc(true).toISOString()

    const { name, state, country, lat, lon } = cityData[0]

    return {
      coordinates: {
        latitude: lat,
        longitude: lon,
      },
      countryCode: country,
      city: name,
      state,
      lastFetchedAt,
    }
  } catch (error) {
    __DEV__ && console.error(error)
    throw error
  }
}
