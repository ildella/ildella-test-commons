const __ = require('highland')
const {defaultDocumentClient} = require('./dynamo-commons')

const {nil} = __

const wrapPutRequest = item => ({
  PutRequest: {
    Item: item,
  },
})

// const wrapBatchWriteRequest = TableName => putRequests => ({
//   RequestItems: {
//     [TableName]: putRequests
//   }
// })

const batchWrite = ({TableName, batch, parallel = 1}) => __.pipeline(
  __.map(wrapPutRequest),
  __.batch(batch),
  __.map(defaultDocumentClient.wrapBatchWriteRequest(TableName)),
  __.map(batch => defaultDocumentClient.batchWrite(batch)),
  __.map(__),
  __.parallel(parallel) // TODO fix lint rules, we want a comma here.
)

/*
  eslint-disable unicorn/no-array-for-each, unicorn/no-null
*/

const recursiveQuery = lastParameters => async (push, next) => {
  const {Items: items, LastEvaluatedKey} = await defaultDocumentClient.query(lastParameters)
  items.forEach(item => push(null, item))
  if (LastEvaluatedKey) {
    const nextParameters = {...lastParameters, ExclusiveStartKey: LastEvaluatedKey}
    return next(recursiveQuery(nextParameters))
  }
  return push(null, nil)
}

const recursiveScan = lastParameters => async (push, next) => {
  const {Items: items, LastEvaluatedKey} = await defaultDocumentClient.scan(lastParameters)
  items.forEach(item => push(null, item))
  if (LastEvaluatedKey) {
    const nextParameters = {...lastParameters, ExclusiveStartKey: LastEvaluatedKey}
    return next(recursiveScan(nextParameters))
  }
  return push(null, nil)
}

module.exports = {
  batchWrite,
  query: recursiveQuery,
  scan: recursiveScan,
}
