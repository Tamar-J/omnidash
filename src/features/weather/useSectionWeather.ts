import { useCallback, useEffect, useRef, useState } from 'react'
import { useMMKVBoolean } from 'react-native-mmkv'

import { CURRENT_WEATHER_CARD_KEY, DAILY_WEATHER_CARD_KEY, HOURLY_WEATHER_CARD_KEY } from '@/libs/storage/storageKeys'

import { useUserLocation } from '@/hooks/useUserLocation'
import { useWeather } from '@/features/weather/hooks/useWeather'

import { UserLocationDataProps } from '@/services/geocodingServices'

export enum ActiveModal {
  NONE = 0,
  LOCATION = 1,
  TOGGLE_RESOURCES = 2,
}

export function useSectionWeather() {
  const [latitude, setLatitude] = useState<number | undefined>()
  const [longitude, setLongitude] = useState<number | undefined>()

  const [isCurrentWeatherVisible = true, setIsCurrentWeatherVisible] = useMMKVBoolean(CURRENT_WEATHER_CARD_KEY)
  const [isDailyWeatherVisible = true, setIsDailyWeatherVisible] = useMMKVBoolean(DAILY_WEATHER_CARD_KEY)
  const [isHourlyWeatherVisible = true, setIsHourlyWeatherVisible] = useMMKVBoolean(HOURLY_WEATHER_CARD_KEY)

  const [activeModal, setActiveModal] = useState(ActiveModal.NONE)

  const { userLocationData, refetchUserLocation } = useUserLocation(latitude, longitude)
  const { weatherData, isLoading, isFetching, refetchWeather, isError } = useWeather(userLocationData)

  const userLocationDataRef = useRef<UserLocationDataProps | undefined>(userLocationData)

  const isLocationModalVisible = activeModal === ActiveModal.LOCATION
  const isToggleResourcesModalVisible = activeModal === ActiveModal.TOGGLE_RESOURCES

  const openModal = useCallback((modal: ActiveModal) => setActiveModal(modal), [])
  const closeModal = () => setActiveModal(ActiveModal.NONE)

  const toggleCurrentWeather = () => {
    setIsCurrentWeatherVisible(!isCurrentWeatherVisible)
  }
  const toggleDailyWeather = () => {
    setIsDailyWeatherVisible(!isDailyWeatherVisible)
  }
  const toggleHourlyWeather = () => {
    setIsHourlyWeatherVisible(!isHourlyWeatherVisible)
  }

  let resourcesData = [
    { title: 'Clima Atual', isActive: isCurrentWeatherVisible, toggleSwitch: toggleCurrentWeather },
    { title: 'Clima Diário', isActive: isDailyWeatherVisible, toggleSwitch: toggleDailyWeather },
    { title: 'Clima Hora em Hora', isActive: isHourlyWeatherVisible, toggleSwitch: toggleHourlyWeather },
  ]

  const handlePressUserLocation = (latitude: number, longitude: number) => {
    setLatitude(latitude)
    setLongitude(longitude)
    closeModal()
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
      const hasUserLocationDataChanged = userLocationDataRef.current !== userLocationData

      if (hasUserLocationDataChanged) {
        userLocationDataRef.current = userLocationData

        refetchWeather()
        resetUserLocationState()
      }
    }
  }, [userLocationData, resetUserLocationState, refetchWeather])

  return {
    isLocationModalVisible,
    isToggleResourcesModalVisible,
    isCurrentWeatherVisible,
    isDailyWeatherVisible,
    isHourlyWeatherVisible,
    openModal,
    closeModal,
    resourcesData,
    weatherData,
    isLoading,
    isFetching,
    isError,
    handlePressUserLocation,
  }
}
