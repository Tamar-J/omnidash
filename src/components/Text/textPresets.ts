import { theme } from '@/themes/theme'

export const textPresets = {
  display: {
    smallMedium: {
      fontFamily: theme.fontFamilies.medium,
      fontSize: theme.sizes.fonts.displaySmall,
      textAlign: 'auto',
      lineHeight: 40,
      letterSpacing: 0,
    },
    smallLight: {
      fontFamily: theme.fontFamilies.light,
      fontSize: theme.sizes.fonts.displaySmall,
      textAlign: 'auto',
      lineHeight: 40,
      letterSpacing: 0,
    },
  },
  title: {
    mediumBold: {
      fontFamily: theme.fontFamilies.bold,
      fontSize: theme.sizes.fonts.titleMedium,
      textAlign: 'center',
      lineHeight: 24,
      letterSpacing: 0.15,
    },
    smallMedium: {
      fontFamily: theme.fontFamilies.medium,
      fontSize: theme.sizes.fonts.titleSmall,
      textAlign: 'center',
      lineHeight: 20,
      letterSpacing: 0.1,
    },
  },
  body: {
    largeRegular: {
      fontFamily: theme.fontFamilies.regular,
      fontSize: theme.sizes.fonts.bodyLarge,
      textAlign: 'auto',
      lineHeight: 20,
      letterSpacing: 0.5,
    },
    mediumRegular: {
      fontFamily: theme.fontFamilies.regular,
      fontSize: theme.sizes.fonts.bodyMedium,
      textAlign: 'auto',
      lineHeight: 20,
      letterSpacing: 0.25,
    },
    smallRegular: {
      fontFamily: theme.fontFamilies.regular,
      fontSize: theme.sizes.fonts.bodySmall,
      lineHeight: 16,
      letterSpacing: 0.4,
    },
    mediumMedium: {
      fontFamily: theme.fontFamilies.medium,
      fontSize: theme.sizes.fonts.bodyMedium,
      textAlign: 'auto',
      lineHeight: 20,
      letterSpacing: 0.25,
    },
  },
  label: {
    smallMedium: {
      fontFamily: theme.fontFamilies.medium,
      fontSize: theme.sizes.fonts.labelSmall,
      textAlign: 'auto',
      lineHeight: 16,
      letterSpacing: 0,
    },
  },
} as const

export type TextPresetsType = typeof textPresets
export type TextPresetsCategoryKeyType = keyof TextPresetsType
export type TextPresetsCategoryVariantKeyType<T extends TextPresetsCategoryKeyType> = keyof TextPresetsType[T] //'smallMedium' | 'smallLight' | ...
