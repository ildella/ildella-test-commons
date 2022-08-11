const client = global.http

test('basic http test', async () => {
  const {status} = await client().get('/health')
  expect(status).toEqual(200)
})

test('http 200', async () => {
  const {status, data} = await client().get('/health')
  expect(status).toEqual(200)
  expect(data).toHaveProperty('status', 'ok')
  expect(data).toHaveProperty('ip', '127.0.0.1')
})

test('missing - 404 - ok', done => {
  expect.assertions(3)
  client()
    .get('/missing')
    .then(() => done('nope'))
    .catch(error => {
      expect(error).toHaveProperty('message', 'Request failed with status code 404')
      expect(error).toHaveProperty('code', 'ERR_BAD_REQUEST')
      expect(error).toHaveProperty('name', 'AxiosError')
      done()
    })
})

test('post missing - 400 - weird', done => {
  expect.assertions(3)
  client()
    .post('/missing')
    .then(() => done('nope'))
    .catch(error => {
      expect(error).toHaveProperty('message', 'Request failed with status code 400')
      expect(error).toHaveProperty('code', 'ERR_BAD_REQUEST')
      expect(error).toHaveProperty('name', 'AxiosError')
      done()
    })
})

test('sync handler - 500', done => {
  expect.assertions(3)
  client()
    // .post('/booom') --> will get 400 for malformed response
    .get('/booom')
    .then(() => done('nope'))
    .catch(error => {
      expect(error).toHaveProperty('message', 'Request failed with status code 500')
      // is 415 Unsupported Media Type: application/x-www-form-urlencoded
      // if do not set client to {'Content-Type': 'application/json'}
      expect(error).toHaveProperty('code', 'ERR_BAD_RESPONSE')
      // expect(error).toHaveProperty('code', 'ERR_BAD_REQUEST')
      expect(error).toHaveProperty('name', 'AxiosError')
      done()
    })
})

test('use another content type', done => {
  expect.assertions(3)
  client({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'accept': 'application/x-www-form-urlencoded',
    },
  })
    .get('/booom')
    .then(() => done('nope'))
    .catch(error => {
      expect(error).toHaveProperty('message', 'Request failed with status code 500')
      // is 415 Unsupported Media Type: application/x-www-form-urlencoded
      // if do not set client to {'Content-Type': 'application/json'}
      expect(error).toHaveProperty('code', 'ERR_BAD_RESPONSE')
      // expect(error).toHaveProperty('code', 'ERR_BAD_REQUEST')
      expect(error).toHaveProperty('name', 'AxiosError')
      done()
    })
})

test('async handler - 500', done => {
  expect.assertions(3)
  client()
    .get('/abooom')
    .then(() => done('nope'))
    .catch(error => {
      expect(error).toHaveProperty('message', 'Request failed with status code 500')
      expect(error).toHaveProperty('code', 'ERR_BAD_RESPONSE')
      expect(error).toHaveProperty('name', 'AxiosError')
      done()
    })
})
