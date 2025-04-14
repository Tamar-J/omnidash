import { Box, BoxRow, TouchableIcon, TextTitle, MarkdownText } from '@/components'

type IACardProps = {
  title: string
  textContent: string
  handlePressLeftIcon: () => void
  rightIcon?: React.ReactNode
}

export function AICard({ title, textContent, rightIcon, handlePressLeftIcon }: IACardProps) {
  return (
    <Box
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal="s16"
      paddingBottom="s16"
      borderRadius="medium"
      borderWidth={0.5}
      backgroundColor="sectionListBackground"
      gap="s8"
      maxWidth={450}
    >
      <BoxRow alignItems="center" justifyContent="space-between" paddingTop="s12">
        <BoxRow gap="s16" flex={1} flexWrap="wrap" justifyContent="flex-start">
          <TouchableIcon iconName="sparkle" iconWeight="bold" handlePressIcon={handlePressLeftIcon} />
        </BoxRow>

        <Box maxWidth={'40%'} alignItems="center">
          <TextTitle textPreset="smallMedium" textAlign="center">
            {title}
          </TextTitle>
        </Box>
        <BoxRow gap="s16" flex={1} flexWrap="wrap" justifyContent="flex-end">
          {rightIcon}
        </BoxRow>
      </BoxRow>

      <MarkdownText textToNormalize={textContent} />
    </Box>
  )
}
