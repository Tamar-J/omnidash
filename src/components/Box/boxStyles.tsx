import { TouchableOpacity, View } from 'react-native'
import { backgroundColor, createRestyleComponent, layout, opacity, position, shadow, spacing, visible } from '@shopify/restyle'
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'

import { boxPresets, BoxPresetsKeyType } from './boxPresets'
import { gradientPresets, GradientPresetsKeyType } from './boxGradientPresets'

import { CustomRestyleBoxProps, customBorder } from '@/libs/restyle'

import { ThemeType } from '@/themes'

type CreateCustomBoxProps = CustomRestyleBoxProps & {
  children?: React.ReactNode
}

type PositionPointProps = {
  x: number
  y: number
}

type LinearGradientBaseProps = Omit<LinearGradientProps, 'start' | 'end' | 'colors'> & {
  presetType?: GradientPresetsKeyType
  startPoint?: PositionPointProps
  endPoint?: PositionPointProps
  colors?: [string, string, ...string[]]
  children?: React.ReactNode
}

const LinearGradientBase = ({ presetType, startPoint, endPoint, children, ...rest }: LinearGradientBaseProps) => {
  const { colors, locations } = presetType ? gradientPresets[presetType] : gradientPresets.gradientDay

  return (
    <LinearGradient colors={colors} locations={locations} {...rest} start={startPoint} end={endPoint}>
      {children}
    </LinearGradient>
  )
}

function createCustomBox<C extends React.ComponentType<any> = typeof View>(
  presetName: BoxPresetsKeyType,
  BaseComponent = View as unknown as C
) {
  const Component = createRestyleComponent<CustomRestyleBoxProps, ThemeType>(
    [backgroundColor, opacity, visible, layout, spacing, customBorder, shadow, position],
    BaseComponent
  )

  type Props = React.ComponentProps<C> & CreateCustomBoxProps

  const box = ({ children, ...rest }: Props) => {
    return (
      <Component {...boxPresets[presetName]} {...rest}>
        {children}
      </Component>
    )
  }
  return box
}

export type BoxProps = React.ComponentProps<typeof View> & CreateCustomBoxProps

export const Box = createCustomBox('box')
export const BoxRow = createCustomBox('boxRow')
export const BoxCenter = createCustomBox('boxCenter')
export const BoxSafe = createCustomBox('boxSafe', SafeAreaView)
export const BoxGradient = createCustomBox('box', LinearGradientBase)
export const TouchableBox = createCustomBox('box', TouchableOpacity)
