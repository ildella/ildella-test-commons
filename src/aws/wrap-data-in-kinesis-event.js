module.exports = ({partitionKey, data}) => ({
  Records: [
    {
      kinesis: {
        partitionKey,
        data,
      },
    },
  ],
})
