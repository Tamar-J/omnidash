import { BoxCenter, Icon, TextDisplay } from '@/components'

export const NoImagePlaceholder = () => {
  return (
    <BoxCenter width={300} height={200} borderRadius="medium" gap="s8" backgroundColor="sectionListBackground">
      <BoxCenter backgroundColor="inactive" borderRadius="full" padding="s4">
        <Icon iconName="rssSimple" iconSize="large" iconWeight="bold" />
      </BoxCenter>
      <TextDisplay textPreset="smallMedium">Sem Imagem</TextDisplay>
    </BoxCenter>
  )
}
