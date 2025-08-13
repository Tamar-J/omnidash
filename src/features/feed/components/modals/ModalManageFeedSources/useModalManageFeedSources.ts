import { useCallback, useState } from 'react'

import { FeedSourcesProps } from '@/features/feed/types'

export function useModalManageFeedSources() {
  const [userFeedsData, setUserFeedsData] = useState<FeedSourcesProps[]>([])
  const [userInput, setUserInput] = useState('')

  const handleUserInput = useCallback((input: string) => {
    setUserInput(input?.replace(/^http[s]*?:\/\//, ''))
  }, [])

  const handlePressAddFeed = async () => {
    __DEV__ && console.log(userInput.replace(/^http[s]*?:\/\//, ''))
    setUserFeedsData([])
  }

  const handlePressDeleteFeed = useCallback((id: string) => {
    __DEV__ && console.log('delete feed id=', id)
  }, [])

  return {
    userFeedsData,
    userInput,
    handleUserInput,
    handlePressAddFeed,
    handlePressDeleteFeed,
  }
}
