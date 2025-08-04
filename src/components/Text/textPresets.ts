import { theme } from '@/themes/theme'

export const textPresets = {
  display: {
    smallMedium: {
      fontFamily: theme.fontFamilies.medium,
      fontSize: theme.fontSizes.displaySmall,
      textAlign: 'auto',
      lineHeight: 40,
      letterSpacing: 0,
    },
    smallLight: {
      fontFamily: theme.fontFamilies.light,
      fontSize: theme.fontSizes.displaySmall,
      textAlign: 'auto',
      lineHeight: 40,
      letterSpacing: 0,
    },
  },
  title: {
    LargeBold: {
      fontFamily: theme.fontFamilies.bold,
      fontSize: theme.fontSizes.titleLarge,
      textAlign: 'center',
      lineHeight: 26,
      letterSpacing: 0.15,
    },
    mediumBold: {
      fontFamily: theme.fontFamilies.bold,
      fontSize: theme.fontSizes.titleMedium,
      textAlign: 'center',
      lineHeight: 24,
      letterSpacing: 0.15,
    },
    smallMedium: {
      fontFamily: theme.fontFamilies.medium,
      fontSize: theme.fontSizes.titleSmall,
      textAlign: 'center',
      lineHeight: 20,
      letterSpacing: 0.1,
    },
  },
  body: {
    largeRegular: {
      fontFamily: theme.fontFamilies.regular,
      fontSize: theme.fontSizes.bodyLarge,
      textAlign: 'auto',
      lineHeight: 20,
      letterSpacing: 0.5,
    },
    mediumRegularItalic: {
      fontFamily: theme.fontFamilies.regularItalic,
      fontSize: theme.fontSizes.bodyMedium,
      textAlign: 'auto',
      lineHeight: 20,
      letterSpacing: 0.25,
    },
    mediumRegular: {
      fontFamily: theme.fontFamilies.regular,
      fontSize: theme.fontSizes.bodyMedium,
      textAlign: 'auto',
      lineHeight: 20,
      letterSpacing: 0.25,
    },
    smallRegular: {
      fontFamily: theme.fontFamilies.regular,
      fontSize: theme.fontSizes.bodySmall,
      lineHeight: 16,
      letterSpacing: 0.4,
    },
    mediumMediumItalic: {
      fontFamily: theme.fontFamilies.mediumItalic,
      fontSize: theme.fontSizes.bodyMedium,
      textAlign: 'auto',
      lineHeight: 20,
      letterSpacing: 0.25,
    },
    mediumMedium: {
      fontFamily: theme.fontFamilies.medium,
      fontSize: theme.fontSizes.bodyMedium,
      textAlign: 'auto',
      lineHeight: 20,
      letterSpacing: 0.25,
    },
  },
  label: {
    smallMediumItalic: {
      fontFamily: theme.fontFamilies.mediumItalic,
      fontSize: theme.fontSizes.labelSmall,
      textAlign: 'auto',
      lineHeight: 16,
      letterSpacing: 0,
    },
    smallMedium: {
      fontFamily: theme.fontFamilies.medium,
      fontSize: theme.fontSizes.labelSmall,
      textAlign: 'auto',
      lineHeight: 16,
      letterSpacing: 0,
    },
  },
} as const

export type TextPresetsType = typeof textPresets
export type TextPresetsCategoryKeyType = keyof TextPresetsType
export type TextPresetsCategoryVariantKeyType<T extends TextPresetsCategoryKeyType> = keyof TextPresetsType[T] //'smallMedium' | 'smallLight' | ...
