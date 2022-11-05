const fs = require('fs')
const {finished} = require('stream/promises')
const __ = require('exstream.js')

const stringify3 = require('../../src/commons/stringify')
const {readJson} = require('../../src/commons/javascript-utils')

test('stringify3', async () => {
  const filename = '.stringify3.output.json'
  const output = fs.createWriteStream(filename)
  __([{a: 1}, {b: 'ciao'}, {c: 'hello again'}])
    .through(stringify3())
    .pipe(output)
  await finished(output)
  const json = await readJson(filename)
  expect(json).toEqual([{a: 1}, {a: 1}, {b: 'ciao'}, {c: 'hello again'}])
})
