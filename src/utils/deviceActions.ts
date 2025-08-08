import { Linking, Share } from 'react-native'

export const openLink = (link: string) => {
  Linking.openURL(link)
}

export const shareLink = async (link: string, message: string = '') => {
  try {
    await Share.share({ message: `${link} ${message}` })
  } catch (error) {
    __DEV__ && console.error('Error sharing:', error)
  }
}
