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

const logger = ({stream, level}) => ({
  stream,
  redact: ['req.headers.authorization'],
  level,
})

module.exports = ({
  logLevel = 'warn',
  // https,
} = {}) => {
  // const stream = createWriteStream(`${tmpdir}/custom.http.log`)
  // const {key, cert} = https
  const instance = fastify({
    logger: logger({
      // stream,
      level: logLevel,
    }),
    // http2: true,
    // https: {allowHTTP1: true, key, cert},
  })
  instance.addHook('onRequest', onRequest)
  return instance
}
