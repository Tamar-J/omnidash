import { getCurrentDate, getCurrentWeekDayName } from '../dateUtils'

describe('getCurrentData', () => {
  beforeAll(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date(2025, 2, 25, 0, 0, 0))
  })

  afterAll(() => {
    jest.useRealTimers()
  })
  it('should return the current date in the default format "DD/MM/YYYY"', () => {
    const date = getCurrentDate()
    expect(date).toBe('25/03/2025')
  })
  it('should return the current date in the custom format when a format string is provided', () => {
    const customDate = getCurrentDate('DD-MM-YYYY')
    expect(customDate).toBe('25-03-2025')
  })
})

describe('getCurrentWeekDayName', () => {
  beforeAll(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date(2025, 2, 25, 0, 0, 0))
  })

  afterAll(() => {
    jest.useRealTimers()
  })
  it('should return the full name of the current weekday when format is "full" or no format value is provided', () => {
    const defaultDate = getCurrentWeekDayName()
    const dateWithFull = getCurrentWeekDayName('full')

    expect(defaultDate).toBe('Terça-feira')
    expect(dateWithFull).toBe('Terça-feira')
  })

  it('should return the abbreviated name of the current weekday when format is "short"', () => {
    const dateWithShort = getCurrentWeekDayName('short')

    expect(dateWithShort).toBe('Ter')
  })

  it('should return the weekday name without suffix when format is "withoutSuffix" (portuguese only)', () => {
    const dateWithoutSuffix = getCurrentWeekDayName('withoutSuffix')

    expect(dateWithoutSuffix).toBe('Terça')
  })
})
