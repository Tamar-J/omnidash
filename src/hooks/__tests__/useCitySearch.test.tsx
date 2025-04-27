import { act, renderHook, waitFor } from 'test-utils'

import { useCitySearch } from '../useCitySearch'

import { getLocationByCity } from '@/services/geocodingServices'

jest.mock('@/services/geocodingServices', () => ({
  getLocationByCity: jest.fn(),
}))

const mockData = [
  {
    name: 'São Paulo',
    lat: -23.5506507,
    lon: -46.6333824,
    country: 'BR',
    state: 'São Paulo',
  },
  {
    name: 'Sao Paulo',
    lat: -29.1298857,
    lon: -51.9879887,
    country: 'BR',
    state: 'Rio Grande do Sul',
  },
]

describe('useCitySearch', () => {
  const initialUserInputSearch = ''
  const defaultDelay = 1000 // 1s

  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('should return data after debounce', async () => {
    ;(getLocationByCity as jest.Mock).mockResolvedValue(mockData)
    const userInputSearch = 'Sao Paulo'

    const { result, rerender } = renderHook(({ search }) => useCitySearch(search), {
      initialProps: { search: initialUserInputSearch },
    })

    rerender({ search: userInputSearch })

    act(() => jest.advanceTimersByTime(defaultDelay - 1))
    expect(getLocationByCity).not.toHaveBeenCalled()

    act(() => jest.advanceTimersByTime(1))
    expect(getLocationByCity).toHaveBeenCalledWith(userInputSearch)

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData)
    })
  })

  it('should return hasNoResults when no data found', async () => {
    ;(getLocationByCity as jest.Mock).mockResolvedValue([])
    const userInputSearch = 'Cidade Inexistente'

    const { result, rerender } = renderHook(({ search }) => useCitySearch(search), {
      initialProps: { search: initialUserInputSearch },
    })

    rerender({ search: userInputSearch })

    act(() => jest.advanceTimersByTime(defaultDelay - 1))
    expect(getLocationByCity).not.toHaveBeenCalled()

    act(() => jest.advanceTimersByTime(1))
    expect(getLocationByCity).toHaveBeenCalledWith(userInputSearch)

    await waitFor(() => {
      expect(result.current.hasNoResults).toBe(true)
      expect(result.current.data).toEqual([])
    })
  })
})
