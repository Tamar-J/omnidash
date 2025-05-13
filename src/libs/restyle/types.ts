import {
  LayoutProps,
  SpacingProps,
  TypographyProps,
  BackgroundColorProps,
  OpacityProps,
  VisibleProps,
  ShadowProps,
  PositionProps,
  BorderProps,
  TextShadowProps,
  ColorProps,
} from '@shopify/restyle'

import type { ThemeType } from '@/themes'

type MapTokenProps<Keys extends string, TokenKey extends keyof ThemeType> = {
  [K in Keys]?: keyof ThemeType[TokenKey]
}

type BorderColorKeys =
  | 'borderColor'
  | 'borderTopColor'
  | 'borderBottomColor'
  | 'borderLeftColor'
  | 'borderRightColor'
  | 'borderStartColor'
  | 'borderEndColor'

type TextColorKeys = 'color' | 'textDecorationColor'

type CustomBorderColorProps = MapTokenProps<BorderColorKeys, 'borderColors'>
type CustomTextColorProps = MapTokenProps<TextColorKeys, 'textColors'>

type CustomBorderProps<Theme extends ThemeType = ThemeType> = Omit<BorderProps<Theme>, BorderColorKeys> & CustomBorderColorProps
type CustomColorProps<Theme extends ThemeType = ThemeType> = Omit<ColorProps<Theme>, TextColorKeys> & CustomTextColorProps

type BaseRestyleProps<Theme extends ThemeType = ThemeType> = LayoutProps<Theme> &
  SpacingProps<Theme> &
  OpacityProps<Theme> &
  VisibleProps<Theme> &
  PositionProps<Theme>

type BoxRestyleProps<Theme extends ThemeType = ThemeType> = BaseRestyleProps<Theme> &
  BackgroundColorProps<Theme> &
  CustomBorderProps<Theme> &
  ShadowProps<Theme>

type TextRestyleProps<Theme extends ThemeType = ThemeType> = BaseRestyleProps<Theme> &
  TextShadowProps<Theme> &
  TypographyProps<Theme> &
  CustomColorProps<Theme>

export type CustomRestyleBoxProps = BoxRestyleProps
export type CustomRestyleTextProps = TextRestyleProps
export type CustomRestyleTextInputProps = BoxRestyleProps & TextRestyleProps
