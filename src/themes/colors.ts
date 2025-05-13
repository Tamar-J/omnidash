export const palette = {
  orange: '#FF8C00',
  blue: '#3B82F6',
  blue50: '#3B82F680',
  green: '#007E00',
  red: '#EA3949',
  transparent: 'transparent',
  gradient: {
    night: ['#2A2477', '#382D74'],
    day: ['#026C8C', '#2F5183'],
  },
  gray: {
    900: '#13131A',
    800: '#16161F',
    700: '#1C1C27',
    600: '#22222F',
    500: '#3B3B54',
    400: '#7C7C8A',
    300: '#ABABC4',
    200: '#BFBFD4',
    100: '#FAFAFA',
  },
  black50: '#00000080',
} as const

export const defaultColors = {
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
  texts: {
    primary: palette.gray[100],
    primaryAlternate: palette.gray[200],
    placeholder: palette.gray[300],
    highlightPrimary: palette.orange,
    highlightSecondary: palette.blue,
  },
  borders: {
    primary: palette.gray[100],
    secondary: palette.black50,
  },
}
type DefaultColorsType = typeof defaultColors
export type BackgroundColorsKeyType = keyof DefaultColorsType['backgrounds']
export type BorderColorsKeyType = keyof DefaultColorsType['borders']
export type TextColorsKeyType = keyof DefaultColorsType['texts']
