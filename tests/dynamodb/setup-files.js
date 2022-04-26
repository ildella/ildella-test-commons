const {setup} = require('jest-dynalite')
// setup(process.cwd()) // look for jest-dynalite-config in project root...
setup(__dirname) // ... or in the current folder

const AWS = require('aws-sdk')
const dynaliteOptions = {
  dynamodb: {endpoint: process.env.MOCK_DYNAMODB_ENDPOINT},
  sslEnabled: false,
  // region: 'localhost',
}
AWS.config.update({
  ...dynaliteOptions,
})
