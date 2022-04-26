const aObject = {
  TableName: 'template-dev-my-new-app-aObject',
  KeySchema: [
    {AttributeName: 'entityId', KeyType: 'HASH'},
    {AttributeName: 'value', KeyType: 'RANGE'},
  ],
  AttributeDefinitions: [
    {AttributeName: 'entityId', AttributeType: 'S'},
    {AttributeName: 'value', AttributeType: 'S'},
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
}

module.exports = {
  aObject,
  all: [aObject],
}
