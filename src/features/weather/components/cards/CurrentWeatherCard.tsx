import React from 'react'

import {
  Box,
  BoxCenter,
  BoxRow,
  Icon,
  TextBody,
  TextDisplay,
  TextLabel,
  TextTitle,
  Division,
  DivisionLine,
  BoxGradient,
  IconSVG,
  IconSVGMapKeyType,
} from '@/components'

import { WeatherInfoRow } from '../WeatherInfoRow'

type CurrentWeatherCardProps = {
  weekDay: string //Sexta-feira
  date: string //17/01/2025
  temp: number //28
  tempUnit: string //°C
  minMaxTemp: string //26° / 32°
  weatherDescription: string //Céu Limpo
  location: string //São Paulo - SP
  isDay: boolean
  iconName: IconSVGMapKeyType
  weatherAlert: string // Alerta amarelo de chuvas para sua área
  rainChance: number // 50
  humidity: number // 80
  windSpeed: number // 2
  uvi: number // 5
}

type Props = {
  data: CurrentWeatherCardProps
}

export function CurrentWeatherCard({ data }: Props) {
  const {
    weekDay,
    date,
    temp,
    tempUnit,
    minMaxTemp,
    weatherDescription,
    location,
    isDay,
    weatherAlert,
    rainChance,
    humidity,
    windSpeed,
    uvi,
    iconName,
  } = data

  const isAPriorityAlert = /^Alert\s/i.test(weatherAlert)
  const gradient = isDay ? 'gradientDay' : 'gradientNight'

  return (
    <BoxGradient
      presetType={gradient}
      borderWidth={0.5}
      borderColor="primary"
      borderRadius="medium"
      paddingVertical="s22"
      paddingHorizontal="s16"
      alignItems="center"
      justifyContent="center"
      gap="s12"
      maxWidth={450}
    >
      <BoxRow>
        <BoxCenter paddingLeft="s12" flex={1} gap="s10" minWidth={190} justifyContent="space-between">
          <BoxRow gap="s6">
            <TextTitle textPreset="smallMedium">{weekDay}</TextTitle>
            <TextBody textPreset="mediumRegular">{date}</TextBody>
          </BoxRow>

          <BoxRow gap="s10">
            <IconSVG iconSize="large" iconName={iconName} />

            <BoxCenter>
              <TextDisplay textPreset="smallMedium" color="highlightPrimary">
                {temp}
                <TextDisplay textPreset="smallLight">{tempUnit}</TextDisplay>
              </TextDisplay>
              <TextLabel textPreset="smallMedium">{minMaxTemp}</TextLabel>
            </BoxCenter>
          </BoxRow>
          <Box maxWidth={170}>
            <TextBody textPreset="smallRegular" color="primary" textAlign="center">
              {weatherDescription}
            </TextBody>
          </Box>
        </BoxCenter>

        <Division />

        <Box paddingHorizontal="s12" flex={1} minWidth={190} paddingBottom="s16" justifyContent="space-between">
          <BoxRow flex={1} gap="s10" alignItems="center" paddingBottom="s30">
            <Icon iconName="mapPinArea" />
            <Box flex={1}>
              <TextTitle textPreset="smallMedium" textAlign="center">
                {location}
              </TextTitle>
            </Box>
          </BoxRow>
          <BoxRow justifyContent="space-between" flexWrap="wrap" width={160} gap="s5">
            <WeatherInfoRow
              leftIcon={<Icon iconName="cloudRain" />}
              presetType="highlight"
              weatherValue={rainChance}
              weatherUnit={'%'}
            />
            <WeatherInfoRow
              leftIcon={<Icon iconName="drop" />}
              presetType="highlight"
              weatherValue={humidity}
              weatherUnit={'%'}
              minWidth={62}
            />
            <WeatherInfoRow
              leftIcon={<Icon iconName="wind" />}
              presetType="highlight"
              weatherValue={windSpeed}
              weatherUnit={'km/h'}
            />
            <WeatherInfoRow
              leftIcon={<Icon iconName="sun" />}
              presetType="highlight"
              weatherValue={uvi}
              weatherUnit={'UV'}
              minWidth={62}
            />
          </BoxRow>
        </Box>
      </BoxRow>

      {weatherAlert && (
        <>
          <DivisionLine />

          <Box flex={1}>
            <TextBody textPreset="smallRegular" color={isAPriorityAlert ? 'highlightPrimary' : 'primary'} textAlign="center">
              {weatherAlert}
            </TextBody>
          </Box>
        </>
      )}
    </BoxGradient>
  )
}
