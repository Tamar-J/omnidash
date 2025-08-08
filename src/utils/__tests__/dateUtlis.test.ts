import { formatToLocaleHumanDate, getCurrentDate, getCurrentWeekDayName, getTimeSinceDateShort } from '../dateUtils'

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

describe('getTimeSinceDateShort', () => {
  beforeEach(() => {
    const fakeNow = new Date('2025-07-09T12:00:00Z')
    jest.useFakeTimers().setSystemTime(fakeNow)
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should return years ("a") when difference is over 1 year', () => {
    expect(getTimeSinceDateShort('2020-07-09T12:00:00Z')).toBe('5a')
  })

  it('should return months ("m") when difference is over 1 month but less than 1 year', () => {
    expect(getTimeSinceDateShort('2025-04-09T12:00:00Z')).toBe('3m')
  })

  it('should return days ("d") when difference is over 1 day but less than 1 month', () => {
    expect(getTimeSinceDateShort('2025-07-05T12:00:00Z')).toBe('4d')
  })

  it('should return hours ("h") when difference is over 1 hour but less than 1 day', () => {
    expect(getTimeSinceDateShort('2025-07-09T08:00:00Z')).toBe('4h')
  })

  it('should return minutes ("min") when difference is over 1 minute but less than 1 hour', () => {
    expect(getTimeSinceDateShort('2025-07-09T11:55:00Z')).toBe('5min')
  })

  it('should return "agora" when difference is less than 1 minute', () => {
    expect(getTimeSinceDateShort('2025-07-09T11:59:30Z')).toBe('agora')
  })
})

describe('formatToLocaleHumanDate', () => {
  it('returns localized date in default pt-BR format', () => {
    const result = formatToLocaleHumanDate('Sat, 28 Jun 2025 19:56:20 +0000')
    expect(result).toMatch(/sábado, 28 de junho de 2025 às/)
  })

  it('handles ISO dates with time and returns correct time in locale', () => {
    const result = formatToLocaleHumanDate('2025-06-28T18:00:00Z', 'en')
    expect(result).toMatch(/Saturday, June 28, 2025/)
  })

  it('preserves original string if date is invalid', () => {
    const raw = 'not-a-date'
    const result = formatToLocaleHumanDate(raw)
    expect(result).toBe(raw)
  })
})
