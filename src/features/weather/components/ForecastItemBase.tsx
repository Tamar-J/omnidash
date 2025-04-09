import { TextTitle, BoxCenter, IconSVG, IconSVGMapKeyType } from '@/components'

import { WeatherIconSizesKeyType } from '@/themes'

export type ForecastItemBaseProps = {
  title: string
  iconName: IconSVGMapKeyType
  iconSize?: WeatherIconSizesKeyType
  children: React.ReactNode
}
export const ForecastItemBase = ({ title, children, iconName, iconSize = 'medium' }: ForecastItemBaseProps) => {
  return (
    <BoxCenter gap={'s5'} padding={'s8'}>
      <TextTitle textPreset="mediumBold">{title}</TextTitle>
      <IconSVG iconSize={iconSize} iconName={iconName} />
      {children}
    </BoxCenter>
  )
}
