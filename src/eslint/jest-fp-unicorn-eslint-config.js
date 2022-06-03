module.exports = {
  extends: [
    'node-opinionated',
  ],
  plugins: [
    'jest',
    'fp',
    'unicorn',
  ],
  overrides: [
    {
      files: ['**/src/**'],
      extends: [
        'plugin:unicorn/recommended',
        'plugin:fp/recommended',
      ],
      rules: {
        'fp/no-unused-expression': 'off',
        'fp/no-let': 'warn',
        'fp/no-nil': 'off',
        'fp/no-rest-parameters': 'off',
        'fp/no-mutation': ['error', {
          commonjs: true,
          allowThis: true,
          exceptions: [],
        }],
        'max-lines': ['warn', 100],
        'no-console': 'warn',
        'security/detect-non-literal-fs-filename': 'off',
        'security/detect-object-injection': 'off',
        'unicorn/prefer-module': 'off',
        'unicorn/escape-case': 'warn',
        'unicorn/import-style': 'off',
        'unicorn/prevent-abbreviations': 'warn',
        'unicorn/no-null': 'warn',
        'unicorn/no-array-for-each': 'off', // does not sounds right to me
        'unicorn/no-array-reduce': 'warn',
        'unicorn/no-array-callback-reference': 'off', // does not sounds right to me
        'unicorn/no-fn-reference-in-iterator': 'off', // does not sounds right to me
        'unicorn/no-process-exit': 'off', // eslint already has it
      },
    },
    {
      files: ['**/tests/**', '.eslintrc.js', 'jest.config.js'],
      extends: [
        'plugin:jest/recommended',
      ],
      rules: {
        'max-nested-callbacks': ['warn', 3],
        'max-lines': ['warn', 200],
        'no-console': 'off',
        'no-sync': 'off',
        'jest/expect-expect': 'off',
        'jest/no-done-callback': 'off',
        // 'jest/no-test-callback': 'off',
        'node/no-unpublished-require': 'off',
        'node/no-extraneous-require': 'off',
        'promise/no-callback-in-promise': 'off',
        'security/detect-non-literal-fs-filename': 'off',
        'sonarjs/no-duplicate-string': 'off',
      },
    },
  ],
}
