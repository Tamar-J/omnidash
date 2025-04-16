import { convertToPx } from '../convertToPx'

describe('convertToPx', () => {
  it('should convert a number to a string with "px" appended', () => {
    const number = convertToPx(10)
    const floatNumber = convertToPx(0.5)
    const negativeNumber = convertToPx(-25)
    const zero = convertToPx(0)

    expect(number).toBe('10px')
    expect(floatNumber).toBe('0.5px')
    expect(negativeNumber).toBe('-25px')
    expect(zero).toBe('0px')
  })

  it('should return the same string if input is already a string, regardless of format', () => {
    const plainNumberString = convertToPx('100')
    const stringWithCustomUnit = convertToPx('20dp')
    const alreadyHasPx = convertToPx('30px')

    expect(plainNumberString).toBe('100')
    expect(stringWithCustomUnit).toBe('20dp')
    expect(alreadyHasPx).toBe('30px')
  })
})
