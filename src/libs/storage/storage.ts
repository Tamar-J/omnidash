import { MMKV } from 'react-native-mmkv'

const MMKVInstance = new MMKV()

export const storage = {
  setItem: <T>(key: string, value: T) => {
    const stringValue = JSON.stringify(value)
    MMKVInstance.set(key, stringValue)
  },

  getItem: <T = unknown>(key: string): T | null => {
    const value = MMKVInstance.getString(key)
    return value ? JSON.parse(value) : null
  },

  removeItem: (key: string) => {
    MMKVInstance.delete(key)
  },
}
