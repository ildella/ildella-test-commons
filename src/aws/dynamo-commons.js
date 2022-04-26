const {DynamoDB} = require('aws-sdk')

const {DocumentClient} = DynamoDB

const {
  domain = 'template',
  stage = 'ci',
  app = '',
} = process.env

const findStage = stage => stage === 'ci' ? 'dev' : stage

const findApp = app => app === '' ? '' : `-${app}`

const defaultDynamoOptions = {
  httpOptions: {connectTimeout: 5000, timeout: 5000},
  maxRetries: 2,
}

const documentClient = (dynamoOptions = defaultDynamoOptions) => new DocumentClient(dynamoOptions)

const namingConvention = ({domain, stage, app}) =>
  tableName => `${domain}-${findStage(stage)}${findApp(app)}-${tableName}`

module.exports = {
  documentClient,
  namingConvention: namingConvention({domain, stage, app}),
}
