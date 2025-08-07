import { CurrentWeatherCard, ForecastDayCard, ForecastHourCard, ModalLocation } from './components'

import { Box, ModalToggleResources, SectionContainer, TouchableIcon, SectionHeader } from '@/components'

import { ActiveModal, useSectionWeather } from './useSectionWeather'

export function SectionWeather() {
  const {
    openModal,
    closeModal,
    handlePressUserLocation,
    isCurrentWeatherVisible,
    isDailyWeatherVisible,
    isError,
    isFetching,
    isHourlyWeatherVisible,
    isLoading,
    isLocationModalVisible,
    isToggleResourcesModalVisible,
    resourcesData,
    weatherData,
  } = useSectionWeather()

  return (
    <SectionContainer>
      <SectionHeader
        title={'Clima'}
        status={
          isError ? 'offline'
          : isLoading || isFetching ?
            'carregando...'
          : ''
        }
        rightIcon={
          <>
            <TouchableIcon
              iconName="mapPin"
              iconWeight="bold"
              iconColor={Boolean(weatherData) || isLoading ? 'primary' : 'highlightPrimary'}
              handlePressIcon={() => openModal(ActiveModal.LOCATION)}
            />
            <TouchableIcon
              iconName="dotsThreeOutlineVertical"
              iconWeight="fill"
              handlePressIcon={() => openModal(ActiveModal.TOGGLE_RESOURCES)}
            />
          </>
        }
      />
      {!isLoading && weatherData && (
        <Box borderRadius="medium" backgroundColor="sectionListBackground" gap="s10">
          {isCurrentWeatherVisible && <CurrentWeatherCard data={weatherData.currentData} />}
          {isHourlyWeatherVisible && <ForecastHourCard data={weatherData.hourlyData} />}
          {isDailyWeatherVisible && <ForecastDayCard data={weatherData.dailyData} />}
        </Box>
      )}
      {isToggleResourcesModalVisible && (
        <ModalToggleResources
          isModalVisible={isToggleResourcesModalVisible}
          closeModal={closeModal}
          resourcesData={resourcesData}
        />
      )}
      {(isLocationModalVisible || !weatherData) && (
        <ModalLocation
          isModalVisible={isLocationModalVisible}
          closeModal={closeModal}
          handlePressUserLocation={handlePressUserLocation}
        />
      )}
    </SectionContainer>
  )
}
