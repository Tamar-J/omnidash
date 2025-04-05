import { ThemeProvider } from 'styled-components/native'
import { StatusBar } from 'expo-status-bar'

import { theme } from '@/themes'

import { useLoadFonts } from '@/hooks/useLoadFonts'

export default function App() {
  const [areFontsLoaded] = useLoadFonts()

  if (!areFontsLoaded) return null

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" translucent />
    </ThemeProvider>
  )
}
