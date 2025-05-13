import { ActivityIndicator } from 'react-native'
import { useTheme } from '@shopify/restyle'

import { AllSizesKeyType, TextColorsKeyType, ThemeType } from '@/themes'

import { BoxProps, BoxCenter } from '../Box/boxStyles'

type LoadingProps = {
  color?: TextColorsKeyType
  size?: AllSizesKeyType
}

type LoadingScreenProps = BoxProps & LoadingProps

export function Loading({ color = 'highlightPrimary', size = 's32' }: LoadingProps) {
  const { spacing, textColors } = useTheme<ThemeType>()

  return <ActivityIndicator color={textColors[color]} size={spacing[size]} />
}

export function LoadingScreen({ color, size, backgroundColor = 'background', ...rest }: LoadingScreenProps) {
  return (
    <BoxCenter flex={1} backgroundColor={backgroundColor} {...rest}>
      <Loading color={color} size={size} />
    </BoxCenter>
  )
}
