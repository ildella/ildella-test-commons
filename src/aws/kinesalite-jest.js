const __ = require('highland')
const {Kinesis} = require('aws-sdk')
const kinesalite = require('kinesalite')

const {curry} = __
const kinesaliteServer = kinesalite({createStreamMs: 5})

const kinesis = port => new Kinesis({endpoint: `http://localhost:${port}`})

const startServer = ({port}, done) => {
  kinesaliteServer.listen(port, error => {
    if (error) done(error)
    // console.log(`Kinesalite started on port ${port}`)
    done()
  })
}

const createStream = ({StreamName, port}, done) => {
  kinesis(port).createStream({
    StreamName,
    ShardCount: 1,
  }, (error, data) => {
    if (error) return done(error)
    // console.log(`Stream ${StreamName} created -->`, data)
    done()
  })
}

const closeAndTerminate = ({StreamName, port}, done) => {
  // console.log('iniziate termination...')
  __([StreamName])
    .map(StreamName =>
      kinesis(port).deleteStream({
        StreamName,
        EnforceConsumerDeletion: true,
      }).promise()
    )
    .flatMap(__)
    .done(() => {
      kinesaliteServer.close(error => {
        // console.log('closing', error)
        if (error) return done(error)
        done()
      })
    })
}

const write = ({
  StreamName, PartitionKey, port,
}, payload) => kinesis(port).putRecord({
  StreamName,
  PartitionKey,
  Data: JSON.stringify(payload),
}).promise()

const read = async ({
  StreamName, ShardId, SequenceNumber, port,
}) => {
  const {ShardIterator} = await kinesis(port).getShardIterator({
    StreamName,
    ShardId,
    ShardIteratorType: 'AT_SEQUENCE_NUMBER',
    StartingSequenceNumber: SequenceNumber,
  }).promise()
  // console.log('shard iterator:', ShardIterator)
  const {Records} = await kinesis(port).getRecords({
    ShardIterator,
    Limit: 100,
  }).promise()
  return Records
}

const writeRead = async ({
  StreamName, PartitionKey, port,
}, payload) => {
  const response = await kinesis(port).putRecord({
    StreamName,
    PartitionKey,
    Data: JSON.stringify(payload),
  }).promise()
  const {ShardId, SequenceNumber} = response
  const {ShardIterator} = await kinesis(port).getShardIterator({
    StreamName,
    ShardId,
    ShardIteratorType: 'AT_SEQUENCE_NUMBER',
    StartingSequenceNumber: SequenceNumber,
  }).promise()
  const {Records} = await kinesis(port).getRecords({
    ShardIterator,
    Limit: 100,
  }).promise()
  return Records
}

module.exports = {
  startServer: curry(startServer),
  createStream: curry(createStream),
  closeAndTerminate: curry(closeAndTerminate),
  write: curry(write),
  read: curry(read),
  writeRead: curry(writeRead),
}
