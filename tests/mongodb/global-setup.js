const mongoTestBase = require('../../src/mongodb/mongo-test-base')

const {createCollection, tenantDatabase} = require('./mongodb')
const schema = require('./item-schema')

const {
  start,
  stop,
  serverUri,
  connection,
} = mongoTestBase()

module.exports = async () => {
  await start()

  const activeConnection = await connection()
  const database = tenantDatabase(activeConnection)
  // console.log(await database.stats())
  await createCollection(database, 'items', schema)

  // eslint-disable-next-line fp/no-mutation
  process.env.mongoUri = serverUri()
  // eslint-disable-next-line fp/no-mutation
  global.stop = stop
}
