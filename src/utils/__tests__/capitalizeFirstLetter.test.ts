import { capitalizeFirstLetter } from '../capitalizeFirstLetter'

describe('capitalizeFirstLetter', () => {
  it('should return the first letter of the string capitalized', () => {
    const capitalized = capitalizeFirstLetter('test')
    expect(capitalized).toBe('Test')
  })
  it('should try to capitalize only the first letter found', () => {
    const stringWithSymbols = capitalizeFirstLetter('#12 * test')
    expect(stringWithSymbols).toBe('#12 * Test')
  })
  it('should return the same string if the first letter is already capitalized', () => {
    const alreadyCapitalized = capitalizeFirstLetter('1 Same Letter')
    expect(alreadyCapitalized).toBe('1 Same Letter')
  })
})
