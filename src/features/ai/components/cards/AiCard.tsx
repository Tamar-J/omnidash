import { Box, BoxRow, TouchableIcon, TextTitle } from '@/components'

type AiCardProps = {
  children?: React.ReactNode
  title: string
  textContent: string
  handlePressLeftIcon: () => void
  rightIcon?: React.ReactNode
}

export function AiCard({ title, rightIcon, handlePressLeftIcon, children }: AiCardProps) {
  return (
    <Box
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal="s16"
      paddingVertical={children ? 's16' : 's12'}
      borderRadius="medium"
      borderWidth={0.5}
      backgroundColor="sectionListBackground"
      gap="s8"
      maxWidth={450}
    >
      <BoxRow alignItems="center" justifyContent="space-between">
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
      {children}
    </Box>
  )
}
