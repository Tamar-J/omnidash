import { useCallback, useEffect, useRef, useState } from 'react'

import { useUserLocation } from '@/hooks/useUserLocation'
import { useWeather } from '@/hooks/useWeather'

import { UserLocationDataProps } from '@/services/geocodingServices'

export function useSectionWeather() {
  const [latitude, setLatitude] = useState<number | undefined>()
  const [longitude, setLongitude] = useState<number | undefined>()

  const [isCurrentWeatherVisible, setIsCurrentWeatherVisible] = useState(true)
  const [isDailyWeatherVisible, setIsDailyWeatherVisible] = useState(true)
  const [isHourlyWeatherVisible, setIsHourlyWeatherVisible] = useState(true)

  const userLocationDataRef = useRef<UserLocationDataProps | undefined | null>(null)

  const { userLocationData, refetchUserLocation } = useUserLocation(latitude, longitude)
  const { weatherData, isLoading, isFetching, refetchWeather, isError } = useWeather(userLocationData)

  const toggleCurrentWeather = () => {
    setIsCurrentWeatherVisible((previewState) => {
      return !previewState
    })
  }
  const toggleDailyWeather = () => {
    setIsDailyWeatherVisible((previewState) => {
      return !previewState
    })
  }
  const toggleHourlyWeather = () => {
    setIsHourlyWeatherVisible((previewState) => {
      return !previewState
    })
  }

  let resourcesData = [
    { title: 'Clima Atual', isActive: isCurrentWeatherVisible, toggleSwitch: toggleCurrentWeather },
    { title: 'Clima Diário', isActive: isDailyWeatherVisible, toggleSwitch: toggleDailyWeather },
    { title: 'Clima Hora em Hora', isActive: isHourlyWeatherVisible, toggleSwitch: toggleHourlyWeather },
  ]

  const handlePressUserLocation = (latitude: number, longitude: number) => {
    setLatitude(latitude)
    setLongitude(longitude)
    // closeModal()
  }

  const resetUserLocationState = useCallback(() => {
    setLatitude(undefined)
    setLongitude(undefined)
  }, [])

  useEffect(() => {
    if (latitude && longitude) {
      refetchUserLocation()
    }
  }, [latitude, longitude, refetchUserLocation])

  useEffect(() => {
    if (userLocationData) {
      if (userLocationDataRef.current === null) {
        userLocationDataRef.current = userLocationData
        refetchUserLocation()
        return
      }

      const hasUserLocationDataChanged = userLocationDataRef.current !== userLocationData

      if (hasUserLocationDataChanged) {
        userLocationDataRef.current = userLocationData

        refetchWeather()
        resetUserLocationState()
      }
    }
  }, [userLocationData, resetUserLocationState, refetchWeather, refetchUserLocation])

  return {
    isCurrentWeatherVisible,
    isDailyWeatherVisible,
    isHourlyWeatherVisible,
    resourcesData,
    weatherData,
    isLoading,
    isFetching,
    isError,
    handlePressUserLocation,
  }
}
