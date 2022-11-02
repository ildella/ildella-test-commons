const {toMap} = require('../commons/javascript-utils')

const supportedFrameworks = toMap({
  fastify: () => require('./http-test-base-fastify'),
  express: () => require('./http-test-base-express'),
})

module.exports = ({framework = 'fastify'} = {}) => supportedFrameworks.get(framework)()

// module.exports = {
//   fastify: () => require('./http-test-base-fastify'),
//   express: () => require('./http-test-base-express'),
// }
