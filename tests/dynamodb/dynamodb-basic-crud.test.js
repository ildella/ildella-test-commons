require('jest-dynalite/withDb')
require('../../src/aws/aws-init')

const {namingConvention} = require('../../src/aws/dynamo-commons')
const defaultDocumentClient = require('../../src/aws/dynamo-client')

const TableName = 'aObject'

test('naming convention', () => {
  const fullTableName = namingConvention(TableName)
  expect(fullTableName).toEqual('template-dev-my-new-app-aObject')
})

test('write / read basic info', async () => {
  const entityId = 'abc-123'
  const value = 'something'
  const Item = {
    entityId,
    value,
  }
  await defaultDocumentClient.put({
    TableName,
    Item,
  })
  const response = await defaultDocumentClient.get({
    TableName,
    Key: {
      entityId,
      value,
    },
  })
  expect(response).toEqual({
    Item: {
      entityId,
      value,
    },
  })
})
