import { Box, BoxRow, Icon, ModalContainer, TextBody, TextTitle, TouchableIcon } from '@/components'

type Props = {
  isInfoVisible: boolean
  title: string
  description: string
  closeModal: () => void
}
export function ModalInfo({ isInfoVisible, closeModal, title, description }: Props) {
  return (
    <ModalContainer isModalVisible={isInfoVisible} onRequestClose={closeModal}>
      <Box
        borderWidth={1}
        padding="s24"
        paddingBottom="s54"
        gap="s24"
        borderRadius="large"
        backgroundColor="sectionListBackground"
      >
        <TouchableIcon
          backgroundColor="translucentBlack"
          iconName="x"
          iconWeight="bold"
          handlePressIcon={closeModal}
          position="absolute"
          top={-30}
          alignSelf="flex-end"
          borderRadius="full"
        />
        <BoxRow alignItems="center">
          <Box flex={1} alignItems="flex-end" paddingHorizontal="s30">
            <Icon iconName="info" iconWeight="bold" />
          </Box>
          <TextTitle textPreset="mediumBold">{title}</TextTitle>
          <Box flex={1} alignItems="flex-start" paddingHorizontal="s30">
            <Icon iconName="headCircuit" iconWeight="bold" />
          </Box>
        </BoxRow>
        <Box>
          <TextBody textPreset="mediumRegular" textAlign="justify">
            {description}
          </TextBody>
        </Box>
      </Box>
    </ModalContainer>
  )
}
