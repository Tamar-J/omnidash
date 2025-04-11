import { FlatList, KeyboardAvoidingView, Platform } from 'react-native'

import { useModalLocation } from './useModalLocation'

import { GeoDirectResultProps } from '@/api/geocodingApi'

import {
  Box,
  BoxCenter,
  BoxRow,
  Icon,
  ModalContainer,
  TextBody,
  TextInput,
  TextTitle,
  TouchableBox,
  TouchableIcon,
} from '@/components'

export type ModalLocationProps = {
  isModalVisible: boolean
  closeModal: () => void
  handlePressUserLocation: (latitude: number, longitude: number) => void
}

export function ModalLocation({ closeModal, isModalVisible, handlePressUserLocation }: ModalLocationProps) {
  const { cityData, handleCitySelected, handleGPSLocation, handleUserInput, userInput, hasNoResults } = useModalLocation({
    closeModal,
    handlePressUserLocation,
  })

  return (
    <ModalContainer isModalVisible={isModalVisible} onRequestClose={closeModal}>
      <Box
        borderWidth={1}
        padding="s24"
        flex={1}
        gap="s24"
        borderRadius="large"
        backgroundColor="sectionListBackground"
        maxHeight={500}
        maxWidth={450}
      >
        <TouchableIcon
          backgroundColor="translucentBlack"
          iconName="x"
          iconWeight="bold"
          handlePressIcon={closeModal}
          position="absolute"
          top={-30}
          alignSelf="flex-end"
          borderRadius="full"
        />
        <BoxRow alignItems="center">
          <Box flex={1} alignItems="flex-end" paddingHorizontal="s30">
            <Icon iconName="mapPin" iconWeight="bold" />
          </Box>
          <TextTitle textPreset="mediumBold" textAlign="center">
            {'Escolha a Localização\npara o Clima'}
          </TextTitle>
          <Box flex={1} alignItems="flex-start" paddingHorizontal="s30">
            <Icon iconName="mapPin" iconWeight="bold" />
          </Box>
        </BoxRow>
        <Box gap="s10" flex={1}>
          <TouchableBox onPress={handleGPSLocation}>
            <BoxRow
              backgroundColor="buttonSecondary50"
              width={'100%'}
              alignItems="center"
              justifyContent="center"
              gap="s10"
              borderWidth={0.5}
              borderRadius="full"
              paddingHorizontal="s24"
              paddingVertical="s16"
            >
              <Icon iconName="crosshair" iconWeight="bold" />
              <TextTitle textPreset="smallMedium" color="primary">
                Usar Localização Atual
              </TextTitle>
            </BoxRow>
          </TouchableBox>

          <Box gap={'s6'} flex={1}>
            <BoxRow
              backgroundColor="textInputBackground"
              width={'100%'}
              alignItems="center"
              gap={'s10'}
              borderWidth={0.5}
              borderRadius="full"
              paddingHorizontal="s16"
              paddingVertical="s6"
            >
              <Icon iconName="magnifyingGlass" />
              <TextInput value={userInput} onChangeText={handleUserInput} placeholder="Digite o Endereço" />
            </BoxRow>

            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <Box borderWidth={cityData && cityData.length > 0 ? 0.5 : 0} borderRadius="medium" overflow="hidden">
                <FlatList
                  data={cityData ?? []}
                  keyExtractor={({ lat, lon }, index) => `${lat}, ${lon}, ${index}`}
                  renderItem={({ item }) => <CityNameItem handlePressUserLocation={handleCitySelected} data={item} />}
                  ListEmptyComponent={() => (
                    <BoxCenter>
                      {hasNoResults && (
                        <TextBody textPreset="mediumRegular" color="highlightPrimary">
                          Nada encontrado
                        </TextBody>
                      )}
                    </BoxCenter>
                  )}
                  keyboardShouldPersistTaps={'handled'}
                />
              </Box>
            </KeyboardAvoidingView>
          </Box>
        </Box>
      </Box>
    </ModalContainer>
  )
}

type CityNameItemProps = {
  data: GeoDirectResultProps
  handlePressUserLocation: (data: GeoDirectResultProps) => void
}

const CityNameItem = ({ handlePressUserLocation, data }: CityNameItemProps) => {
  const { lat: latitude, lon: longitude, name, state, country: countryCode } = data

  const cityName = `${name}${state ? ' - ' + state : ''}`
  const latitudeLongitude = `${latitude}, ${longitude}`

  const handleCitySelected = () => handlePressUserLocation(data)

  return (
    <TouchableBox onPress={handleCitySelected}>
      <Box paddingVertical="s12" paddingHorizontal="s16" backgroundColor="textInputListBackground" borderWidth={0.5}>
        <BoxRow alignItems="center" gap="s10">
          <BoxCenter borderWidth={0.5} borderRadius="full" width={25} height={25}>
            <TextBody textPreset="smallRegular" color="primary">
              {countryCode}
            </TextBody>
          </BoxCenter>

          <TextBody textPreset="mediumRegular" color="primary">
            *
          </TextBody>
          <Box flex={1}>
            <TextTitle textPreset="smallMedium" color="primary">
              {cityName}
            </TextTitle>
            <TextBody textPreset="smallRegular" color="primaryAlternate">
              {latitudeLongitude}
            </TextBody>
          </Box>
        </BoxRow>
      </Box>
    </TouchableBox>
  )
}
