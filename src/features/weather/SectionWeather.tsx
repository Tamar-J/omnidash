import { Box, SectionContainer, SectionHeader } from '@/components'

import { useSectionWeather } from './useSectionWeather'
import { CurrentWeatherCard } from './cards/CurrentWeatherCard'
import { ForecastHourCard } from './cards/ForecastHourCard'
import { ForecastDayCard } from './cards/ForecastDayCard'

export function SectionWeather() {
  const { isCurrentWeatherVisible, isDailyWeatherVisible, isHourlyWeatherVisible, isLoading, weatherData } = useSectionWeather()

  return (
    <SectionContainer>
      <SectionHeader title={'Clima'} status={''} />
      {!isLoading && weatherData && (
        <Box borderRadius="medium" backgroundColor="sectionListBackground" gap="s10">
          {isCurrentWeatherVisible && <CurrentWeatherCard data={weatherData.currentData} />}
          {isHourlyWeatherVisible && <ForecastHourCard data={weatherData.hourlyData} />}
          {isDailyWeatherVisible && <ForecastDayCard data={weatherData.dailyData} />}
        </Box>
      )}
    </SectionContainer>
  )
}
