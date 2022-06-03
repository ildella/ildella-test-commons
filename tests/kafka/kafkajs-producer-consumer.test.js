const {Kafka, Partitioners} = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: [
    'localhost:9092',
    // 'kafka1:9092',
    // 'kafka2:9092'
  ],
})

const producer = kafka.producer({createPartitioner: Partitioners.LegacyPartitioner})
const consumer = kafka.consumer({groupId: 'test-group'})

const run = async () => {
// Producing
  await producer.connect()
  await producer.send({
    topic: 'test-topic',
    messages: [
      {value: 'Hello KafkaJS user!'},
    ],
  })

  // Consuming
  await consumer.connect()
  await consumer.subscribe({
    topic: 'test-topic',
    fromBeginning: true,
  })
}

test('basics', async done => {
  await run()
  await consumer.run({
    eachMessage: async ({
      topic, partition, message,
    }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
      done()
    },
  })
  expect(true).toBe(true)
})
