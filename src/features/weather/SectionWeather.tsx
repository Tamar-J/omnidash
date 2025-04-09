import { Box, SectionContainer, SectionHeader } from '@/components'

export function SectionWeather() {
  return (
    <SectionContainer>
      <SectionHeader title={'Clima'} status={''} />
      <Box borderRadius="medium" backgroundColor="sectionListBackground" gap="s10">
        {/* ForecastDayCard */}
      </Box>
    </SectionContainer>
  )
}
