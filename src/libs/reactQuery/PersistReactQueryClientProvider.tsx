import { ReactNode } from 'react'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'

import { queryClient } from './queryClient'
import { syncStoragePersister } from './syncStoragePersister'

type Props = {
  children: ReactNode
}

export function PersistReactQueryClientProvider({ children }: Props) {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: syncStoragePersister }}>
      {children}
    </PersistQueryClientProvider>
  )
}
