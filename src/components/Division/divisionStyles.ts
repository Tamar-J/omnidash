import styled from 'styled-components/native'

import { Box, BoxProps } from '../Box/boxStyles'

export const Division = styled(Box)<BoxProps>`
  flex: 1;
`

export const DivisionLine = styled(Division)<BoxProps>`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.backgrounds.division};
  margin-horizontal: 16px;
`
