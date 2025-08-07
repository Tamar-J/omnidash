import { Icon } from '@/components'

import { ForecastItemBase, ForecastItemBaseProps } from '../ForecastItemBase'
import { ForecastItemsList } from '../ForecastItemsList'
import { WeatherInfoRow } from '../WeatherInfoRow'

type ForecastHourCardProps = {
  data: ForecastHourItemProps[]
}

export function ForecastHourCard({ data }: ForecastHourCardProps) {
  return (
    <ForecastItemsList
      data={data}
      keyExtractor={(item) => item.time}
      renderItem={({ item: { time, temp, rainChance, iconName, iconSize } }) => (
        <ForecastHourItem time={time} iconName={iconName} iconSize={iconSize} temp={temp} rainChance={rainChance} />
      )}
    />
  )
}

type ForecastHourItemProps = Omit<ForecastItemBaseProps, 'children' | 'title'> & {
  time: string // 10:00
  temp: number
  rainChance: number
}

const ForecastHourItem = ({ time, temp, rainChance, iconName, iconSize }: ForecastHourItemProps) => {
  return (
    <ForecastItemBase title={time} iconName={iconName} iconSize={iconSize}>
      <WeatherInfoRow weatherValue={temp} weatherUnit={'º'} />
      <WeatherInfoRow leftIcon={<Icon iconName="cloudRain" />} weatherValue={rainChance} weatherUnit={'%'} />
    </ForecastItemBase>
  )
}
