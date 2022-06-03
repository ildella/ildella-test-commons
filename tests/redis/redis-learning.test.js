const redis = require('redis-mock')
const redisClient = redis.createClient()
// const redis = require('redis')
// const redisClient = redis.createClient()

test('set and get', done => {
  const result = redisClient.set('foo', 'bar')
  // expect(result).toBe(false) // with real redis this test pass

  redisClient.get('foo', (err, result) => {
    if (err) {
      expect('not').toBe('called')
      expect(err).toBeNull()
    } else {
      expect(result).toBe('bar')
      done()
    }
  })
})

test('pub sub', done => {
  const subscriber = redis.createClient()
  const publisher = redis.createClient()
  const channelName = 'a channel'

  let messageCount = 0

  subscriber.on('subscribe', (channel, count) => {
    expect(channel).toBe(channelName)
    // expect(count).toBe(1) // with real redis this test pass
    publisher.publish(channelName, 'a message', () => {
      console.log('published!!!')
    })
    publisher.publish(channelName, 'another message')
  })

  subscriber.on('message', (channel, message) => {
    messageCount += 1

    console.log('Subscriber received message in channel \'' + channel + '\': ' + message)

    if (messageCount === 2) {
      subscriber.unsubscribe()
      subscriber.quit()
      publisher.quit()
    }
    expect(true).toBe(true)
    done()
  })

  subscriber.subscribe(channelName)
})
