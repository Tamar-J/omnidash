import { useNavigation, useRoute } from '@react-navigation/native'

import { FeedArticleView } from '../components'

import { FeedArticleProps } from '../types'

export function FeedArticle() {
  const { goBack } = useNavigation()
  const route = useRoute()
  const params = route.params as FeedArticleProps

  return <FeedArticleView data={params} goBack={goBack} />
}
