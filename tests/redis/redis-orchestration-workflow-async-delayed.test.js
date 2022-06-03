const __ = require('highland')
const redis = require('redis')
const {promisify} = require('util')

const subscriber = redis.createClient()
const publisher = redis.createClient()

const subscribe = promisify(subscriber.subscribe).bind(subscriber)
const unsubscribe = promisify(subscriber.unsubscribe).bind(subscriber)

// Highland limitation... only push the first param :(
const wrapEmitter = emitter => push => {
  emitter.on('message', (channel, message) => {
    push(null, {
      channel,
      message,
    })
  })
  // emitter.on('unsubscribe', (channel, message) => {
  //   push(null, __.nil)
  // })
}
// const draftStream = __('message', subscriber)
const draftStream = __(wrapEmitter(subscriber))
  .filter(({channel}) => channel === 'draft')
  // .tap(({channel, message}) => console.log(`channel: ${channel} - message: ${message}`))
  .map(({message}) => message)

const serviceStreamToTerminateTest = __(wrapEmitter(subscriber))
  .filter(({channel}) => channel === 'approved')

const approvedStream = __(wrapEmitter(subscriber))
  .filter(({channel}) => channel === 'approved')
  .map(({message}) => message)

const sendToDraft = letter => publisher.publish('draft', letter)
// TODO: approve should 1) change something on a DB 2) send the message
/*
  those two steps in real life can happen in many differet ways and
  must not be defined in the same process necessarly
  For exampl using mongo streams, the blocking system should
  create a new document in the 'approved' collection.
  this code would be attached to the 'approved' collection stream
  and no one would actually call "publish".
  But this is an implementation detail
*/
const approve = letter => publisher.publish('approved', `${letter} approved by jhon`)

test('pub sub - the right way', async done => {
  let approvedNotified = 0
  serviceStreamToTerminateTest
    // .map(({channel, message}) => console.log(`channel: ${channel} - message: ${message}`))
    .each(async () => {
      approvedNotified++
      if (approvedNotified === 3) {
        await unsubscribe('draft')
        await unsubscribe('approved')
        subscriber.quit()
        publisher.quit()
        done()
      }
    })

  expect.assertions(1)
  await subscribe('draft')
  await subscribe('approved')

  draftStream
    .map(approve)
    .each(() => ({}))

  approvedStream
    .tap(message => console.log(`approved stream: ${message}`))
    // TODO get 'letter' from DB and check number of approvals
    // filter approval number == X
    // .map(publish)
    .done(() => ({}))

  __(['a', 'b', 'c'])
    .map(sendToDraft)
    .toArray(publications => {
      expect(publications).toHaveLength(3)
    })
})
