const __ = require('highland')
const {Kinesis} = require('aws-sdk')

const sendToStream = ({
  PartitionKey,
  StreamName,
}) =>
  __.pipeline(
    __.ratelimit(1, 1000),
    __.map(payload => new Kinesis().putRecord({
      StreamName,
      Data: JSON.stringify(payload),
      PartitionKey,
    }).promise()),
    __.flatMap(__)
  )

module.exports = {
  sendToStream,
}
