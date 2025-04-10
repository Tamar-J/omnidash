import { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'

import { ThemeProvider } from 'styled-components/native'
import { theme } from '@/themes/theme'

import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider, removeOldestQuery } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { setupNetworkListener } from '@/services/networkListener'
import { useLoadFonts } from '@/hooks/useLoadFonts'

import { Home } from '@/screens/Home'
import { LoadingScreen } from '@/components'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, //24h
    },
  },
})

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  retry: removeOldestQuery,
})

export default function App() {
  const [areFontsLoaded] = useLoadFonts()

  useEffect(() => {
    setupNetworkListener()
  }, [])

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: asyncStoragePersister }}>
      <ThemeProvider theme={theme}>
        <StatusBar style="light" translucent />
        {areFontsLoaded ?
          <Home />
        : <LoadingScreen />}
      </ThemeProvider>
    </PersistQueryClientProvider>
  )
}
