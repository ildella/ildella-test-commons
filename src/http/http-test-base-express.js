const axios = require('axios')

module.exports = app => {
  /* eslint-disable-next-line fp/no-let */
  let server
  return {
    start: () => {
      /* eslint-disable-next-line fp/no-mutation */
      server = app.listen(0)
    },
    stop: () => server.close(),
    client: () => axios.create({baseURL: `http://localhost:${server.address().port}`}),
  }
}
