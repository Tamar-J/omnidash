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
