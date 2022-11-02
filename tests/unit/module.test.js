const {
  eslintConfigs, aws, commons: {httpJsonClient},
} = require('../../src')

test('package', () => {
  expect(typeof httpJsonClient).toBe('function')
  expect(typeof aws.awsInit).toBe('function')
  expect(typeof eslintConfigs.jestFpUnicornEslintConfig).toBe('function')
})
