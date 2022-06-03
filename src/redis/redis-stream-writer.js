'strict'

const {Writable} = require('stream')

// const DEBUG = process.env.NODE_ENV !== 'production'

// const isObject = o => o !== null && 'object' === typeof o && !Array.isArray(o)
const serializeItem = (xAddArgument, item) => {
  // if (DEBUG && !isObject(item)) throw new Error('item must be an object')
  for (const key of Object.keys(item)) {
    const value = item[key]
    // if (DEBUG && 'string' !== typeof val) throw new Error('item[val] must be a string')
    // console.log(key, val)
    xAddArgument.push(key, value)
  }
}

const createWriter = (redis, key) => {
  const write = (item, _, callback) => {
    const arguments_ = [key, '*']
    serializeItem(arguments_, item)

    console.log(arguments_)
    redis.xadd(...arguments_, callback)
  }

  const writev = (items, _, callback) => {
    const arguments_ = [key, '*']
    for (let index = 0; index < items.length; index++) serializeItem(arguments_, items[index])
    redis.xadd(...arguments_, callback)
  }

  return new Writable({
    objectMode: true,
    highWaterMark: 16,
    write,
    writev,
  })
}

module.exports = createWriter
