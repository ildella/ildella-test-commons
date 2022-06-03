const {Kafka, Partitioners} = require('kafkajs')

const client = new Kafka({
  clientId: 'tests.kafkajs.transactional',
  brokers: ['localhost:9092'],
})
const producer = client.producer({
  // allowAutoTopicCreation: false,
  maxInFlightRequests: 1,
  transactionTimeout: 1000,
  idempotent: true,
  'transactional.id': 'my-tx-id',
  createPartitioner: Partitioners.LegacyPartitioner,
})

const topic = 'Kafkajs-topic-transaction-test'
const value = {say: 'something'}
const messages = [{value}]

test.skip('produce one event in a transaction', async () => {
  // TODO: getting a 'KafkaJSNonRetriableError: Must provide transactional id for transactional producer
  const transaction = await producer.transaction()
  try {
    await transaction.send({
      topic,
      messages,
    })

    await transaction.commit()
  } catch (e) {
    await transaction.abort() // will rollback
  }
})
