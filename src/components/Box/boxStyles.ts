import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { DefaultTheme } from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient'
import styled, { css } from 'styled-components/native'

import { AllSizesKeyType, BackgroundColorsKeyType, BorderColorsKeyType, BorderRadiiKeyType } from '@/themes'

import { gradientPresets, GradientPresetsKeyType } from './boxGradientPresets'
import { boxPresets } from './boxPresets'

import { convertToPx } from '@/utils'

type PercentageProp = `${number}%`

export type BoxProps = {
  flex?: number
  flexDirection?: 'row' | 'column'
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch'
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'
  alignSelf?: 'auto' | 'baseline' | 'flex-start' | 'center' | 'flex-end' | 'stretch'
  backgroundColor?: BackgroundColorsKeyType
  borderRadius?: BorderRadiiKeyType
  borderTopRadius?: BorderRadiiKeyType
  borderBottomRadius?: BorderRadiiKeyType
  borderWidth?: number | string
  borderBottomWidth?: number | string
  borderColor?: BorderColorsKeyType
  padding?: AllSizesKeyType | PercentageProp
  paddingTop?: AllSizesKeyType | PercentageProp
  paddingBottom?: AllSizesKeyType | PercentageProp
  paddingLeft?: AllSizesKeyType | PercentageProp
  paddingRight?: AllSizesKeyType | PercentageProp
  paddingVertical?: AllSizesKeyType | PercentageProp
  paddingHorizontal?: AllSizesKeyType | PercentageProp
  margin?: AllSizesKeyType | PercentageProp
  width?: number | PercentageProp
  minWidth?: number | PercentageProp
  maxWidth?: number | PercentageProp
  height?: number | PercentageProp
  minHeight?: number | PercentageProp
  maxHeight?: number | PercentageProp
  gap?: AllSizesKeyType
  overflow?: 'hidden' | 'visible' | 'scroll'
  zIndex?: number
  position?: 'absolute' | 'relative'
  top?: number | string
  left?: number | string
  right?: number | string
  bottom?: number | string
}

type BoxGradientProps = BoxProps &
  Partial<LinearGradientProps> & {
    presetType?: GradientPresetsKeyType
  }

const applyBoxStyles = (boxProps: any, ...boxPresets: BoxProps[]) => {
  const mergedObjectProps = Object.assign({}, ...boxPresets, boxProps)

  const {
    flex,
    flexDirection,
    flexWrap,
    alignItems,
    justifyContent,
    alignSelf,
    backgroundColor,
    borderRadius,
    borderWidth,
    borderColor,
    borderBottomWidth,
    borderTopRadius,
    borderBottomRadius,
    padding,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingVertical,
    paddingHorizontal,
    margin,
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    gap,
    overflow,
    zIndex,
    position,
    top,
    left,
    right,
    bottom,
  }: BoxProps = mergedObjectProps

  return ({ theme }: { theme: DefaultTheme }) => css`
    ${flex != null && `flex: ${flex};`}
    ${flexDirection && `flex-direction: ${flexDirection};`}
    ${flexWrap && `flex-Wrap: ${flexWrap};`}
    ${alignItems && `align-items: ${alignItems};`}
    ${justifyContent && `justify-content: ${justifyContent};`}
    ${alignSelf && `align-self: ${alignSelf};`}
    ${backgroundColor && `background-color: ${theme.colors.backgrounds[backgroundColor]};`}
    ${borderRadius && `border-radius: ${convertToPx(theme.sizes.borderRadii[borderRadius])};`}
    ${borderTopRadius && `border-top-left-radius: ${convertToPx(theme.sizes.borderRadii[borderTopRadius])};`}
    ${borderTopRadius && `border-top-right-radius: ${convertToPx(theme.sizes.borderRadii[borderTopRadius])};`}
    ${borderBottomRadius && `border-bottom-left-radius: ${convertToPx(theme.sizes.borderRadii[borderBottomRadius])};`}
    ${borderBottomRadius && `border-bottom-right-radius: ${convertToPx(theme.sizes.borderRadii[borderBottomRadius])};`}
    ${borderWidth != null && `border-width: ${convertToPx(borderWidth)};`} 
    ${borderBottomWidth != null && `border-bottom-width: ${convertToPx(borderBottomWidth)};`} 
    ${borderColor && `border-color: ${theme.colors.borders[borderColor]};`}
    ${padding && `padding: ${convertToPx(theme.sizes.allSizes[padding as AllSizesKeyType] ?? padding)};`}
    ${paddingTop && `padding-top: ${convertToPx(theme.sizes.allSizes[paddingTop as AllSizesKeyType] ?? paddingTop)};`}
    ${paddingBottom && `padding-bottom: ${convertToPx(theme.sizes.allSizes[paddingBottom as AllSizesKeyType] ?? paddingBottom)};`}
    ${paddingLeft && `padding-left: ${convertToPx(theme.sizes.allSizes[paddingLeft as AllSizesKeyType] ?? paddingLeft)};`}
    ${paddingRight && `padding-right: ${convertToPx(theme.sizes.allSizes[paddingRight as AllSizesKeyType] ?? paddingRight)};`}
    ${paddingVertical &&
    `padding-vertical: ${convertToPx(theme.sizes.allSizes[paddingVertical as AllSizesKeyType] ?? paddingVertical)};`}
    ${paddingHorizontal &&
    `padding-horizontal: ${convertToPx(theme.sizes.allSizes[paddingHorizontal as AllSizesKeyType] ?? paddingHorizontal)};`}
    ${margin && `margin: ${convertToPx(theme.sizes.allSizes[margin as AllSizesKeyType] ?? margin)};`}
    ${width && `width: ${convertToPx(width)};`}
    ${minWidth && `min-width: ${convertToPx(minWidth)};`}
    ${maxWidth && `max-width: ${convertToPx(maxWidth)};`}
    ${height && `height: ${convertToPx(height)};`}
    ${minHeight && `min-height: ${convertToPx(minHeight)};`}
    ${maxHeight && `max-height: ${convertToPx(maxHeight)};`}
    ${gap && `gap: ${convertToPx(theme.sizes.allSizes[gap as AllSizesKeyType] ?? gap)};`}
    ${overflow && `overflow: ${overflow};`}
    ${zIndex != null && `z-index: ${zIndex};`}
    ${position && `position: ${position};`}
    ${position === 'absolute' &&
    `
      ${top != null && `top: ${convertToPx(top)};`}
      ${left != null && `left: ${convertToPx(left)};`}
      ${right != null && `right: ${convertToPx(right)};`}
      ${bottom != null && `bottom: ${convertToPx(bottom)};`}
    `}
  `
}

export const Box = styled.View<BoxProps>`
  ${(props) => applyBoxStyles(props, boxPresets['box'])}
`

export const BoxRow = styled(Box)<BoxProps>`
  ${(props) => applyBoxStyles(props, boxPresets['boxRow'])}
`

export const BoxCenter = styled(Box)<BoxProps>`
  ${(props) => applyBoxStyles(props, boxPresets['boxCenter'])}
`

export const BoxSafe = styled(SafeAreaView)<BoxProps>`
  ${(props) => applyBoxStyles(props, boxPresets['box'], boxPresets['boxSafe'])}
`

export const BoxGradient = styled(LinearGradient as unknown as React.ComponentType<object>).attrs<BoxGradientProps>(
  ({ colors, locations, start, end, presetType }) => {
    const presetGradient = presetType ? gradientPresets[presetType] : gradientPresets.gradientDay
    return {
      colors: colors ?? presetGradient.colors,
      locations: locations ?? presetGradient.locations,
      start: start ?? presetGradient.start,
      end: end ?? presetGradient.end,
    }
  }
)<BoxGradientProps>`
  ${(props) => applyBoxStyles(props, boxPresets['box'])}
`

export type TouchableBoxProps = BoxProps & TouchableOpacityProps

export const TouchableBox = styled(TouchableOpacity)<BoxProps>`
  ${(props) => applyBoxStyles(props, boxPresets['box'])}
`
