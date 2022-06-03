const __ = require('highland')
const redis = require('ioredis')

const cluster = require('cluster')

const numCPUs = require('os').cpus().length
const numClusters = 1
const numOfWrites = 1000 * 10 * 2

const createClient = () => new redis()

async function* signalEmitter () {
  let counter = 0
  while (counter < numOfWrites) {
    yield 'Daniele'
    counter++
  }
}

const channel = 'perf-test-4'
// const send = curry(client.xadd)

const doTheThing = async () => {
  console.log(`Worker ${process.pid} started writing...`)
  const client = createClient()
  const start = Date.now()
  __(signalEmitter())
    .map(message => client.xadd(channel, '*', 'name', message))
    // .map(__)
    // .parallel(1)
    // .errors(console.error)
    .done(async () => {
      const elapsed = Date.now() - start
      const streamLength = await client.xlen(channel)
      console.log(`${process.pid} > ${numOfWrites} writes in ${elapsed}ms`, streamLength)
      process.exit(0)
    })
}

const multiThreadThings = async () => {
  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`)
    for (let i = 0; i < numClusters; i++) {
      cluster.fork()
    }
    cluster.on('fork', worker => {
      console.log('Worker is dead:', worker.isDead())
    })
    // cluster.on('disconnect', async worker => {
    // })
    // cluster.on('exit', async (worker, code, signal) => {
    // })
  } else {
    doTheThing()
  }
}

multiThreadThings()
