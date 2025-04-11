import { useQuery } from '@tanstack/react-query'

import { getLocationByCity } from '@/services/geocodingServices'

import { useDebounceValue } from './useDebounceValue'

import { CITY_SEARCH_KEY } from '@/services/queryKeys'

export function useCitySearch(search: string) {
  const debouncedSearch = useDebounceValue(search)

  const { data, isFetching } = useQuery({
    queryKey: [CITY_SEARCH_KEY, debouncedSearch],
    queryFn: () => getLocationByCity(debouncedSearch),
    enabled: !!debouncedSearch,
  })

  const hasNoResults = Boolean(debouncedSearch) && !isFetching && data?.length === 0
  return { hasNoResults, data }
}
