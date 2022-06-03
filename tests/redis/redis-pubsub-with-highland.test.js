const __ = require('highland')
// const redis = require('redis-mock')
const redis = require('redis')
const subscriber = redis.createClient()
const publisher = redis.createClient()

const {promisify} = require('util')
const subscribe = promisify(subscriber.subscribe).bind(subscriber)

/*
  We see the limitations:
  the __('message', subscriber) can't know when the event emitter terminates
  Which is ok for some scenario, but not for all of them.
  We must implement a custom generator, which would be easy...
  but the edges maybe would not be guaranteed.

  Maybe the Redis stream implementation can fix that?
*/
test('pub sub - the right way', async done => {
  const channelName = 'a channel'
  await subscribe(channelName)
  let messageCount = 0
  __('message', subscriber)
    .each(console.log)
    .done(() => {
      expect('code never').toBe('here')
    })

  subscriber.on('message', (channel, message) => {
    messageCount += 1
    if (messageCount === 2) {
      subscriber.unsubscribe()
    }
  })

  publisher.publish(channelName, 'a message')
  publisher.publish(channelName, 'another message')
  subscriber.on('unsubscribe', () => {
    console.log('unsubscribe')
    subscriber.quit()
    publisher.quit()
    expect(messageCount).toBe(2)
    done()
  })
})
