const fontWeightMap = {
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
} as const

type FontWeightMapKeyType = keyof typeof fontWeightMap

export const getFontWeightFromFamily = (fontFamily: string) => {
  const matchWithFontFamily = fontFamily.match(/(Light|Regular|Medium|Bold)/i)

  if (matchWithFontFamily) {
    const weightKey = matchWithFontFamily[0].toLowerCase() as FontWeightMapKeyType
    return fontWeightMap[weightKey]
  }

  return fontWeightMap.regular
}
