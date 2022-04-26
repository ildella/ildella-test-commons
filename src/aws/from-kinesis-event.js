const __ = require('highland')

const kinesisPipeline = ({partitionKeyFilter}) => __.pipeline(
  __.pluck('kinesis'),
  __.where({partitionKey: partitionKeyFilter}),
  __.pluck('data')
)

const kinesalitePipeline = ({partitionKeyFilter}) => __.pipeline(
  __.where({PartitionKey: partitionKeyFilter}),
  __.pluck('Data')
)

module.exports = {
  kinesalitePipeline,
  kinesisPipeline,
}
