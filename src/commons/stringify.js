const through3 = require('./through3')

const open = '[\n'
const separator = ',\n'
const close = '\n]\n'

/*
  eslint-disable fp/no-mutation, fp/no-mutating-methods, fp/no-this, fp/no-let, unicorn/no-null
*/

const stringify3 = (space = 0) => {
  let first = true
  return through3.obj(function (chunk, enc, callback) {
    try {
      const string = JSON.stringify(chunk, null, space)
      if (first) this.push(`${open}${string}`)
      first = false
      // this.push(`${separator}${string}`)
      callback(null, `${separator}${string}`)
    } catch (error) {
      callback(error, chunk)
    }
  }, callback => {
    callback(null, close)
  })
}

module.exports = stringify3
