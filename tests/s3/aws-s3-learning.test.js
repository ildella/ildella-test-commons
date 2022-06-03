// more examples: https://www.codota.com/code/javascript/functions/aws-sdk/S3/deleteObject

const path = require('path')
const {promisify} = require('util')
const fs = require('fs')
const {v1: uuid} = require('uuid')
const mime = require('mime-types')
const AWS = require('aws-sdk')

const s3Env = {
  containerUploads: 'custom-container-name',
  keyId: 'AKIA444FFFDDDSSS',
  key: 'dkasldkwdoawdm,admawdawmeweakl',
  region: 'us-east-1',
}

const {
  containerUploads: Bucket,
  keyId: accessKeyId,
  key: secretAccessKey,
  region,
} = s3Env

AWS.config.update({
  accessKeyId,
  secretAccessKey,
  region,
})

const s3 = new AWS.S3()
const upload = promisify(s3.upload.bind(s3))
const getSignedUrl = promisify(s3.getSignedUrl.bind(s3))

test.skip('upload a string', async () => {
  const Key = uuid()
  const data = await upload({
    // ACL: 'public-read',
    ContentType: 'text',
    Bucket,
    Key,
    Body: 'content of the file',
    // StorageClass: 'REDUCED_REDUNDANCY'
  })
  const {
    Location, ETag, ServerSideEncryption, key,
  } = data
  expect(Location).toContain(Key)
  expect(key).toBe(Key)
  expect(ServerSideEncryption).toBe('AES256')
  expect(ETag).toBe('"5f5bd91b5de57c728858ad237a663a18"')
  // expect(data).toBe({})
})

const ResponseContentType = mime.lookup('pdf')
const ResponseContentDisposition = 'attachment'
const Expires = 600

test.skip('upload a file and get signed link', async () => {
  const ContentType = mime.lookup('pdf')
  const filepath = path.join(__dirname, 'fixtures/sample.pdf')
  console.log(filepath)
  const Key = uuid()
  const is = fs.createReadStream(filepath)
  const data = await upload({
    ContentType,
    Bucket,
    Key,
    Body: is,
  })
  const {Location, ETag} = data
  expect(ETag).toBe('"331e8397807e65be4f838ccd95787880"')
  expect(Location).toBe(`.s3.amazonaws.com/${Key}`)
  console.log(Key)

  const params = {
    Bucket,
    Key,
    Expires,
    ResponseContentDisposition,
    ResponseContentType,
  }
  const signedUrl = await getSignedUrl('getObject', params)
  expect(signedUrl).toContain('.s3.amazonaws.com/')
  expect(signedUrl).toContain('&response-content-disposition=attachment&response-content-type=application%2Fpdf')
})

test.skip('sign existing upload', async () => {
  const Key = '0e5cf485-8bbf-47d5-b12e-3aa78fab69dc'
  const params = {
    Bucket,
    Key,
    Expires,
    ResponseContentDisposition,
    ResponseContentType,
  }
  const signedUrl = await getSignedUrl('getObject', params)
  expect(signedUrl).toContain('.s3.amazonaws.com/')
  expect(signedUrl).toContain('&response-content-disposition=attachment&response-content-type=application%2Fpdf')
})
