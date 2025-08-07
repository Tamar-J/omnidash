import { WeatherAPIResponseProps } from '@/api/weatherApi'

import { dayjs } from '@/libs/dayjs'

import { getWeatherAlert } from './getWeatherAlert'
import { getWeatherIcon } from './weatherUtils'

import { IconSVGMapKeyType } from '@/components'

import { CachedWeatherDataProps } from '../types/CachedWeatherDataProps'

import { capitalizeFirstLetter, getCurrentDate, getCurrentWeekDayName } from '@/utils'

export type CurrentDataProps = {
  date: string
  location: string
  weekDay: string
  weatherDescription: string
  isDay: boolean
  tempUnit: '°C' | '°F'
  temp: number
  minMaxTemp: string
  iconName: IconSVGMapKeyType
  rainChance: number
  humidity: number
  windSpeed: number
  uvi: number
  weatherAlert: string
}

export const processCurrentData = (cityName: string, weatherData: WeatherAPIResponseProps): CurrentDataProps => {
  const { minutely_15: minutely15, hourly, daily } = weatherData

  const currentTime = dayjs().utc(true)
  const roundedMinutes = Math.floor(currentTime.get('minutes') / 15) * 15
  const hourIn15Minutes = currentTime.format(`YYYY-MM-DDTHH:${roundedMinutes || '00'}`)
  const hourIn1Hour = currentTime.format('YYYY-MM-DDTHH:00')
  const todayDate = currentTime.format('YYYY-MM-DD')

  const index15m = minutely15.time.indexOf(hourIn15Minutes)
  const index1h = hourly.time.indexOf(hourIn1Hour)
  const index1d = daily.time.indexOf(todayDate)

  return {
    date: getCurrentDate(),
    location: cityName,
    weekDay: getCurrentWeekDayName(),
    weatherDescription: getWeatherDescription(minutely15.weather_code[index15m] ?? hourly.weather_code[index1h]),
    isDay: Boolean(hourly.is_day[index1h]),
    tempUnit: '°C',
    temp: Math.round(minutely15.temperature_2m[index15m] ?? hourly.temperature_2m[index1h]),
    minMaxTemp: `${Math.round(daily.temperature_2m_min[index1d])}º / ${Math.round(daily.temperature_2m_max[index1d])}º`,
    iconName: getWeatherIcon(minutely15.weather_code[index15m] ?? hourly.weather_code[index1h], Boolean(hourly.is_day[index1h])),
    rainChance: hourly.precipitation_probability[index1h],
    humidity: minutely15.relative_humidity_2m[index15m] ?? hourly.relative_humidity_2m[index1h],
    windSpeed: Math.round(minutely15.wind_speed_10m[index15m] ?? hourly.wind_speed_10m[index1h]),
    uvi: Math.round(hourly.uv_index[index1h]),
    weatherAlert: '',
  }
}

export const processCurrentCachedData = (weatherData: CachedWeatherDataProps): CurrentDataProps => {
  const { minutely15Data, hourlyData, dailyData, currentData } = weatherData

  const currentTime = dayjs().utc(true)
  const roundedMinutes = Math.floor(currentTime.get('minutes') / 15) * 15
  const hourIn15Minutes = currentTime.format(`YYYY-MM-DDTHH:${roundedMinutes || '00'}`)
  const hourIn1Hour = currentTime.format('HH:00')
  const currentWeekDay = capitalizeFirstLetter(currentTime.format('ddd'))

  const minutely15 = minutely15Data.filter(({ time }) => time === hourIn15Minutes)[0] || {}
  const hourly = hourlyData.filter(({ time }) => time === hourIn1Hour)[0] || {}
  const daily = dailyData.filter(({ weekDay }) => weekDay === currentWeekDay)[0] || {}

  return {
    date: getCurrentDate(),
    location: currentData.location,
    weekDay: getCurrentWeekDayName(),
    weatherDescription: getWeatherDescription(minutely15.weatherCode ?? hourly.weatherCode),
    isDay: Boolean(hourly.isDay),
    tempUnit: '°C',
    temp: Math.round(minutely15.temp ?? hourly.temp),
    minMaxTemp: `${Math.round(daily.tempMin)}º / ${Math.round(daily.tempMax)}º`,
    iconName: getWeatherIcon(minutely15.weatherCode ?? hourly.weatherCode, Boolean(hourly.isDay)),
    rainChance: hourly.rainChance,
    humidity: minutely15.humidity ?? hourly.humidity,
    windSpeed: Math.round(minutely15.windSpeed ?? hourly.windSpeed),
    uvi: Math.round(hourly.uvi),
    weatherAlert: getWeatherAlert(weatherData),
  }
}

const getWeatherDescription = (code: number): string => {
  const weatherMap: Record<number, string> = {
    0: 'Céu Limpo',
    1: 'Predominantemente Limpo',
    2: 'Parcialmente Nublado',
    3: 'Encoberto',
    45: 'Névoa',
    48: 'Névoa com Gelo',
    51: 'Chuvisco Leve',
    53: 'Chuvisco Moderado',
    55: 'Chuvisco Intenso',
    56: 'Chuvisco Congelante Leve',
    57: 'Chuvisco Congelante Intenso',
    61: 'Chuva Leve',
    63: 'Chuva Moderada',
    65: 'Chuva Forte',
    66: 'Chuva Congelante Leve',
    67: 'Chuva Congelante Forte',
    71: 'Neve Leve',
    73: 'Neve Moderada',
    75: 'Neve Forte',
    77: 'Flocos de Neve',
    80: 'Pancadas de Chuva Leve',
    81: 'Pancadas de Chuva Moderada',
    82: 'Pancadas de Chuva intensa',
    85: 'Pancadas de Neve Leve',
    86: 'Pancadas de Neve Forte',
    95: 'Tempestade (Leve ou Moderada)',
    96: 'Tempestade com Granizo Leve',
    99: 'Tempestade com Granizo Forte',
  }

  return weatherMap[code] || 'Desconhecido'
}
