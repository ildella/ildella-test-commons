// const toMap = json => new Map(Object.entries(json))

const supportedFrameworks = {
  fastify: () => require('./http-test-base-fastify'),
  express: () => require('./http-test-base-express'),
}

module.exports = ({framework = 'fastify'} = {}) => supportedFrameworks[framework]()
