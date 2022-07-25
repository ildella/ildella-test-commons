/*
  Documentation:
    https://jestjs.io/docs/configuration#projects-arraystring--projectconfig
*/

const preset = require('./src/jest/jest.preset')

module.exports = {
  ...preset,
  projects: [
    '<rootDir>/tests/dynamodb',
    '<rootDir>/tests/kinesis', // not working in CI
    '<rootDir>/tests/http',
    '<rootDir>/tests/mongodb',
  ],
}
