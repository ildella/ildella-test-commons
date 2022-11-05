const fs = require('fs')
const {finished} = require('stream/promises')
const through2 = require('through2')

const {readJson} = require('../../src/commons/javascript-utils')

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

const __ = require('exstream.js')

test('stringify2', async () => {
  const filename = '.stringify2.output.json'
  const output = fs.createWriteStream(filename)
  __([{a: 1}, {b: 'ciao'}, {c: 'hello again'}])
    .through(stringify2())
    .pipe(output)
  await finished(output)
  const json = await readJson(filename)
  expect(json).toEqual([{a: 1}, {a: 1}, {b: 'ciao'}, {c: 'hello again'}])
})
