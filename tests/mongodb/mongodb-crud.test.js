const mongoTestBase = require('../../src/mongodb/mongo-test-base')

const {
  start, stop, client, connection,
} = mongoTestBase()
beforeAll(start)
afterAll(stop)

// const datastore = require('../src/datastore-mongo')
const crud = require('../../src/mongodb/mongo-crud')

test('add one document and retrieve it', async () => {
  await connection.db.collection('access').insertOne({})
  const accesses = crud(await connection.db.collection('access'))
  // await accesses.insertOne({})
  expect(await accesses.list()).toHaveLength(1)
})
