import { TouchableOpacityProps } from 'react-native'
import { IconWeight } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'

import { IconSizesKeyType, TextColorsKeyType, WeatherIconSizesKeyType } from '@/themes'

import { IconMap, IconMapKeyType, iconSVGMap, IconSVGMapKeyType } from './iconPresets'

import { BoxProps, TouchableBox } from '../Box/boxStyles'

export type IconProps = {
  iconName: IconMapKeyType
  iconWeight?: IconWeight
  iconSize?: IconSizesKeyType
  iconColor?: TextColorsKeyType
}

export function Icon({ iconName, iconWeight = 'regular', iconSize = 'small', iconColor = 'primary' }: IconProps) {
  const { colors, sizes } = useTheme()

  const IconComponent = IconMap[iconName]

  return <IconComponent size={sizes.icons[iconSize]} weight={iconWeight} color={colors.texts[iconColor]} />
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
  const { sizes } = useTheme()

  const boxSize = boxDimension || sizes.icons[iconSize] + 6

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
  const { sizes } = useTheme()

  const size = sizes.weatherIcons[iconSize]

  const IconSVGComponent = iconSVGMap[iconName]

  return <IconSVGComponent width={size} height={size} testID="icon-svg" />
}
