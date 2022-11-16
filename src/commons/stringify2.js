/*
  eslint-disable fp/no-mutation, fp/no-mutating-methods, fp/no-this, fp/no-let, unicorn/no-null
*/

const through2 = require('through2')

const open = '[\n'
const separator = ',\n'
const close = '\n]\n'

const stringify2 = (space = 0) => {
  let first = true
  return through2.obj(function (chunk, enc, callback) {
    try {
      const string = JSON.stringify(chunk, null, space)
      if (first) this.push(`${open}${string}`)
      first = false
      this.push(`${separator}${string}`)
      callback()
    } catch (error) {
      callback(error, chunk)
    }
  }, function (callback) {
    this.push(close)
    callback()
  })
}

module.exports = stringify2
