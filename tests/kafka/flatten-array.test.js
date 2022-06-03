const flatten = input => {
  const flat = []
  input.forEach(item => {
    if (Array.isArray(item)) {
      return flat.push(...flatten(item))
    }
    flat.push(item)
  })
  return flat
}

test('flatten given example', () => {
  const input = [ 1, [ 2, [ 3 ] ], 4 ]
  const expected = [ 1, 2, 3, 4 ]
  expect(expected).toEqual(flatten(input))
})

test('edge empty', () => {
  expect([]).toEqual(flatten([]))
})

test('one more', () => {
  const input = [[1, 2, 3], [[4, 5], 6, [7, 8, [9]]]]
  expect([1, 2, 3, 4, 5, 6, 7, 8, 9]).toEqual(flatten(input))
})

const __ = require('highland')

test('highland', done => {
  const input = [[1, 2, 3], [[4, 5], 6, [7, 8, 9]]]
  __(input).flatten().toArray(output => {
    expect(output).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
    done()
  })
})

// const {NumberStream} = require('scramjet')

// test('scramjet', () => {
//   const input = [[1, 2, 3], [[4, 5], 6, [7, 8, 9]]]
//   const result = NumberStream.from(input).flatten()
//   // expect([1, 2, 3, 4, 5, 6, 7, 8, 9]).toEqual(result)
// })
