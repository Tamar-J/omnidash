// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier', 'plugin:@tanstack/eslint-plugin-query/recommended'],
  plugins: ['prettier', '@tanstack/query'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        caughtErrorsIgnorePattern: '^_$',
      },
    ],
    '@typescript-eslint/no-empty-object-type': 'error',
    '@tanstack/query/exhaustive-deps': 'warn',
    '@tanstack/query/no-deprecated-options': 'error',
    '@tanstack/query/prefer-query-object-syntax': 'error',
    '@tanstack/query/stable-query-client': 'error',
  },
  ignorePatterns: ['/dist/*'],
}
