module.exports = {
  // preset: '../../jest.preset.js',
  globalSetup: './global-setup',
  globalTeardown: './global-teardown',
  setupFilesAfterEnv: ['../timeout-medium'],
}
