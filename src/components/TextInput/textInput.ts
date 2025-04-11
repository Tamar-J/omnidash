import { TextInputProps } from 'react-native'

import styled from 'styled-components/native'

export const TextInput = styled.TextInput.attrs<TextInputProps>(({ placeholderTextColor, cursorColor, theme }) => {
  return {
    placeholderTextColor: placeholderTextColor ?? theme.colors.texts.placeholder,
    cursorColor: cursorColor ?? theme.colors.texts.highlightPrimary,
  }
})`
  flex: 1;
  color: ${({ theme }) => theme.colors.texts.primary};
`
