const axios = require('axios')

module.exports = app => ({
  start: () => app.listen(0, '0.0.0.0'),
  stop: () => app.close(),
  client: () => {
    const {address, port} = app.server.address()
    return axios.create({
      baseURL: `http://${address}:${port}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
})
