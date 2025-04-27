import { palette } from './colors'
import { sizes } from './sizes'

export const theme = {
  colors: {
    backgrounds: {
      buttonSecondary50: palette.blue50,
      warning: palette.red,
      action: palette.green,
      inactive: palette.gray[400],
      translucentBlack: palette.black50,
      background: palette.gray[900],
      sectionBackground: palette.gray[800],
      sectionListBackground: palette.gray[700],
      textInputBackground: palette.gray[600],
      textInputListBackground: palette.gray[500],
      division: palette.gray[100],
      transparent: palette.transparent,
    },
    gradients: {
      gradientNight: palette.gradient.night,
      gradientDay: palette.gradient.day,
    },
    borders: {
      primary: palette.gray[100],
      secondary: palette.black50,
    },
    texts: {
      primary: palette.gray[100],
      primaryAlternate: palette.gray[200],
      placeholder: palette.gray[300],
      highlightPrimary: palette.orange,
      highlightSecondary: palette.blue,
    },
  },
  fontFamilies: {
    light: 'Roboto_Light',
    regular: 'Roboto_Regular',
    medium: 'Roboto_Medium',
    bold: 'Roboto_Bold',
  },
  sizes: {
    allSizes: sizes,
    fonts: {
      displaySmall: sizes.s32,
      titleMedium: sizes.s16,
      titleSmall: sizes.s14,
      bodyLarge: sizes.s16,
      bodyMedium: sizes.s14,
      bodySmall: sizes.s12,
      labelSmall: sizes.s11,
    },
    borderRadii: {
      small: sizes.s12,
      medium: sizes.s22,
      large: sizes.s32,
      full: sizes.s54,
    },
    icons: {
      small: sizes.s18,
      large: sizes.s30,
    },
    weatherIcons: {
      medium: sizes.s36,
      large: sizes.s54,
    },
  },
} as const

export type ThemeType = typeof theme

type ColorsType = ThemeType['colors']
export type TextColorsKeyType = keyof ColorsType['texts']
export type BackgroundColorsKeyType = keyof ColorsType['backgrounds']
export type BorderColorsKeyType = keyof ColorsType['borders']

type SizesType = ThemeType['sizes']
export type AllSizesKeyType = keyof SizesType['allSizes']
export type FontsSizesKeyType = keyof SizesType['fonts']
export type BorderRadiiKeyType = keyof SizesType['borderRadii']
export type IconSizesKeyType = keyof SizesType['icons']
export type WeatherIconSizesKeyType = keyof SizesType['weatherIcons']
