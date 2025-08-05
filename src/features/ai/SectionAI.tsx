import { AiCard, ModalInfo } from './components'

import { MarkdownSimpleText, ModalToggleResources, SectionContainer, SectionHeader, TouchableIcon } from '@/components'

import { ActiveModal, useSectionAi } from './useSectionAi'

export function SectionAi() {
  const {
    aiWeatherInsight,
    closeModal,
    isAiWeatherInsightCardVisible,
    isModalInfoVisible,
    isModalToggleResourcesVisible,
    openModal,
    resourcesData,
    isLoading,
    isFetching,
    isError,
  } = useSectionAi()

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
      {isAiWeatherInsightCardVisible && !isLoading && aiWeatherInsight && (
        <AiCard title="Insights de Clima" textContent={aiWeatherInsight} handlePressLeftIcon={() => openModal(ActiveModal.INFO)}>
          {aiWeatherInsight && <MarkdownSimpleText textToNormalize={aiWeatherInsight} />}
        </AiCard>
      )}
      {isModalInfoVisible && (
        <ModalInfo
          isInfoVisible={isModalInfoVisible}
          closeModal={closeModal}
          title={'Clima com IA'}
          description="A IA analisa os dados meteorológicos e fornece insights de forma mais compreensível do que simplesmente números."
        />
      )}
      {isModalToggleResourcesVisible && (
        <ModalToggleResources
          isModalVisible={isModalToggleResourcesVisible}
          closeModal={closeModal}
          resourcesData={resourcesData}
        />
      )}
    </SectionContainer>
  )
}
