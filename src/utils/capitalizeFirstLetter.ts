/**
 * Function to capitalize the first letter of a string
 * @param text - The input string
 * @returns A string with the first letter of the word capitalized
 * @example capitalizeFirstLetter('friday') //'Friday'
 * capitalizeFirstLetter('10 degrees') //'10 Degrees'
 */
export const capitalizeFirstLetter = (text: string) => {
  const firstLetterRegExp = /[a-zA-Z]/
  return text.replace(firstLetterRegExp, (firstLetter) => firstLetter.toUpperCase())
}
