import { ScrollView, Switch } from 'react-native'
import { useTheme } from '@shopify/restyle'

import { Box, BoxRow } from '../Box/boxStyles'

import { TextBody, TextTitle } from '../Text/textStyles'

import { ModalContainer } from './ModalContainer'

import { ThemeType } from '@/themes'

type Props = {
  isModalVisible: boolean
  closeModal: () => void
  resourcesData: SwitchItemProps[]
}

export function ModalToggleResources({ isModalVisible, closeModal, resourcesData }: Props) {
  return (
    <ModalContainer type="bottom" isModalVisible={isModalVisible} onRequestClose={closeModal}>
      <Box
        borderWidth={1}
        borderBottomWidth={0}
        padding="s24"
        gap="s24"
        borderTopLeftRadius="large"
        borderTopRightRadius="large"
        backgroundColor="sectionListBackground"
        maxWidth={450}
        maxHeight={'100%'}
        width={'101%'}
      >
        <BoxRow alignItems="center">
          <Box flex={1} alignItems="flex-end" paddingHorizontal="s30" />
          <TextTitle textPreset="mediumBold">Ativar ou Desativar Recursos</TextTitle>
          <Box flex={1} alignItems="flex-start" paddingHorizontal="s30" />
        </BoxRow>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingBottom: 100 }}>
          {resourcesData.map(({ title, isActive, toggleSwitch }) => (
            <SwitchItem key={title} title={title} isActive={isActive} toggleSwitch={toggleSwitch} />
          ))}
        </ScrollView>
      </Box>
    </ModalContainer>
  )
}

type SwitchItemProps = {
  title: string
  isActive: boolean
  toggleSwitch: () => void
}

const SwitchItem = ({ title, isActive = false, toggleSwitch }: SwitchItemProps) => {
  const { colors } = useTheme<ThemeType>()

  const textColor = isActive ? 'highlightPrimary' : 'primaryAlternate'
  const trackColors = { true: colors.action, false: colors.inactive }

  return (
    <BoxRow
      width={'100%'}
      alignItems="center"
      justifyContent="space-between"
      borderWidth={0.5}
      borderRadius="full"
      paddingHorizontal="s24"
      paddingVertical="s16"
    >
      <TextBody textPreset="mediumMedium" color={textColor}>
        {title}
      </TextBody>
      <Switch value={isActive} thumbColor={'white'} trackColor={trackColors} onChange={toggleSwitch} />
    </BoxRow>
  )
}
