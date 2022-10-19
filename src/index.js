const eslintConfigs = require('./eslint')
const jestCommons = require('./jest')
// const aws = require('./aws')
// const commons = require('./commons')
// const http = require('./http')

module.exports = {
  aws: () => require('./aws'),
  commons: () => require('./commons'),
  eslintConfigs,
  http: () => require('./http'),
  jestCommons,
}
