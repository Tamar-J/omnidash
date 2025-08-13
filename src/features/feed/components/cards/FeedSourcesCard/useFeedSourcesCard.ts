import { useState } from 'react'

export function useFeedSourcesCard() {
  const [isImageError, setIsImageError] = useState(false)

  const onFaviconImageError = () => {
    setIsImageError(true)
  }

  return {
    isImageError,
    onFaviconImageError,
  }
}
