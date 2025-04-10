import axios from 'axios'

const GEO_REVERSE_BASE_URL = 'https://api.openweathermap.org/geo/1.0/reverse'

export const fetchGeoReverse = async (latitude: number, longitude: number) => {
  const params = new URLSearchParams({
    lat: String(latitude),
    lon: String(longitude),
    limit: '1',
    appid: process.env.EXPO_PUBLIC_OPEN_WEATHER_MAP_API_KEY,
  })

  try {
    const response = await axios.get(`${GEO_REVERSE_BASE_URL}?${String(params)}`)

    return response.data
  } catch (error) {
    __DEV__ && console.error('Failed to fetch GeoReverse data:', error)
    throw error
  }
}

export type GeoDirectResultProps = {
  name: string
  lat: number
  lon: number
  country: string
  state: string
}

const GEO_DIRECT_BASE_URL = 'https://api.openweathermap.org/geo/1.0/direct'

export const fetchGeoDirect = async (cityName: string): Promise<GeoDirectResultProps[]> => {
  const params = new URLSearchParams({
    q: cityName,
    limit: '10',
    appid: process.env.EXPO_PUBLIC_OPEN_WEATHER_MAP_API_KEY,
  })

  try {
    const response = await axios.get(`${GEO_DIRECT_BASE_URL}?${String(params)}`)

    return response.data
  } catch (error) {
    __DEV__ && console.error('Failed to fetch GeoDirect data:', error)
    throw error
  }
}
