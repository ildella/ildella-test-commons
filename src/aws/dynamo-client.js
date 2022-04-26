const {documentClient, namingConvention} = require('./dynamo-commons')

const client = ({documentClient, namingConvention}) => ({
  put: ({TableName, Item}) =>
    documentClient.put({TableName: namingConvention(TableName), Item}).promise(),

  get: ({TableName, Key}) =>
    documentClient.get({TableName: namingConvention(TableName), Key}).promise(),

  delete: ({TableName, Key}) =>
    documentClient.delete({TableName: namingConvention(TableName), Key}).promise(),

  update: ({TableName, ...parameters}) =>
    documentClient.update({TableName: namingConvention(TableName), ...parameters}).promise(),

  wrapPutRequestInBatch: TableName => putRequests => ({
    RequestItems: {
      [namingConvention(TableName)]: putRequests,
    },
  }),

  batchWrite: batch => documentClient.batchWrite(batch).promise(),

  /* eslint-disable fp/no-rest-parameters */
  scan: ({TableName, ...Parameters}) =>
    documentClient.scan({TableName: namingConvention(TableName), ...Parameters}).promise(),

  query: ({TableName, ...Parameters}) =>
    documentClient.query({TableName: namingConvention(TableName), ...Parameters}).promise(),

})

const defaultDocumentClient = client({
  documentClient: documentClient(),
  namingConvention,
})

module.exports = defaultDocumentClient
