const eslintConfigs = require('./eslint')
const jestCommons = require('./jest')

module.exports = {
  aws: () => require('./aws'),
  commons: () => require('./commons'),
  eslintConfigs,
  http: () => require('./http'),
  jestCommons,
}
