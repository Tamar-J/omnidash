/* eslint-disable @typescript-eslint/no-empty-object-type */
import 'styled-components/native'
import { ThemeType } from '@/themes/theme'

declare module 'styled-components/native' {
  export interface DefaultTheme extends ThemeType {}
}
