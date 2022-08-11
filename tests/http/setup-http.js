const httpTestBase = require('../../src/http/http-test-base')
const fastifyApp = require('./fastify-app')
const routes = require('./routes')

const app = routes(fastifyApp())

const httpTest = httpTestBase()
const {
  start, stop, client,
} = httpTest(app)

global.http = client

beforeAll(start)
afterAll(stop)
