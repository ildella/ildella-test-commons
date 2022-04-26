const fastify = require('fastify')

const onRequest = (request, reply, next) => {
  // rep.header('Access-Control-Allow-Headers', [])
  // rep.header('Access-Control-Request-Headers', [])
  // rep.header('Access-Control-Expose-Headers', true)
  reply.header('Access-Control-Allow-Origin', '*')
  reply.header('Access-Control-Allow-Methods', ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'])
  reply.header('Access-Control-Allow-Credentials', true)
  next()
}

module.exports = ({
  logLevel = 'debug',
} = {}) => {
  const instance = fastify( {
    logger: {level: logLevel || 'warn'},
  })
  instance.addHook('onRequest', onRequest)
  return instance
}
