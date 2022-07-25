/*
  eslint-disable fp/no-let, fp/no-mutating-methods, fp/no-mutation
*/
const {MongoMemoryServer} = require('mongodb-memory-server-core')
const {MongoClient} = require('mongodb')

const {CI: isCi} = process.env
let mongoServers = []
const connections = []

const server = () => mongoServers[0]
const serverUri = () => isCi ? 'mongodb://127.0.0.1:27017' : server().getUri()

module.exports = () => ({
  start: async () => {
    if (!isCi) {
      // console.log('existing server:', server())
      const newServer = server() || await MongoMemoryServer.create()
      // console.log({newServer})
      mongoServers.push(newServer)
    }
  },
  stop: () => {
    connections.forEach(async connection => {
      await connection.close()
    })
    mongoServers.forEach(async server => {
      await server.stop()
    })
    mongoServers = []
  },
  client: () => new MongoClient(serverUri()),
  connection: async () => {
    const client = new MongoClient(serverUri())
    const connection = await client.connect()
    connections.push(connection)
    return connection
  },
  serverUri,
})
