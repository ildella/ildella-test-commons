module.exports = ({
  client, groupId, topic, operation,
}) => {
  const consumer = client.consumer({groupId})
  return {
    attach: async () => {
      const fromBeginning = false
      await consumer.connect()
      await consumer.subscribe({
        topic,
        fromBeginning,
      })
      await consumer.run({
        autoCommit: false,
        eachMessage: async ({
          topic, partition, message,
        }) => {
          const {offset} = message
          await operation(topic, partition, message)
          consumer.commitOffsets([{
            topic,
            partition,
            offset: offset + 1,
          }])
        },
      })
    },
    detach: consumer.disconnect,
  }
}
