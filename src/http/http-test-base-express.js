const httpJsonClient = require('../commons/http-json-client')

module.exports = app => {
  /* eslint-disable-next-line fp/no-let */
  let server
  return {
    start: () => {
      /* eslint-disable-next-line fp/no-mutation */
      server = app.listen(0)
    },
    stop: () => server.close(),
    // client: () => axios.create({baseURL: `http://localhost:${server.address().port}`}),
    client: ({headers = {}} = {}) => {
      const {address, port} = app.server.address()
      const client = httpJsonClient({baseURL: `http://${address}:${port}`})
      return client(headers)
    },

  }
}
