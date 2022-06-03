// const {ObjectWritableMock, ObjectReeadableMock} = require('stream-mock')
const {createClient} = require('redis')
const createWriter = require('../../src/redis/redis-stream-writer')
const createReader = require('../../src/redis/redis-stream-reader')

const CHUNKS_TO_READ = 2

test('basic write -> read vanilla', done => {
  const item = {a: 'b'}
  const streamName = 'a-stream'
  const writeClient = createClient()
  const extraArgs = Object.entries(item).flat()
  const args = [streamName, '*'].concat(extraArgs)
  console.log(args)
  // serializeItem(args, item)
  const callback = value => {
    console.log(value)
    expect(value).toBe(null)
    // done()
  }

  const readClient = createClient()
  // const count = Math.min(size, limit)
  // const block = opt.waitTimeout === Infinity ? 0 : opt.waitTimeout
  // let cursor = history ? BEGINNING : '$'
  // readClient.xread('count', count, 'block', block, 'streams', streamName, cursor, onData)

  writeClient.xadd(...args, callback)
  done()
})

test('basic write -> read using other people code', done => {
  let readsCounter = 0
  const redis1 = createClient()
  const reader = createReader(redis1, 'some-stream-name', {limit: CHUNKS_TO_READ})
  reader.on('data', chunk => {
    readsCounter++
    expect(chunk).toHaveProperty('foo')
  })
  const redis2 = createClient()
  const writer = createWriter(redis2, 'some-stream-name')
  // writer.once('error', onError)
  writer.on('finish', () => {
    // console.log('weird, write should finish before the read, ummm...')
    // console.log('maybe the implementation is waiting for a read ack?')
    done()
  })
  setTimeout(() => {
    writer.write({foo: 'bar'})
    writer.end({foo: 'bar2'})
  }, 100)

  reader.on('end', () => {
    // console.log('finish reads')
    redis2.quit()
    redis1.quit()
    // redis1.quit(() => console.log('1 quit'))
    expect(readsCounter).toBe(2)
    // expect(redis1).toBe({})
    // done()
  })
})

test.todo('write first, read later')
test.todo('count messages in output (reader)')
test.todo('k6 test with lots of writer and an highland stream reader writing to cassandra')
