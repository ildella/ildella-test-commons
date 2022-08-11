const axios = require('axios')

module.exports = app => ({
  start: () => app.listen({
    port: 0,
    host: '0.0.0.0',
  }),
  stop: () => app.close(),
  client: ({headers = {}} = {}) => {
    const {address, port} = app.server.address()
    return axios.create({
      baseURL: `http://${address}:${port}`,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'accept': 'application/json',
        'accept-encoding': 'gzip, deflate',
        ...headers,
        // 'connection': 'keep-alive',
      },
    })
  },
  address: () => app.server.address(),
})
