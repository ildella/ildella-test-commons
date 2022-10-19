const thisPackage = require('../../src')

test('package', () => {
  expect(thisPackage).toHaveProperty('eslintConfigs')
  // expect(thisPackage).toEqual({})
})
