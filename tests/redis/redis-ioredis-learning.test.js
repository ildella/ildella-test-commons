const redis = require('ioredis')
const redisClient = new redis() // uses defaults unless given configuration object

test('promise set and get', async () => {
  const response = await redisClient.set('foo2', 'barz')
  expect(response).toBe('OK')
  const result = await redisClient.get('foo2')
  expect(result).toBe('barz')
})
