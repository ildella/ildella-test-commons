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
    } catch (err) {
      callback(err, chunk)
    }
  }, function (cb) {
    this.push(close)
    cb()
  })
}

module.exports = stringify2
