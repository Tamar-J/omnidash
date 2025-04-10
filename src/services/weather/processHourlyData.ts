import { WeatherAPIResponseProps } from '@/api/weatherApi'

import { Minutely15Props } from './processMinutely15Data'

import { getWeatherIcon } from './weatherUtils'

export type HourlyProps = Minutely15Props

export const processHourlyData = (weatherData: WeatherAPIResponseProps): HourlyProps[] => {
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
  } = weatherData.hourly

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
