import type { Config } from 'jest'

const config: Config = {
  preset: 'jest-expo',
  testTimeout: 15000,
  resetMocks: true,
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|react-native-safe-area-context|react-navigation|@react-navigation/.*|@sentry/react-native|react-native-svg))',
  ],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/src/test/mocks/svgMock.ts',
  },
  moduleDirectories: ['node_modules', '<rootDir>/src/test'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
}

export default config
