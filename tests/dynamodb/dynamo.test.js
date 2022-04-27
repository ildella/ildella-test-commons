const path = require('path')
// const {startDb, stopDb, createTables, deleteTables} = require('jest-dynalite')

// beforeAll(startDb)
// beforeAll(createTables)
// // or
// beforeEach(createTables)
// afterEach(deleteTables)
// afterAll(stopDb)

test('check config 1', () => {
  // expect(process.env.JEST_DYNALITE_CONFIG_DIRECTORY).toContain('/ildella-nodejs-template')
  const resolved = path.resolve(process.cwd(), 'jest-dynalite-config.js')
  expect(resolved).toContain('/jest-dynalite-config.js')
})

test('check config 2', () => {
  const resolved = path.resolve(__dirname, 'jest-dynalite-config.js')
  expect(resolved).toContain('/tests/dynamodb/jest-dynalite-config.js')
})
