const through3 = require('./through3')

// const asArray = {
//   open: '[\n',
//   separator: ',\n',
//   close: ']\n',
// }
// const asObjectsSequence = {
//   open: '',
//   separator: '\n',
//   close: '',
// }

/*
  eslint-disable fp/no-mutation, fp/no-mutating-methods, fp/no-this, fp/no-let, unicorn/no-null
*/

const stringify3 = ({
  open = '[\n', separator = ',\n', close = ']\n', space = 0,
} = {}) => {
  let first = true
  return through3.obj(function (chunk, enc, callback) {
    try {
      const string = JSON.stringify(chunk, null, space)
      // console.log({string})
      if (first) this.push(`${open}`)
      first = false
      this.push(`${string}${separator}`)
      // callback(null, `${separator}${string}`)
      callback(null)
    } catch (error) {
      callback(error, chunk)
    }
  }, callback => {
    callback(null, close)
  })
}

module.exports = stringify3
