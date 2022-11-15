const {nil} = require('./functional')

const generate = (length = 2, create) => (push, next) => {
  Array.from({length}, (v, index) => {
    const item = create ? create(index) : index
    push(item)
  })
  push(nil)
}

module.exports = generate
