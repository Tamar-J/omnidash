import { WeatherAPIResponseProps } from '@/api/weatherApi'

import { getWeatherIcon } from './weatherUtils'

import { IconSVGMapKeyType } from '@/components'

export type Minutely15Props = {
  time: string
  iconName: IconSVGMapKeyType
  temp: number
  rainChance: number
  isDay: 0 | 1
  weatherCode: number
  uvi: number
  humidity: number
  windSpeed: number
  apparentTemp: number
  precipitation: number
}

export const processMinutely15Data = (weatherData: WeatherAPIResponseProps): Minutely15Props[] => {
  const {
    time: times,
    weather_code,
    temperature_2m,
    precipitation_probability,
    is_day,
    uv_index,
    relative_humidity_2m,
    wind_speed_10m,
    apparent_temperature,
    precipitation,
  } = weatherData.minutely_15

  return times.map((time, index) => ({
    time: time.replace(/^.*(\d\d:\d\d)$/, '$1'),
    iconName: getWeatherIcon(weather_code[index], Boolean(is_day[index])),
    temp: Math.round(temperature_2m[index]),
    rainChance: precipitation_probability[index],
    isDay: is_day[index],
    weatherCode: weather_code[index],
    uvi: uv_index[index],
    humidity: relative_humidity_2m[index],
    windSpeed: wind_speed_10m[index],
    apparentTemp: apparent_temperature[index],
    precipitation: precipitation[index],
  }))
}
