const mongoTestBase = require('../../src/mongodb/mongo-test-base')

const {start, stop, client, connection} = mongoTestBase()
beforeAll(start)
afterAll(stop)

test('should successfully set & get information from the database', async () => {
  const connection = await client().connect()

  const database = connection.db('dd-test-db')
  expect(database).toBeDefined()

  const testCollection = database.collection('test-collection-1')
  const result = await testCollection.insertMany([{a: 1}, {b: 1}])
  expect(result.insertedCount).toStrictEqual(2)
  expect(await testCollection.countDocuments({})).toBe(2)

  await connection.close()
})

test('same, but with connection from the test base module', async () => {

  const currentConnection = await connection()
  const database = currentConnection.db('dd-test-db')
  expect(database).toBeDefined()

  const testCollection = database.collection('test-collection-2')
  const result = await testCollection.insertMany([{a: 1}, {b: 1}])
  expect(result.insertedCount).toStrictEqual(2)
  expect(await testCollection.countDocuments({})).toBe(2)

})
