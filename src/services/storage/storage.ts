import AsyncStorage from '@react-native-async-storage/async-storage'

export const storage = {
  setItem: async (key: string, value: any) => {
    const stringValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, stringValue)
  },

  getItem: async (key: string) => {
    const value = await AsyncStorage.getItem(key)
    return value ? await JSON.parse(value) : null
  },

  removeItem: async (key: string) => {
    await AsyncStorage.removeItem(key)
  },
}
