import { AiCard, ModalAiList, ModalInfo } from './components'

import {
  Box,
  MarkdownSimpleText,
  ModalToggleResources,
  SectionContainer,
  SectionHeader,
  TextBody,
  TouchableIcon,
} from '@/components'

import { ActiveModal, InsightType, useSectionAi } from './useSectionAi'
import { ModalFeedScreen } from '../feed/components'

export function SectionAi() {
  const {
    aiWeatherInsight,
    aiFeedInsight,
    openModal,
    closeModal,
    showArticle,
    closeArticle,
    isAiWeatherInsightCardVisible,
    isAiFeedInsightCardVisible,
    isModalInfoVisible,
    isModalToggleResourcesVisible,
    isModalAiListFromInsightVisible,
    isFeedInsightOutdated,
    isLoading,
    isFetching,
    isError,
    resourcesData,
    feedArticles,
    feedArticleData,
    fetchAiFeedInsightData,
    modalInfoContent,
    handleOpenModalInfo,
    handleOpenListOfArticles,
  } = useSectionAi()

  const aiFeedInsightParts = aiFeedInsight.split(/(\[\d+(?:,\s*\d+)*\])/g)

  const feedInsightRefreshColor = isFeedInsightOutdated ? 'highlightPrimary' : 'primary'

  return (
    <SectionContainer minWidth={'40%'}>
      <SectionHeader
        title={'IA'}
        status={
          isError ? 'Offline'
          : isLoading || isFetching ?
            'carregando...'
          : ''
        }
        rightIcon={
          <TouchableIcon
            iconName="dotsThreeOutlineVertical"
            iconWeight="fill"
            handlePressIcon={() => openModal(ActiveModal.TOGGLE_SOURCES)}
          />
        }
      />
      <Box gap="s8">
        {isAiWeatherInsightCardVisible && (
          <AiCard
            title="Insights de Clima"
            textContent={aiWeatherInsight}
            handlePressLeftIcon={() => handleOpenModalInfo(InsightType.WEATHER)}
          >
            {aiWeatherInsight && <MarkdownSimpleText textToNormalize={aiWeatherInsight} />}
          </AiCard>
        )}

        {isAiFeedInsightCardVisible && (
          <AiCard
            title="Insights do Feed"
            textContent={aiFeedInsight}
            handlePressLeftIcon={() => handleOpenModalInfo(InsightType.FEED)}
            rightIcon={
              <TouchableIcon
                handlePressIcon={fetchAiFeedInsightData}
                iconColor={feedInsightRefreshColor}
                iconName="arrowClockwise"
              />
            }
          >
            {aiFeedInsight && (
              <TextBody textPreset="mediumRegular">
                {aiFeedInsightParts.map((insightPart, index) => {
                  const isReference = (index + 1) % 2 === 0

                  if (isReference) {
                    const referenceIndexes = insightPart
                    return (
                      <TextBody
                        key={`article-ai-reference-index-${index}`}
                        textPreset="mediumRegular"
                        onPress={() => handleOpenListOfArticles(referenceIndexes)}
                        color="highlightSecondary"
                        textDecorationLine="underline"
                      >
                        {referenceIndexes}
                      </TextBody>
                    )
                  }
                  return insightPart
                })}
              </TextBody>
            )}
          </AiCard>
        )}
      </Box>
      {isModalInfoVisible && modalInfoContent && (
        <ModalInfo
          isInfoVisible={isModalInfoVisible}
          closeModal={closeModal}
          title={modalInfoContent.title}
          description={modalInfoContent.description}
        />
      )}
      {isModalToggleResourcesVisible && (
        <ModalToggleResources
          isModalVisible={isModalToggleResourcesVisible}
          closeModal={closeModal}
          resourcesData={resourcesData}
        />
      )}

      {isModalAiListFromInsightVisible && (
        <ModalAiList articlesData={feedArticles} closeModal={closeModal} showArticle={showArticle} />
      )}

      {feedArticleData?.title && (
        <ModalFeedScreen closeModal={closeArticle} data={feedArticleData} isModalVisible={!!feedArticleData?.title} />
      )}
    </SectionContainer>
  )
}
