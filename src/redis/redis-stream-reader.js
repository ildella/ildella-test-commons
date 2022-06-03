'use strict'

const {Readable} = require('stream')

const BEGINNING = '0'

const defaults = {
  live: true,
  waitTimeout: Number.POSITIVE_INFINITY,
  history: false,
  limit: Number.POSITIVE_INFINITY,
}

const createReader = (redis, key, opt = {}) => {
  opt = Object.assign({}, defaults, opt)
  const {
    live, history, limit,
  } = opt
  const block = opt.waitTimeout === Number.POSITIVE_INFINITY ? 0 : opt.waitTimeout

  let cursor = history ? BEGINNING : '$'
  let itemsRead = 0

  const onData = (error, res) => {
    if (error) {
      out.emit('error', error)
      return
    }

    // end of stream?
    if (!res) {
      out.push(null)
      return
    }

    // unpack result, move cursor
    const rows = res[0][1] // get rows for the only stream we queried
    const nrOfRows = rows.length
    cursor = rows[nrOfRows - 1][0]
    itemsRead += nrOfRows

    // parse rows and emit items
    for (let index = 0; index < nrOfRows; index++) {
      const raw = rows[index][1]
      const item = Object.create(null)
      for (let index = 0; index < raw.length; index += 2) item[raw[index]] = raw[index + 1]
      out.push(item)
    }

    if (itemsRead >= limit) out.push(null)
  }

  const read = size => {
    const count = Math.min(size, limit)
    if (live) redis.xread('count', count, 'block', block, 'streams', key, cursor, onData)
    else redis.xread('count', count, 'streams', key, cursor, onData)
  }

  const out = new Readable({
    objectMode: true,
    highWaterMark: 32,
    read,
  })
  return out
}

module.exports = createReader
