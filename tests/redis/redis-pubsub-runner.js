/*
  https://medium.com/geekculture/streams-vs-pub-sub-systems-in-redis-70626821cc2f

  "almost like pubsub, but these messages are retained in the system and the system is append only."
*/

const redis = require('ioredis')
const createClient = () => new redis()

const subscriber1 = createClient()
const subscriber2 = createClient()
const subscriber3 = createClient()
const publisher = createClient()

const callback = (err, count) => {
  console.log('consumers subscribed:', count)
}

const start = async () => {
  subscriber1.on('message', (channel, message) => {
    console.log('1 - Receive message %s from channel %s', message, channel)
  })
  subscriber2.on('message', (channel, message) => {
    console.log('2- Receive message %s from channel %s', message, channel)
  })

  await subscriber1.subscribe('news', 'music')
  publisher.publish('news', 'Hello world!', callback)
  await subscriber2.subscribe('news', 'music')
  await subscriber3.subscribe('news', 'music')
  publisher.publish('music', 'Hello again!', callback)
  subscriber3.quit()
  publisher.publish('music', 'Hello again!', callback)
  publisher.quit()
  publisher.publish('music', 'Hello again!', callback)

  // There's also an event called 'messageBuffer', which is the same as 'message' except
  // it returns buffers instead of strings.
  // subscriber1.on('messageBuffer', (channel, message) => {
  //   // Both `channel` and `message` are buffers.
  // })
}

start()
