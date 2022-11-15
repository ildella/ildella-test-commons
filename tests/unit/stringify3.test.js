const {DuplexMock, BufferWritableMock} = require('stream-mock')
// const fs = require('fs')
const {finished} = require('stream/promises')
const __ = require('exstream.js')

const stringify3 = require('../../src/commons/stringify')
const {readJson} = require('../../src/commons/javascript-utils')

test('stringify3', async () => {
  const filename = '.stringify3.output.json'
  const output = new BufferWritableMock()
  __([{a: 1}, {b: 'nice'}, {c: true}])
    .through(stringify3())
    .pipe(output)
  await finished(output)
  expect(output.data.toString()).toEqual(`[
  {a: 1},
  {a: 1},
  {b: "nice"},
  {c: true}
  ]`)
})

const generate = require('./generate')
const create = index => `item-${index}`

test('stringify messages to a Duplex', async () => {
  const input = generate(2, create)
  const output = new BufferWritableMock()
  __(input)
    .tap(item => console.log(item))
    .through(stringify3())
    .pipe(output)
  await finished(output)
  expect(output.data.toString()).toEqual(['item-1', 'item-2'])
})
