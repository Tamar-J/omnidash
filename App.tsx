import { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'

import { ThemeProvider } from '@shopify/restyle'
import { theme } from '@/themes'

import { setupNetworkListener } from '@/libs/reactQuery/networkListener'
import { useLoadFonts } from '@/hooks/useLoadFonts'

import { PersistReactQueryClientProvider } from '@/libs/reactQuery/PersistReactQueryClientProvider'

import { Home } from '@/screens/Home'
import { LoadingScreen } from '@/components'

export default function App() {
  const [areFontsLoaded] = useLoadFonts()

  useEffect(() => {
    setupNetworkListener()
  }, [])

  return (
    <PersistReactQueryClientProvider>
      <ThemeProvider theme={theme}>
        <StatusBar style="light" translucent />
        {areFontsLoaded ?
          <Home />
        : <LoadingScreen />}
      </ThemeProvider>
    </PersistReactQueryClientProvider>
  )
}
