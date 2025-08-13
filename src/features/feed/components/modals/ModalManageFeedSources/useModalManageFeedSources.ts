import { useCallback, useRef, useState } from 'react'

import { storage } from '@/libs/storage/storage'
import { FEED_SOURCES_KEY } from '@/libs/storage/storageKeys'
import { queryClient } from '@/libs/reactQuery/queryClient'

import { FeedSourcesProps } from '../../../types'

import { addFeedRssSourcesService } from '../../../services/addFeedRssSourcesService'

export function useModalManageFeedSources() {
  const [userFeedsData, setUserFeedsData] = useState<FeedSourcesProps[]>(storage.getItem(FEED_SOURCES_KEY) || [])

  const [userInput, setUserInput] = useState('')

  const userInputRef = useRef(userInput) // prevents unnecessary rerenders
  userInputRef.current = userInput

  const handleUserInput = useCallback((input: string) => {
    setUserInput(input.replace(/^http[s]*?:\/\//, ''))
  }, [])

  const handlePressAddFeed = async () => {
    if (userInputRef.current) {
      const feed = userInputRef.current.replace(/^http[s]*?:\/\//, '')

      await addFeedRssSourcesService(`https://${feed}`)
      setUserFeedsData(storage.getItem(FEED_SOURCES_KEY) || [])
      setUserInput('')
    }
  }

  const handlePressDeleteFeed = useCallback((id: string) => {
    setUserFeedsData((prevData) => {
      const feedData = prevData.filter((feed) => feed.id !== id)
      storage.setItem(FEED_SOURCES_KEY, feedData)
      queryClient.invalidateQueries({ queryKey: [FEED_SOURCES_KEY] })

      return feedData
    })
  }, [])

  return {
    userFeedsData,
    userInput,
    handleUserInput,
    handlePressAddFeed,
    handlePressDeleteFeed,
  }
}
