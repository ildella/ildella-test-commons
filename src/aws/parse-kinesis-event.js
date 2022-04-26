const isHostedOnAWS = !!(process.env.LAMBDA_TASK_ROOT || process.env.AWS_EXECUTION_ENV)

const {kinesalitePipeline, kinesisPipeline} = require('./from-kinesis-event')

module.exports = ({partitionKeyFilter}) => isHostedOnAWS
  ? kinesisPipeline({partitionKeyFilter})
  : kinesalitePipeline({partitionKeyFilter})
