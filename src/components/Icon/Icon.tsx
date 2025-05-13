import { TouchableOpacityProps } from 'react-native'
import { IconWeight } from 'phosphor-react-native'
import { useTheme } from '@shopify/restyle'

import { IconSizesKeyType, TextColorsKeyType, ThemeType, WeatherIconSizesKeyType } from '@/themes'

import { IconMap, IconMapKeyType, iconSVGMap, IconSVGMapKeyType } from './iconPresets'

import { BoxProps, TouchableBox } from '../Box/boxStyles'

export type IconProps = {
  iconName: IconMapKeyType
  iconWeight?: IconWeight
  iconSize?: IconSizesKeyType
  iconColor?: TextColorsKeyType
}

export function Icon({ iconName, iconWeight = 'regular', iconSize = 'small', iconColor = 'primary' }: IconProps) {
  const { textColors, iconsSize } = useTheme<ThemeType>()

  const IconComponent = IconMap[iconName]

  return <IconComponent size={iconsSize[iconSize]} weight={iconWeight} color={textColors[iconColor]} />
}

type TouchableIconProps = IconProps &
  BoxProps &
  TouchableOpacityProps & {
    handlePressIcon: () => void
    boxDimension?: number
  }

export function TouchableIcon({
  iconName,
  iconWeight,
  iconColor,
  iconSize = 'small',
  boxDimension,
  handlePressIcon,
  ...rest
}: TouchableIconProps) {
  const { iconsSize } = useTheme<ThemeType>()

  const boxSize = boxDimension || iconsSize[iconSize] + 6

  return (
    <TouchableBox
      width={boxSize}
      height={boxSize}
      onPress={handlePressIcon}
      justifyContent="center"
      alignItems="center"
      {...rest}
    >
      <Icon iconName={iconName} iconWeight={iconWeight} iconColor={iconColor} iconSize={iconSize} />
    </TouchableBox>
  )
}

export type IconSVGProps = {
  iconName: IconSVGMapKeyType
  iconSize?: WeatherIconSizesKeyType
}

export function IconSVG({ iconName, iconSize = 'medium' }: IconSVGProps) {
  const { weatherIconsSize } = useTheme<ThemeType>()

  const size = weatherIconsSize[iconSize]

  const IconSVGComponent = iconSVGMap[iconName]

  return <IconSVGComponent width={size} height={size} testID="icon-svg" />
}
