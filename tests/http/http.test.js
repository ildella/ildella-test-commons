const httpTestBase = require('../../src/http/http-test-base')

const routes = require('./routes')
const fastifyApp = require('./fastify-app')

const httpTest = httpTestBase({framework: 'fastify'})
const app = routes(fastifyApp())

const {start, stop, client} = httpTest(app)

beforeAll(start)
afterAll(stop)

test('basic http test', async () => {
  const {status} = await client().get('/health')
  expect(status).toEqual(200)
})
