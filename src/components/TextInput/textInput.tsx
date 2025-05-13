import { TextInput as RNTextInput } from 'react-native'
import {
  backgroundColor,
  createRestyleComponent,
  layout,
  opacity,
  position,
  shadow,
  spacing,
  typography,
  useTheme,
  visible,
} from '@shopify/restyle'

import { customBorder, customColor, CustomRestyleTextInputProps } from '@/libs/restyle'

import { ThemeType } from '@/themes'

type CreateBaseTextInputProps = CustomRestyleTextInputProps & React.ComponentProps<typeof RNTextInput>

const BaseTextInput = createRestyleComponent<CreateBaseTextInputProps, ThemeType>(
  [customColor, customBorder, backgroundColor, opacity, visible, spacing, layout, position, shadow, typography],
  RNTextInput
)

export const TextInput = ({ ...rest }: CreateBaseTextInputProps) => {
  const { textColors } = useTheme<ThemeType>()
  return (
    <BaseTextInput
      color="primary"
      flex={1}
      placeholderTextColor={textColors.placeholder}
      cursorColor={textColors.highlightPrimary}
      {...rest}
    />
  )
}
