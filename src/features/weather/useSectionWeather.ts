import { useCallback, useEffect, useRef, useState } from 'react'

import { useUserLocation } from '@/hooks/useUserLocation'
import { useWeather } from '@/hooks/useWeather'

import { UserLocationDataProps } from '@/services/geocodingServices'

import { storage } from '@/services/storage/storage'
import { CURRENT_WEATHER_CARD_KEY, DAILY_WEATHER_CARD_KEY, HOURLY_WEATHER_CARD_KEY } from '@/services/storage/storageKeys'

export enum ActiveModal {
  NONE = 0,
  LOCATION = 1,
  TOGGLE_RESOURCES = 2,
}

export function useSectionWeather() {
  const [latitude, setLatitude] = useState<number | undefined>()
  const [longitude, setLongitude] = useState<number | undefined>()

  const [isCurrentWeatherVisible, setIsCurrentWeatherVisible] = useState(false)
  const [isDailyWeatherVisible, setIsDailyWeatherVisible] = useState(false)
  const [isHourlyWeatherVisible, setIsHourlyWeatherVisible] = useState(false)

  const [activeModal, setActiveModal] = useState(ActiveModal.NONE)

  const userLocationDataRef = useRef<UserLocationDataProps | undefined | null>(null)

  const { userLocationData, refetchUserLocation } = useUserLocation(latitude, longitude)
  const { weatherData, isLoading, isFetching, refetchWeather, isError } = useWeather(userLocationData)

  const isLocationModalVisible = activeModal === ActiveModal.LOCATION
  const isToggleResourcesModalVisible = activeModal === ActiveModal.TOGGLE_RESOURCES

  const openModal = useCallback((modal: ActiveModal) => setActiveModal(modal), [])
  const closeModal = () => setActiveModal(ActiveModal.NONE)

  const toggleCurrentWeather = () => {
    setIsCurrentWeatherVisible((previewState) => {
      storage.setItem(CURRENT_WEATHER_CARD_KEY, !previewState)
      return !previewState
    })
  }
  const toggleDailyWeather = () => {
    setIsDailyWeatherVisible((previewState) => {
      storage.setItem(DAILY_WEATHER_CARD_KEY, !previewState)
      return !previewState
    })
  }
  const toggleHourlyWeather = () => {
    setIsHourlyWeatherVisible((previewState) => {
      storage.setItem(HOURLY_WEATHER_CARD_KEY, !previewState)
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
    closeModal()
  }

  const resetUserLocationState = useCallback(() => {
    setLatitude(undefined)
    setLongitude(undefined)
  }, [])

  useEffect(() => {
    const loadCards = async () => {
      const [currentCard, dailyCard, hourlyCard] = await Promise.all([
        storage.getItem(CURRENT_WEATHER_CARD_KEY),
        storage.getItem(DAILY_WEATHER_CARD_KEY),
        storage.getItem(HOURLY_WEATHER_CARD_KEY),
      ])

      setIsCurrentWeatherVisible(currentCard ?? true)
      setIsDailyWeatherVisible(dailyCard ?? true)
      setIsHourlyWeatherVisible(hourlyCard ?? true)
    }

    loadCards()
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
