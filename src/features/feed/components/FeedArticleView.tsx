import { FeedArticleHeader } from './FeedArticleHeader'
import { FeedArticleContent } from './FeedArticleContent/FeedArticleContent'

import { Box, BoxSafe } from '@/components'

import { FeedArticleProps } from '../types'

type FeedArticleViewProps = {
  data: FeedArticleProps
  goBack: () => void
}

export const FeedArticleView = ({ data, goBack }: FeedArticleViewProps) => {
  return (
    <BoxSafe flex={1}>
      <FeedArticleHeader link={data.link} goBack={goBack} />
      <Box>
        <Box width={'100%'} gap="s10">
          <FeedArticleContent data={data} />
        </Box>
      </Box>
    </BoxSafe>
  )
}
