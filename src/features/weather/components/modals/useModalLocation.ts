import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import * as Location from 'expo-location'

import { useCitySearch } from '@/hooks/useCitySearch'

import { GeoDirectResultProps } from '@/api/geocodingApi'

import { USER_LOCATION_KEY } from '@/services/queryKeys'

import { ModalLocationProps } from './ModalLocation'

import { dayjs } from '@/libs/dayjs'

export function useModalLocation({ closeModal, handlePressUserLocation }: Omit<ModalLocationProps, 'isModalVisible'>) {
  const [userInput, setUserInput] = useState('')

  const queryClient = useQueryClient()
  const { data: cityData, hasNoResults } = useCitySearch(userInput)

  const handleGPSLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      throw new Error('Permission to access location was denied')
    }

    let location = await Location.getCurrentPositionAsync({})

    return handlePressUserLocation(location.coords.latitude, location.coords.longitude)
  }

  const handleUserInput = (input: string) => {
    setUserInput(input)
  }

  const handleCitySelected = (data: GeoDirectResultProps) => {
    const lastFetchedAt = dayjs().utc(true).toISOString()
    queryClient.setQueryData([USER_LOCATION_KEY], {
      coordinates: { latitude: data.lat, longitude: data.lon },
      city: data.name,
      state: data.state,
      countryCode: data.country,
      userLocationBy: 'cityName',
      lastFetchedAt,
    })
    closeModal()
  }

  return { cityData, handleCitySelected, handleUserInput, handleGPSLocation, userInput, hasNoResults }
}
