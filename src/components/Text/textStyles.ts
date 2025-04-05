import styled, { css } from 'styled-components/native'

import { TextColorsKeyType, theme } from '@/themes/theme'

import { TextPresetsCategoryKeyType, textPresets, TextPresetsCategoryVariantKeyType } from './textPresets'
import { getFontWeightFromFamily } from './textUtils'

import { convertToPx } from '@/utils'

type TextAlignProp = 'auto' | 'center' | 'justify' | 'left' | 'right'

type PresetCSSTextProps = {
  fontFamily: (typeof theme.fontFamilies)[keyof typeof theme.fontFamilies]
  fontSize: (typeof theme.sizes.fonts)[keyof typeof theme.sizes.fonts]
  textAlign: TextAlignProp
  lineHeight: number
  letterSpacing: number
}

const presetCSSText = ({ fontFamily, fontSize, textAlign = 'auto', lineHeight, letterSpacing = 0 }: PresetCSSTextProps) => {
  return css`
    font-family: ${fontFamily};
    font-size: ${fontSize}px;
    text-align: ${textAlign};
    font-weight: ${getFontWeightFromFamily(fontFamily)};
    line-height: ${convertToPx(lineHeight)};
    letter-spacing: ${letterSpacing}px;
  `
}

type BaseTextProps<T extends TextPresetsCategoryKeyType> = {
  textPreset: TextPresetsCategoryVariantKeyType<T>
  color?: TextColorsKeyType
  textAlign?: TextAlignProp
}

export const TextDisplay = styled.Text<BaseTextProps<'display'>>`
  ${({ textPreset }) => presetCSSText(textPresets.display[textPreset] as PresetCSSTextProps)}
  color: ${({ theme, color }) => (color ? theme.colors.texts[color] : theme.colors.texts.primary)};
  text-align: ${({ textAlign }) => textAlign};
`

export const TextTitle = styled.Text<BaseTextProps<'title'>>`
  ${({ textPreset }) => presetCSSText(textPresets.title[textPreset] as PresetCSSTextProps)}
  color: ${({ theme, color }) => (color ? theme.colors.texts[color] : theme.colors.texts.primary)};
  text-align: ${({ textAlign }) => textAlign};
`

export const TextBody = styled.Text<BaseTextProps<'body'>>`
  ${({ textPreset }) => presetCSSText(textPresets.body[textPreset] as PresetCSSTextProps)}
  color: ${({ theme, color }) => (color ? theme.colors.texts[color] : theme.colors.texts.primaryAlternate)};
  text-align: ${({ textAlign }) => textAlign};
`

export const TextLabel = styled.Text<BaseTextProps<'label'>>`
  ${({ textPreset }) => presetCSSText(textPresets.label[textPreset] as PresetCSSTextProps)}
  color: ${({ theme, color }) => (color ? theme.colors.texts[color] : theme.colors.texts.primaryAlternate)};
  text-align: ${({ textAlign }) => textAlign};
`
