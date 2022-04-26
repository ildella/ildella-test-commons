const {MongoClient} = require('mongodb')

const connections = []

const {mongoUri: defaultMongoUri} = process.env

module.exports = () => ({
  connection: async ({mongoUri = defaultMongoUri} = {}) => {
    const client = new MongoClient(mongoUri)
    const connection = await client.connect()
    connections.push(connection)
    return connection
  },
  stop: () => {
    connections.forEach(async connection => {
      await connection.close()
    })
  },
})
