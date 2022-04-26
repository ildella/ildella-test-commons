const AWS = require('aws-sdk')

const {SSM} = AWS

const get = async Name => {
  const {Parameter} = await new SSM().getParameter({Name}).promise()
  return Parameter.Value
}

const put = (Name, Value) => new SSM().putParameter({
  Name, Value, Overwrite: true, Type: 'String',
}).promise()

module.exports = {
  get,
  put,
}
