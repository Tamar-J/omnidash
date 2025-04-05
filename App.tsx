import { ThemeProvider } from 'styled-components/native'
import { StatusBar } from 'expo-status-bar'

import { theme } from '@/themes'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" translucent />
    </ThemeProvider>
  )
}
