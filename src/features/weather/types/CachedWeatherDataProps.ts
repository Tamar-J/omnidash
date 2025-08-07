import { CurrentDataProps } from '../services/processCurrentData'
import { DailyProps } from '../services/processDailyData'
import { HourlyProps } from '../services/processHourlyData'
import { Minutely15Props } from '../services/processMinutely15Data'

export type CachedWeatherDataProps = {
  minutely15Data: Minutely15Props[]
  hourlyData: HourlyProps[]
  dailyData: DailyProps[]
  currentData: CurrentDataProps
  lastFetchedAt: string
}
