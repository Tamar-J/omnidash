import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { removeOldestQuery } from '@tanstack/react-query-persist-client'

import { queryStorage } from './queryStorage'

export const syncStoragePersister = createSyncStoragePersister({
  storage: queryStorage,
  retry: removeOldestQuery,
})
