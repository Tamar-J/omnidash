import { createTheme } from '@shopify/restyle'

import { defaultColors } from './colors'
import { defaultSizes, sizes } from './sizes'

export const theme = createTheme({
  colors: defaultColors.backgrounds,
  borderColors: defaultColors.borders,
  textColors: defaultColors.texts,
  spacing: sizes,
  fontSizes: defaultSizes.fonts,
  borderRadii: defaultSizes.borderRadii,
  iconsSize: defaultSizes.icons,
  weatherIconsSize: defaultSizes.weatherIcons,
  fontFamilies: {
    light: 'Roboto_Light',
    regular: 'Roboto_Regular',
    medium: 'Roboto_Medium',
    bold: 'Roboto_Bold',
  },
  zIndices: {
    [-1]: -1,
  },
  textVariants: { defaults: {} },
} as const)

export type ThemeType = typeof theme
