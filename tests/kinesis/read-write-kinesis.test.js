const {
  startServer,
  createStream,
  closeAndTerminate,
  writeRead,
} = require('../../src/aws/kinesalite-jest')

const StreamName = 'integration-test-stream'
const PartitionKey = 'integration-test'
const port = 5577

beforeAll(done => startServer({port}, done))
beforeAll(done => createStream({
  port,
  StreamName,
}, done))
afterAll(done => closeAndTerminate({
  port,
  StreamName,
}, done))

const simulateKinesisWriteRead = writeRead({
  StreamName,
  PartitionKey,
  port,
})

const payload = {some: 'value'}

test('send and receive a message trough Kinesis', async () => {
  const Records = await simulateKinesisWriteRead(payload)
  expect(Records).toHaveLength(1)
})
