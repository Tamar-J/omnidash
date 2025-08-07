import { WeatherAPIResponseProps } from '@/api/weatherApi'

import { dayjs } from '@/libs/dayjs'

import { IconSVGMapKeyType } from '@/components'

import { getWeatherIcon } from './weatherUtils'

import { capitalizeFirstLetter } from '@/utils'

export type DailyProps = {
  weekDay: string
  iconName: IconSVGMapKeyType
  tempMax: number
  tempMin: number
}

export const processDailyData = (weatherData: WeatherAPIResponseProps): DailyProps[] => {
  const { time, weather_code, temperature_2m_max, temperature_2m_min } = weatherData.daily

  return time.map((weekDay, index) => ({
    weekDay: capitalizeFirstLetter(
      dayjs(weekDay + 'T00:00')
        .utc(true)
        .format('ddd')
    ),
    iconName: getWeatherIcon(weather_code[index]),
    tempMax: Math.ceil(temperature_2m_max[index]),
    tempMin: Math.round(temperature_2m_min[index]),
  }))
}
