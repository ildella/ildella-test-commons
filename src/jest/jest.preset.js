/*
  Documentation:
    https://jestjs.io/docs/configuration#preset-string
*/

module.exports = {
  notify: true,
  notifyMode: 'failure-change',
  testEnvironment: 'node',
  collectCoverage: false,
  // collectCoverageFrom: [
  //   '*.{js,jsx}',
  // ],
  // coveragePathIgnorePatterns: ['/node_modules/'],
  coverageThreshold: {
    global: {
      branches: 65,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  coverageReporters: ['text', 'text-summary', 'json', 'json-summary', 'lcov', 'clover', 'html'],
  verbose: true,
  setupFilesAfterEnv: ['./tests/timeout-quick'],
}
