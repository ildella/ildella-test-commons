const redis = require('ioredis')
const createClient = () => new redis()
const client = createClient()

// https://redis.io/topics/streams-intro
const channel = 'c-channel'

const write = async () => {
  let messageCount = await client.xlen(channel)
  console.log(`current message count in channel ${channel} is ${messageCount} messages`)
  client.xadd(channel, '*', 'name', 'Daniele')
  client.xadd(channel, '*', 'name', 'Daniele')
  client.xadd(channel, '*', 'name', 'Daniele')
  messageCount = await client.xlen(channel)
  console.log(`current message count in channel ${channel} is ${messageCount} messages`)
}

// XREAD is more suited in order to consume the stream starting from the first entry
const read = async function () {
  const info = await client.xinfo(['STREAM', channel])
  console.log(info)
  const startId = '1597401784577-0'
  const response = await client.xread(['COUNT', 2, 'STREAMS', channel, startId]) // read the first 2
  // const response = await client.xread(['STREAMS', channel, 0])
  const messages = response[0][1]
  // console.log(messages)
  console.log(`reading messages from channel ${channel}, found ${messages.length} messages`)
  const messagesText = messages.map(message => {
    console.log('message', message)
    const id = message[0]
    const key = message[1][0]
    const value = message[1][1]
    return {
      id,
      key,
      value,
    }
  })
  messagesText.forEach((text, count) => console.log(`message count: ${count}`, text))
}

const range = async () => {
  // '-' and '+' are valid IDs like 1519073279157-1
  // TODO: recursive iterator that xrange over the following block (or xread)
  const response = await client.xrange([channel, '-', '+']) // read all
  // console.log(response)
  const messages = response
  let i = 0
  messages
    .map(message => message[1][0].toString())
    .forEach(text => console.log(`from range:: ${++i}`, text))
}

const start = async () => {
  await write()
  // await read()
  // await range()
  process.exit(0)
}

start()
