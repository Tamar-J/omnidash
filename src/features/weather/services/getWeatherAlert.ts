import { dayjs } from '@/libs/dayjs'

import { CachedWeatherDataProps } from '../types/CachedWeatherDataProps'

import { HourlyProps } from './processHourlyData'

export function getWeatherAlert(weatherData: CachedWeatherDataProps) {
  const { hourlyData, minutely15Data } = weatherData
  const sourceData = [...minutely15Data, ...hourlyData.slice(1)]

  const now = dayjs().utc(true).second(0).millisecond(0)

  const alert = sourceData.find((weather) => {
    const [hour, minute] = weather.time.split(':').map(Number)
    const weatherTime = now.hour(hour).minute(minute)

    const rangeAnaliseTime = minute === 0 ? 30 : 15

    return weatherTime.isSameOrAfter(now.subtract(rangeAnaliseTime, 'minutes')) && conditions.some(({ check }) => check(weather))
  })

  return alert ? conditions.find(({ check }) => check(alert))!.message(alert) : ''
}

function getRainDescription(mm: number) {
  if (mm <= 0.5) return `chuvisco (${mm}mm)`
  if (mm <= 2) return `chuva leve (${mm}mm)`
  if (mm <= 10) return `chuva moderada (${mm}mm)`
  if (mm <= 20) return `chuva forte (${mm}mm)`
  if (mm <= 50) return `chuva muito forte (${mm}mm)`
  return `tempestade intensa (${mm}mm)`
}

type ConditionsProps = {
  check: (weather: HourlyProps) => boolean
  message: (weather: HourlyProps) => string
}

const conditions: ConditionsProps[] = [
  {
    check: (weather) => (weather.rainChance >= 50 && weather.precipitation > 0) || weather.precipitation > 0.1,
    message: (weather) =>
      `${weather.rainChance}% de chance de ${getRainDescription(weather.precipitation)} por volta de ${weather.time}`,
  },
  {
    check: (weather) => weather.uvi >= 11,
    message: () => `Índice UV extremo hoje. Minimize a exposição ao sol!`,
  },
  {
    check: (weather) => weather.apparentTemp >= 35,
    message: (weather) => `Calor intenso esperado hoje. Sensação de ${weather.apparentTemp}ºC`,
  },
  {
    check: (weather) => weather.apparentTemp <= 5,
    message: () => `Frio intenso esperado hoje. Agasalhe-se bem!`,
  },
  {
    check: (weather) => weather.windSpeed >= 50,
    message: (weather) => `Ventos fortes previstos por volta de ${weather.time}.\nTenha cuidado ao sair`,
  },
  {
    check: (weather) => weather.humidity <= 20,
    message: (weather) => `Ar muito seco previsto por volta de ${weather.time}.\nBeba bastante água.`,
  },
  {
    check: (weather) => weather.humidity >= 90,
    message: (weather) => `Umidade muita alta prevista por volta de ${weather.time}`,
  },
]
