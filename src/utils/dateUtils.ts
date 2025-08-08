import { dayjs } from '@/libs/dayjs'

import { capitalizeFirstLetter } from './capitalizeFirstLetter'

/**
 * Returns the current date in UTC format as a string, allowing customization of the format.
 * @param dateFormat - The format string for the date (default: 'DD/MM/YYYY').
 * @returns The current date formatted according to the provided format.
 * @example getCurrentDate() //'25/03/2025'
 * getCurrentDate('YYYY-MM-DD') //'2025-03-25'
 */
export const getCurrentDate = (dateFormat = 'DD/MM/YYYY') => {
  return dayjs().utc(true).format(dateFormat)
}

/**
 * Returns the name of the current weekday in UTC format, optionally shortened or modified based on the specified format.
 * @param format - The desired shorten format for the weekday name.
 *    - 'short' for the abbreviated name (e.g., 'Mon').
 *    - 'full' for the full name (e.g., 'Monday').
 *    - 'withoutSuffix' for the name without the '-feira' (for portuguese only).
 * @returns The formatted name of the current weekday based on the `format` parameter.
 * @example getCurrentWeekDayName('short') //'Seg'
 * getCurrentWeekDayName('full') //'Segunda-feira'
 * getCurrentWeekDayName('withoutSuffix') //'Segunda'
 */
export const getCurrentWeekDayName = (format?: 'short' | 'full' | 'withoutSuffix') => {
  const weekDay = dayjs()
    .utc(true)
    .format(format === 'short' ? 'ddd' : 'dddd')
  const weekDayFormatted = capitalizeFirstLetter(weekDay)

  if (format === 'withoutSuffix') return weekDayFormatted.replace('-feira', '')

  return capitalizeFirstLetter(weekDay)
}

/**
 * Calculates the elapsed time since the given date until now in UTC,
 * returning a short formatted string with the largest significant time unit.
 * @param dateString - Publication date as an ISO 8601 string (recognized by dayjs).
 * @returns Elapsed time formatted with abbreviated units.
 * @example
 * ```ts
 * getTimeSinceDateShort('2025-06-26T14:00:00Z') // "1d"
 * getTimeSinceDateShort('2020-01-01T00:00:00Z') // "5a"
 * getTimeSinceDateShort('2025-06-27T14:00:00Z') // "agora"
 * ```
 */
export const getTimeSinceDateShort = (dateString: string): string => {
  const currentTimeUtc = dayjs().utc(true)
  const publishedTimeUtc = dayjs(dateString).utc(true)

  const timeUnitMappings: [dayjs.ManipulateType, string][] = [
    ['year', 'a'],
    ['month', 'm'],
    ['day', 'd'],
    ['hour', 'h'],
    ['minute', 'min'],
  ]

  for (const [timeUnit, unitLabel] of timeUnitMappings) {
    const timeDifference = currentTimeUtc.diff(publishedTimeUtc, timeUnit)
    if (timeDifference > 0) {
      return `${timeDifference}${unitLabel}`
    }
  }

  return 'agora'
}

/**
 * Converts a raw date string into a localized, human-readable format.
 * @param rawDate - The raw date string to be parsed (ISO format recommended).
 * @param locale - Optional locale string (e.g., 'pt-BR', 'en-US'). Defaults to 'pt-BR'.
 * @returns A localized full date string (e.g., 'domingo, 28 de junho de 2025 18:00') or the original `rawDate` if the date is invalid.
 * @example
 * formatToLocaleHumanDate('2025-06-28T18:00:00Z') // 'sábado, 28 de junho de 2025 às 15:00'
 * formatToLocaleHumanDate('Sat, 28 Jun 2025 18:00:00 +0000', 'en') // 'Saturday, June 28, 2025 3:00 PM'
 * formatToLocaleHumanDate('invalid-date') // 'invalid-date'
 */
export const formatToLocaleHumanDate = (rawDate: string, locale: string = 'pt-BR') => {
  const date = dayjs(rawDate).utc(true).locale(locale)

  if (!date.isValid()) {
    return rawDate
  }

  return date.format('LLLL')
}
