const createCollection = (database, name, jsonSchema) => database.createCollection(name, {
  validator: {$jsonSchema: jsonSchema},
})

const tenantDatabase = activeConnection => activeConnection.db('tenantId')

const collection = (activeConnection, collectionName) => {
  const database = tenantDatabase(activeConnection)
  return database.collection(collectionName)
}

module.exports = {
  createCollection,
  tenantDatabase,
  collection,
}
