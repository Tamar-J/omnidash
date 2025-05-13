import { Box, BoxProps } from '../Box/boxStyles'

export const Division = ({ ...rest }: BoxProps) => {
  return <Box flex={1} {...rest} />
}

export const DivisionLine = ({ ...rest }: BoxProps) => {
  return <Box flex={1} height={1} width={'100%'} backgroundColor="division" marginHorizontal="s16" {...rest} />
}
