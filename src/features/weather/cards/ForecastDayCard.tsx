import { Icon } from '@/components'

import { ForecastItemBase, WeatherInfoRow, ForecastItemBaseProps, ForecastItemsList } from '../components'

type ForecastDayCardProps = {
  data: ForecastDayItemProps[]
}

export function ForecastDayCard({ data }: ForecastDayCardProps) {
  return (
    <ForecastItemsList
      data={data}
      keyExtractor={(item) => item.weekDay}
      renderItem={({ item: { weekDay, tempMax, tempMin, iconName, iconSize } }) => (
        <ForecastDayItem weekDay={weekDay} iconName={iconName} iconSize={iconSize} tempMax={tempMax} tempMin={tempMin} />
      )}
    />
  )
}

export type ForecastDayItemProps = Omit<ForecastItemBaseProps, 'children' | 'title'> & {
  weekDay: string
  tempMax: number
  tempMin: number
}

export const ForecastDayItem = ({ weekDay, tempMax, tempMin, iconName, iconSize }: ForecastDayItemProps) => {
  return (
    <ForecastItemBase title={weekDay} iconName={iconName} iconSize={iconSize}>
      <WeatherInfoRow
        rightIcon={<Icon iconName="arrowCircleUp" iconColor="highlightPrimary" />}
        weatherValue={tempMax}
        weatherUnit="º"
      />
      <WeatherInfoRow
        rightIcon={<Icon iconName="arrowCircleDown" iconColor="highlightSecondary" />}
        weatherValue={tempMin}
        weatherUnit="º"
      />
    </ForecastItemBase>
  )
}
