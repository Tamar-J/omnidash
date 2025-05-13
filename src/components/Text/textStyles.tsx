import { Text } from 'react-native'
import { createRestyleComponent, layout, opacity, spacing, textShadow, typography, visible } from '@shopify/restyle'

import { customColor, CustomRestyleTextProps } from '@/libs/restyle'

import { textPresets } from './textPresets'

import { TextColorsKeyType, ThemeType } from '@/themes'

type CreateCustomTextProps = CustomRestyleTextProps

export const TextTest = createRestyleComponent<CreateCustomTextProps, ThemeType>(
  [customColor, opacity, visible, typography, textShadow, spacing, layout],
  Text
)

const createCustomText = <T extends keyof typeof textPresets>(variant: T) => {
  type Props = CreateCustomTextProps &
    React.ComponentProps<typeof TextTest> & {
      textPreset: keyof (typeof textPresets)[T]
      children?: React.ReactNode
    }

  return function TextVariant({ textPreset, children, ...rest }: Props) {
    const textColor: TextColorsKeyType = variant === 'body' || variant === 'label' ? 'primaryAlternate' : 'primary'

    return (
      <TextTest color={textColor} {...textPresets[variant][textPreset]} {...rest}>
        {children}
      </TextTest>
    )
  }
}

export const TextDisplay = createCustomText('display')
export const TextTitle = createCustomText('title')
export const TextBody = createCustomText('body')
export const TextLabel = createCustomText('label')
