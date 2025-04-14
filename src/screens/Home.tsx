import { ScrollView } from 'react-native'

import { BoxRow, BoxSafe } from '@/components'
import { SectionAI, SectionWeather } from '@/features'

export function Home() {
  return (
    <BoxSafe>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 10 }} keyboardShouldPersistTaps="handled">
        <BoxRow gap="s10" flexWrap="wrap" alignItems="flex-start">
          <SectionAI />
          <SectionWeather />
        </BoxRow>
      </ScrollView>
    </BoxSafe>
  )
}
