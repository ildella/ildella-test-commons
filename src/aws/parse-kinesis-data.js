const __ = require('highland')

const parseKinesisEvent = () => __.pipeline(
  __.map(data => Buffer.from(data, 'base64').toString('utf8').trim()),
  __.map(rawString => JSON.parse(rawString))
)

module.exports = parseKinesisEvent
