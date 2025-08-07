import { IconSVGMapKeyType } from '@/components'

export const getWeatherIcon = (code: number, isDay = true): IconSVGMapKeyType => {
  const daySuffix = isDay ? 'Day' : 'Night'

  switch (true) {
    case [0, 1].includes(code):
      return isDay ? 'sun' : 'moon'
    case code === 2:
      return `cloud${daySuffix}`
    case code === 3:
      return 'cloud'
    case [45, 48].includes(code):
      return `mist${daySuffix}`
    case [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code):
      return `rain${daySuffix}`
    case [71, 73, 75, 77, 85, 86].includes(code):
      return `snow${daySuffix}`
    case [95, 96, 99].includes(code):
      return `thunderstorm${daySuffix}`
    default:
      return 'sun'
  }
}
