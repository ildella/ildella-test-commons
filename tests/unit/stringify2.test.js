const fs = require('fs')
const {finished} = require('stream/promises')

const {readJson} = require('../../src/commons/javascript-utils')

const __ = require('exstream.js')
const stringify2 = require('../../src/commons/stringify2')

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

const generate = require('./generate')
const {DuplexMock, BufferWritableMock} = require('stream-mock')

const create = index => `item-${index}`

test.skip('stringify messages to a Duplex', async () => {
  const input = generate(2, create)
  // const output = new DuplexMock()
  const output = new BufferWritableMock()
  __(input)
    .tap(item => console.log(item))
    .through(stringify2())
    .pipe(output)
  await finished(output)
  expect(output.data.toString()).toEqual(['item-1', 'item-2'])
})
