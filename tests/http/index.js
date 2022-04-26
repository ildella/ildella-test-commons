// const microserviceCore = require('@thrivelearning/microservice-core')

const {local} = require('../../src/commons/logger')

const fastifyApp = require('./fastify-app')
const routes = require('./routes')

const logger = local()

const start = async () => {
  const app = routes(fastifyApp())
  const port = 5010

  const started = await app.listen(port, '0.0.0.0')
  logger.info(`HTTP API - ${started}`)
}

start()
