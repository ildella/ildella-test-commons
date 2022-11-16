/*
  Taken from through2 but using the core node:stream module to have no extra dependencies
  All credits to @rvagg: https://github.com/rvagg/through2/blob/master/through2.js
*/

/*
  eslint-disable fp/no-mutation, fp/no-this, unicorn/no-null
*/

const {Transform} = require('stream')

function inherits (parent, transform) {
  parent.super_ = transform
  parent.prototype = Object.create(transform.prototype, {
    constructor: {
      value: parent,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  })
}

// create a new export function, used by both the main export and
// the .ctor export, contains common logic for dealing with arguments
function through3 (construct) {
  return (options, transform, flush) => {
    if (typeof options === 'function') {
      flush = transform
      transform = options
      options = {}
    }

    if (typeof transform !== 'function') {
      // noop
      transform = (chunk, enc, callback) => callback(null, chunk)
    }

    if (typeof flush !== 'function') {
      flush = null
    }

    return construct(options, transform, flush)
  }
}

// main export, just make me a transform stream!
const make = through3((options, transform, flush) => {
  const t2 = new Transform(options)

  t2._transform = transform

  if (flush) {
    t2._flush = flush
  }

  return t2
})

// make me a reusable prototype that I can `new`, or implicitly `new`
// with a constructor call
const ctor = through3((options, transform, flush) => {
  function Through3 (override) {
    if (!(this instanceof Through3)) {
      return new Through3(override)
    }

    this.options = Object.assign({}, options, override)

    Transform.call(this, this.options)

    this._transform = transform
    if (flush) {
      this._flush = flush
    }
  }

  inherits(Through3, Transform)

  return Through3
})

const objectMode = through3((options, transform, flush) => {
  const t2 = new Transform(Object.assign({
    objectMode: true,
    highWaterMark: 16,
  }, options))

  t2._transform = transform

  if (flush) {
    t2._flush = flush
  }

  return t2
})

module.exports = make
module.exports.ctor = ctor
module.exports.obj = objectMode
