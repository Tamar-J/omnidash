export const sizes = {
  s2: 2,
  s4: 4,
  s5: 5,
  s6: 6,
  s8: 8,
  s10: 10,
  s11: 11,
  s12: 12,
  s14: 14,
  s16: 16,
  s18: 18,
  s22: 22,
  s24: 24,
  s30: 30,
  s32: 32,
  s34: 34,
  s36: 36,
  s54: 54,
  s100: 100,
} as const

export const defaultSizes = {
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
} as const

type DefaultSizesType = typeof defaultSizes
export type AllSizesKeyType = keyof typeof sizes
export type FontsSizesKeyType = keyof DefaultSizesType['fonts']
export type BorderRadiiKeyType = keyof DefaultSizesType['borderRadii']
export type IconSizesKeyType = keyof DefaultSizesType['icons']
export type WeatherIconSizesKeyType = keyof DefaultSizesType['weatherIcons']
