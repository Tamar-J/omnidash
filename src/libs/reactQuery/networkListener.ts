import * as Network from 'expo-network'
import { onlineManager } from '@tanstack/react-query'

export const setupNetworkListener = () => {
  onlineManager.setEventListener((setOnline) => {
    const subscription = Network.addNetworkStateListener((state) => {
      setOnline(!!state.isConnected)
    })

    return () => {
      subscription.remove()
    }
  })
}
