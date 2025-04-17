// https://github.com/mrousavy/react-native-mmkv/blob/main/docs/WRAPPER_REACT_QUERY.md

import { MMKV } from 'react-native-mmkv'

const queryCache = new MMKV()

export const queryStorage = {
  setItem: (key: string, value: string) => {
    queryCache.set(key, value)
  },

  getItem: (key: string) => {
    const value = queryCache.getString(key)
    return value === undefined ? null : value
  },

  removeItem: (key: string) => {
    queryCache.delete(key)
  },
}
