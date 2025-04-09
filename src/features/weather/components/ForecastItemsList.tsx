import { FlatList, FlatListProps } from 'react-native'

import { Box } from '@/components'

export function ForecastItemsList<T>({ ...rest }: FlatListProps<T>) {
  return (
    <Box paddingVertical="s16" borderRadius="medium" borderWidth={0.5} maxWidth={450}>
      <FlatList horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: 16 }} {...rest} />
    </Box>
  )
}
