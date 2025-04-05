import { ThemeProvider } from 'styled-components/native'
import { StatusBar } from 'expo-status-bar'

import { theme } from '@/themes'

import { useLoadFonts } from '@/hooks/useLoadFonts'

import { Home } from '@/screens/Home'
import { LoadingScreen } from '@/components'

export default function App() {
  const [areFontsLoaded] = useLoadFonts()

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" translucent />
      {areFontsLoaded ?
        <Home />
      : <LoadingScreen />}
    </ThemeProvider>
  )
}
