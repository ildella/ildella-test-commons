module.exports = {
  required: [
    'entityId',
    'title',
  ],
  // additionalProperties: false,
  properties: {
    entityId: {
      type: 'string',
      description: 'Id',
    },
    title: {
      type: 'string',
      description: 'Title',
    },
  },
}
