// Documentation: https://jestjs.io/docs/en/configuration.html

module.exports = {
  // preset: '../../jest.preset.js',
  // preset: 'jest-dynalite',
  globalSetup: './global-setup',
  setupFiles: ['./setup-files'],
  setupFilesAfterEnv: ['../timeout-quick'],
}
