const redis = require('ioredis')
const createClient = () => new redis()
const client = createClient()

const channel = 'perf-test'

const read = async () => {
}

read()
