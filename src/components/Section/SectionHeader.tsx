import { Box, BoxRow } from '../Box/boxStyles'

import { TextLabel, TextTitle } from '../Text/textStyles'

type Props = {
  title: string
  status?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export function SectionHeader({ title, leftIcon, rightIcon, status }: Props) {
  return (
    <BoxRow
      alignItems="center"
      paddingHorizontal="s16"
      paddingVertical="s12"
      borderRadius="medium"
      backgroundColor="sectionBackground"
      gap="s8"
    >
      <BoxRow flex={1} alignItems="center">
        {leftIcon}
        <Box flex={1}>
          <TextLabel textPreset="smallMedium" color="primaryAlternate" textAlign="center">
            {status}
          </TextLabel>
        </Box>
      </BoxRow>

      <Box maxWidth={'40%'} alignItems="center">
        <TextTitle textPreset="mediumBold" textAlign="center">
          {title}
        </TextTitle>
      </Box>

      <BoxRow gap="s16" flex={1} flexWrap="wrap" justifyContent="flex-end">
        {rightIcon}
      </BoxRow>
    </BoxRow>
  )
}
