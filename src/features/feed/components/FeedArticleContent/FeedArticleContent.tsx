import { ScrollView } from 'react-native'
import { Image } from 'expo-image'

import { TagList } from '../TagList'

import { Box, BoxCenter, BoxRow, Loading, MarkdownSimpleText, TextBody, TextLabel, TextTitle, TouchableBox } from '@/components'

import { FeedArticleProps } from '../../types'

import { useFeedArticleContent } from './useFeedArticleContent'

import { openLink } from '@/utils'

type FeedArticleContentProps = {
  data: FeedArticleProps
}

export const FeedArticleContent = ({ data }: FeedArticleContentProps) => {
  const { article, articleBrief, handleGenerateBrief, isLoadingArticleBrief, pubDate } = useFeedArticleContent(data)

  const { creator, title, siteName, categories = [] } = data
  const handleVisitSite = () => openLink(data.link)

  return (
    <ScrollView contentContainerStyle={{ gap: 10, paddingHorizontal: 16, paddingBottom: 100, flexGrow: 1 }}>
      <Box paddingBottom="s8" gap="s8">
        <TextTitle textPreset="LargeBold" textAlign="left">
          {title}
        </TextTitle>
        <Box>
          <BoxRow gap="s4" alignItems="center">
            <Image source={{ uri: data.faviconUrl }} style={{ width: 16, height: 16, borderRadius: 100 }} />
            <TextTitle textPreset="smallMedium" textAlign="left">
              {siteName}
            </TextTitle>
          </BoxRow>
          <TextLabel textPreset="smallMedium">
            - {creator} {creator && ' • '} {pubDate}
          </TextLabel>
        </Box>
        <TagList tags={categories} />
        {article.length > 22 && (
          <TextLabel textPreset="smallMedium" color="highlightSecondary" onPress={handleVisitSite}>
            Ver matéria no site ↗
          </TextLabel>
        )}
      </Box>
      {article}
      {articleBrief && (
        <Box backgroundColor="sectionListBackground" borderRadius="small" padding="s8">
          <MarkdownSimpleText textToNormalize={articleBrief} />
        </Box>
      )}
      <BoxCenter flex={1} marginTop="s16">
        <TouchableBox
          width={'100%'}
          borderRadius="medium"
          borderWidth={0.5}
          maxWidth={400}
          padding="s16"
          onPress={handleGenerateBrief}
          disabled={isLoadingArticleBrief}
        >
          <BoxCenter flex={1} height={20}>
            {isLoadingArticleBrief ?
              <Loading size="s18" />
            : <TextBody textPreset="mediumRegular">Resumo IA</TextBody>}
          </BoxCenter>
        </TouchableBox>
      </BoxCenter>
      <BoxCenter flex={1}>
        <TouchableBox
          width={'100%'}
          borderRadius="medium"
          borderWidth={0.5}
          maxWidth={400}
          padding="s16"
          onPress={handleVisitSite}
        >
          <BoxCenter flex={1} height={20}>
            <TextBody textPreset="mediumRegular">Visitar Site</TextBody>
          </BoxCenter>
        </TouchableBox>
      </BoxCenter>
    </ScrollView>
  )
}
