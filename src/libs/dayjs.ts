import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/pt-br'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.locale('pt-br')
dayjs.extend(utc)
dayjs.extend(localizedFormat)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(isBetween)

export { dayjs }
