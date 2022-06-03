const {
  Kafka, logLevel, Partitioners,
} = require('kafkajs')

const kafkaExactlyOnceConsumer = require('../../src/kafka/kafka-exactly-once-consumer')

const client = new Kafka({
  clientId: 'tests.kafkajs',
  brokers: ['localhost:9092'],
  connectionTimeout: 1000,
  requestTimeout: 2000,
  maxRetryTime: 500,
  initialRetryTime: 300,
  retries: 3,
  logLevel: logLevel.INFO,
})
const producer = client.producer({
  allowAutoTopicCreation: false,
  // transactionTimeout: 1000,
  idempotent: false, // experimental set to true
  createPartitioner: Partitioners.LegacyPartitioner,
})
// const consumer = client.consumer({groupId: 'test-group'})
const testTopic = 'KafkaJS-topic-1'
// const consumer = require('./consumer')(client, testTopic)
// console.log(consumer)
// const operation = async ({topic, partition, message}) => {
//   const {offset, timestamp, value} = message
//   console.log(offset, timestamp, value)
//   await waitP(500)
// }
const operation = jest.fn().mockImplementation(() => {

})

const {attach, detach} = kafkaExactlyOnceConsumer({
  client,
  groupId: 'test-group',
  topic: testTopic,
  operation,
})

beforeAll(async () => {
  await producer.connect()
  await attach()
  // await consumer.connect()
  // await consumer.subscribe({topic: testTopic, fromBeginning: false})
})
afterAll(async () => {
  await producer.disconnect()
  await detach()
  // await consumer.disconnect()
})

const {v4: uuidv4} = require('uuid')
// const __ = require('highland')
test('produce one event', async () => {
  const value = uuidv4()
  // console.log(value)
  await producer.send({
    topic: testTopic,
    messages: [
      {value},
    ],
    acks: -1,
    timeout: 500,
    // compression: CompressionTypes.GZIP,
  })
})
