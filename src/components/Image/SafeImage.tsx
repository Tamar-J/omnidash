import { useState } from 'react'
import { StyleProp } from 'react-native'
import { Image, ImageLoadEventData, ImageStyle } from 'expo-image'

import { TextBody } from '../Text/textStyles'

import { cleanImageUrl } from '@/utils'

type SafeImageProps = {
  uri: string
  style?: StyleProp<ImageStyle>
  blockedMessage?: string
}

export const SafeImage = ({ uri, style, blockedMessage = 'Imagem bloqueada' }: SafeImageProps) => {
  const [isImageBlocked, setIsImageBlocked] = useState(false)

  const imageSrc = cleanImageUrl(uri)
  const onImageLoad = (event: ImageLoadEventData) => {
    const { width, height } = event.source
    if (width <= 5 && height <= 5) {
      __DEV__ && console.warn('Possible Tracking Pixel:', `${width}x${height}`, uri)
      setIsImageBlocked(true)
    }
  }

  const onImageError = (error: any) => {
    __DEV__ && console.error('Error loading image:', error)
  }

  if (isImageBlocked || imageSrc === null) {
    return (
      <TextBody textPreset="mediumRegular" color="highlightPrimary">
        ({blockedMessage})
      </TextBody>
    )
  }

  return <Image source={{ uri: imageSrc }} style={style} onLoad={onImageLoad} onError={onImageError} />
}
