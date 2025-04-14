import type { Config } from 'jest'

const config: Config = {
  preset: 'jest-expo',
  testTimeout: 15000,
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|react-native-safe-area-context|react-navigation|@react-navigation/.*|@sentry/react-native|react-native-svg))',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
}

export default config
