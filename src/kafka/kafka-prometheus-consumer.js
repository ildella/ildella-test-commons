const {promisify} = require('util')
const wait = (millisecs, callback) => {
  setTimeout(() => { callback() }, millisecs)
}
const waitP = promisify(wait)
const Prometheus = require('prom-client')
const callsStarted = new Prometheus.Counter({
  name: 'call_started',
  help: 'call_help',
})
const callsFinished = new Prometheus.Counter({
  name: 'call_finished',
  help: 'call_help',
})
// const callsError = new Prometheus.Counter({
//   name: 'call_error',
//   help: 'call_help',
// })

const eachMessage = consumer => async ({
  topic, partition, message,
}) => {
  const {
    offset, timestamp, value,
  } = message
  const delay = Date.now() - timestamp
  callsStarted.inc()
  await waitP(2000)
  // "exactly once" semantics
  consumer.commitOffsets([{
    topic,
    partition,
    offset: offset + 1,
  }])
  callsFinished.inc()
  console.log({
    offset,
    delay,
    value: value.toString(),
  })
}

const createConsumer = async client => {
  const consumer = client.consumer({groupId: 'test-group'})

  return {
    attach: async topic => {
      const fromBeginning = false
      await consumer.connect()
      await consumer.subscribe({
        topic,
        fromBeginning,
      })
      // let sessionCounter = 0
      await consumer.run({
        autoCommit: false,
        eachMessage: eachMessage(consumer),
      })
    },

    detach: consumer.disconnect,
  }
}

const {Kafka, logLevel} = require('kafkajs')
const client = new Kafka({
  clientId: 'tests.kafkajs',
  brokers: ['localhost:9092'],
  connectionTimeout: 1000,
  requestTimeout: 2000,
  logLevel: logLevel.INFO,
})
// client.logger().setLogLevel(logLevel.WARN)
const prometheusHttp = require('./prometheus-http')

const prometheusPort = 4455
const start = async () => {
  const consumer = await createConsumer(client)
  await consumer.attach('KafkaJS-topic-1')
  const http = prometheusHttp()
  http.listen(prometheusPort, () => console.log(`Prometheus metrics --> http://localhost:${prometheusPort}/metrics`))
  process.on('SIGTERM', () => console.log('SIGTERM'))
  process.on('SIGINT', async () => {
    console.log('SIGINT detected, disconnecting...')
    await consumer.detach()
    console.log('DISCONNECTED')
    process.exit(0)
  })
}

start()
