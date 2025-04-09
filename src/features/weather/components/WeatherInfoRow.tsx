import React from 'react'

import { BoxProps, BoxRow, TextBody } from '@/components'

type WeatherInfoRowProps = BoxProps & {
  weatherValue: string | number
  weatherUnit: string | number
  presetType?: 'highlight' | 'normal'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const WeatherInfoRow = ({ weatherValue, weatherUnit, presetType, leftIcon, rightIcon, ...rest }: WeatherInfoRowProps) => {
  return (
    <BoxRow alignItems="center" gap="s5" {...rest}>
      {leftIcon}
      <BoxRow>
        {presetType !== 'highlight' ?
          <TextBody textPreset="mediumRegular" color="primary">
            {weatherValue}
            {weatherUnit === 'º' ? '' : ' '}
            {weatherUnit}
          </TextBody>
        : <>
            <TextBody textPreset="mediumMedium" color="highlightPrimary">
              {weatherValue}
              {weatherUnit === 'º' ? '' : ' '}
            </TextBody>
            <TextBody textPreset="mediumRegular" color="primary">
              {weatherUnit}
            </TextBody>
          </>
        }
      </BoxRow>
      {rightIcon}
    </BoxRow>
  )
}
