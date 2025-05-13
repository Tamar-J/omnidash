import { border, color, createRestyleFunction, RestyleFunctionContainer } from '@shopify/restyle'

import type { ThemeType } from '@/themes'

function remapThemeKey<
  RFunctions extends readonly RestyleFunctionContainer<any, ThemeType, any, any>[],
  NewKey extends keyof ThemeType,
>(
  restyleFunctions: RFunctions,
  newThemeKey: NewKey
): {
  [Index in keyof RFunctions]: RFunctions[Index] extends RestyleFunctionContainer<infer Props, ThemeType, infer PropName, any> ?
    RestyleFunctionContainer<Props, ThemeType, PropName, NewKey>
  : RFunctions[Index]
} {
  return restyleFunctions.map((restyleFunction) =>
    restyleFunction.themeKey === 'colors' ?
      createRestyleFunction({
        property: restyleFunction.property!,
        themeKey: newThemeKey,
      })
    : restyleFunction
  ) as any
}

export const customBorder = remapThemeKey(border, 'borderColors')
export const customColor = remapThemeKey(color, 'textColors')
