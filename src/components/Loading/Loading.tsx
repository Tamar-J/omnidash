import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components/native'

import { AllSizesKeyType, TextColorsKeyType } from '@/themes'

import { BoxProps, BoxCenter } from '../Box/boxStyles'

type LoadingProps = {
  color?: TextColorsKeyType
  size?: AllSizesKeyType
}

type LoadingScreenProps = BoxProps & LoadingProps

export function Loading({ color = 'highlightPrimary', size = 's32' }: LoadingProps) {
  const { colors, sizes } = useTheme()

  return <ActivityIndicator color={colors.texts[color]} size={sizes.allSizes[size]} />
}

export function LoadingScreen({ color, size, backgroundColor = 'background', ...rest }: LoadingScreenProps) {
  return (
    <BoxCenter flex={1} backgroundColor={backgroundColor} {...rest}>
      <Loading color={color} size={size} />
    </BoxCenter>
  )
}
