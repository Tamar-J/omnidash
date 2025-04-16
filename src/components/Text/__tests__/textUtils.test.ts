import { getFontWeightFromFamily } from '../textUtils'

describe('getFontWeightFromFamily', () => {
  it('should return 300 when the font family includes "Light"', () => {
    const fontFamilyLight = getFontWeightFromFamily('Roboto_300Light')
    const fontFamilyLight2 = getFontWeightFromFamily('Roboto-light')

    expect(fontFamilyLight).toBe(300)
    expect(fontFamilyLight2).toBe(300)
  })
  it('should return 400 when the font family includes "Regular" or no font family matches', () => {
    const fontFamilyRegular = getFontWeightFromFamily('Roboto_400regular')
    const fontFamilyRegular2 = getFontWeightFromFamily('Roboto')

    expect(fontFamilyRegular).toBe(400)
    expect(fontFamilyRegular2).toBe(400)
  })
  it('should return 500 when the font family includes "Medium"', () => {
    const fontFamilyMedium = getFontWeightFromFamily('Roboto-Medium')
    const fontFamilyMedium2 = getFontWeightFromFamily('Roboto_500Medium')

    expect(fontFamilyMedium).toBe(500)
    expect(fontFamilyMedium2).toBe(500)
  })
  it('should return 700 when the font family includes "Bold"', () => {
    const fontFamilyBold = getFontWeightFromFamily('Roboto_700Bold')
    const fontFamilyBold2 = getFontWeightFromFamily('bold')

    expect(fontFamilyBold).toBe(700)
    expect(fontFamilyBold2).toBe(700)
  })
})
