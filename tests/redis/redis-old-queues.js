const redis = require('redis').createClient(process.env.REDIS_SERVER_URL)

const Queue = require('bee-queue')

const create = name => new Queue(name, {redis})

const enqueue = async (queue, payload, cb) => {
  const job = await queue.createJob(payload).save()
  job.on('succeeded', result => { console.log(`Job ${job.id} succeded`, result) })
  job.on('retrying', () => { console.log(`Retrying Job ${job.id}`) })
  job.on('failed', error => { console.error(`Job ${job.id} failed`, error) })
  cb(null, job)
}
