const AWS = require('aws-sdk')
const options = {
  region: 'eu-west-2',
  maxRetries: 1,
  httpOptions: {connectTimeout: 3500, timeout: 3000},
}
AWS.config.update({
  ...options,
})

module.exports = {
  AWS,
}
