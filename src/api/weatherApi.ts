import axios from 'axios'

export type WeatherAPIResponseProps = {
  latitude: number
  longitude: number
  elevation: number
  generationtime_ms: number
  timezone: string
  timezone_abbreviation: string
  utc_offset_seconds: number
  daily: {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    weather_code: number[]
  }
  daily_units: {
    time: string
    temperature_2m_max: string
    temperature_2m_min: string
    weather_code: string
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
    apparent_temperature: number[]
    relative_humidity_2m: number[]
    wind_speed_10m: number[]
    precipitation: number[]
    precipitation_probability: number[]
    weather_code: number[]
    uv_index: number[]
    is_day: (0 | 1)[]
  }
  hourly_units: {
    time: string
    temperature_2m: string
    apparent_temperature: string
    relative_humidity_2m: string
    wind_speed_10m: string
    precipitation: string
    precipitation_probability: string
    weather_code: string
    uv_index: string
    is_day: string
  }
  minutely_15: {
    time: string[]
    temperature_2m: number[]
    apparent_temperature: number[]
    relative_humidity_2m: number[]
    wind_speed_10m: number[]
    precipitation: number[]
    precipitation_probability: number[]
    weather_code: number[]
    uv_index: number[]
    is_day: (0 | 1)[]
  }
  minutely_15_units: {
    time: string
    temperature_2m: string
    apparent_temperature: string
    relative_humidity_2m: string
    wind_speed_10m: string
    precipitation: string
    precipitation_probability: string
    weather_code: string
    uv_index: string
    is_day: string
  }
}

const BASE_URL = 'https://api.open-meteo.com/v1/forecast'

export const fetchWeather = async (latitude: number, longitude: number) => {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    minutely_15:
      'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m,uv_index,is_day,precipitation,apparent_temperature',
    hourly:
      'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m,uv_index,is_day,precipitation,apparent_temperature',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    timezone: 'auto',
    forecast_hours: '24',
    forecast_minutely_15: '8',
  })

  const url = `${BASE_URL}?${String(params)}`

  try {
    const response = await axios.get(url)

    return response.data as WeatherAPIResponseProps
  } catch (error) {
    __DEV__ && console.error('Failed to fetch weather data:', error)
    throw error
  }
}
