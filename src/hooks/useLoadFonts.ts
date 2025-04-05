import { useFonts } from 'expo-font'

export const useLoadFonts = () => {
  const areFontsLoaded = useFonts({
    Roboto_Light: require('../../assets/fonts/Roboto-Light.ttf'),
    Roboto_Regular: require('../../assets/fonts/Roboto-Regular.ttf'),
    Roboto_Medium: require('../../assets/fonts/Roboto-Medium.ttf'),
    Roboto_Bold: require('../../assets/fonts/Roboto-Bold.ttf'),
  })

  return areFontsLoaded
}
