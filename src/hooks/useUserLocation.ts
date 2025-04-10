import { useQuery, useQueryClient } from '@tanstack/react-query'

import { USER_LOCATION_KEY } from '@/services/queryKeys'

import { getGPSCoordinates } from '@/services/locationServices'
import { getLocationByCoordinates, UserLocationDataProps } from '@/services/geocodingServices'

type CoordinatesProps = {
  latitude: number
  longitude: number
}
const isSameCoordinates = (coord1: CoordinatesProps, coord2: CoordinatesProps) => {
  return coord1.latitude.toFixed(3) === coord2.latitude.toFixed(3) && coord1.longitude.toFixed(3) === coord2.longitude.toFixed(3)
}

const resolveUserLocation = async (
  latitude?: number,
  longitude?: number,
  cachedData?: UserLocationDataProps
): Promise<UserLocationDataProps | undefined> => {
  try {
    const prevCoordinates = cachedData?.coordinates

    if (latitude && longitude) {
      const newCoordinates = { latitude, longitude }

      const isNewCoordinatesSameAsPrevCoordinates = prevCoordinates && isSameCoordinates(newCoordinates, prevCoordinates)

      if (isNewCoordinatesSameAsPrevCoordinates) return cachedData

      return await getLocationByCoordinates(latitude, longitude)
    }

    const isGPSBasedLocation = cachedData?.userLocationBy !== 'cityName'
    const gpsCoordinates = await getGPSCoordinates()

    if (!isGPSBasedLocation || !gpsCoordinates) return cachedData

    const isGpsCoordinatesSameAsPrevCoordinates = prevCoordinates && isSameCoordinates(gpsCoordinates, prevCoordinates)

    if (isGpsCoordinatesSameAsPrevCoordinates) return cachedData

    const newLocationData = await getLocationByCoordinates(gpsCoordinates.latitude, gpsCoordinates.longitude)

    const isSameLocation =
      newLocationData.city === cachedData?.city &&
      newLocationData.state === cachedData?.state &&
      newLocationData.countryCode === cachedData?.countryCode

    return isSameLocation ? { ...cachedData, coordinates: gpsCoordinates } : newLocationData
  } catch (error) {
    __DEV__ && console.error('Failed to fetch user location', error)
    throw error
  }
}

export const useUserLocation = (latitude?: number, longitude?: number) => {
  const cachedData = useQueryClient().getQueryData<UserLocationDataProps>([USER_LOCATION_KEY])

  const {
    data: userLocationData,
    isLoading: isLoadingUserLocation,
    isError: isErrorUserLocation,
    refetch: refetchUserLocation,
    isSuccess: isSuccessUserLocation,
    isFetching,
    isRefetching,
  } = useQuery({
    // eslint-disable-next-line
    queryKey: [USER_LOCATION_KEY],
    queryFn: () => resolveUserLocation(latitude, longitude, cachedData),
    staleTime: 1000 * 60 * 10,
    gcTime: Infinity,
    enabled: Boolean(cachedData) || (Boolean(latitude) && Boolean(longitude)),
  })

  return {
    refetchUserLocation,
    userLocationData,
    isLoadingUserLocation,
    isErrorUserLocation,
    isSuccessUserLocation,
    isFetching,
    isRefetching,
  }
}
