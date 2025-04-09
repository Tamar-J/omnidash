import { Box, BoxProps } from '../Box/boxStyles'

type SectionContainerProps = BoxProps & {
  children?: React.ReactNode
}

export function SectionContainer({ children, ...rest }: SectionContainerProps) {
  return (
    <Box
      overflow="hidden"
      minWidth={382}
      maxWidth={450}
      flex={1}
      borderWidth={1}
      borderColor="secondary"
      borderRadius="medium"
      backgroundColor="sectionBackground"
      {...rest}
    >
      {children}
    </Box>
  )
}
