module.exports = {
  extends: [
    'node-moar',
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
        'node-moar-stricter',
      ],
    },
    {
      files: [
        '**/test/**',
        '**/tests/**',
        '**/fixtures/**',
        '.eslintrc.js',
        'jest.config.*.js',
      ],
      extends: [
        'node-moar-test',
      ],
    },
  ],
}
