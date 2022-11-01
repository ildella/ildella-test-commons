const http = require('http')
const https = require('https')
const axios = require('axios')

module.exports = ({
  baseURL,
  hostname = '0.0.0.0',
  port = 80,
  timeout = 2500,
} = {}) => ({headers = {}} = {}) => axios.create({
  baseURL: baseURL || `http://${hostname}:${port}`,
  timeout,
  httpAgent: new http.Agent({keepAlive: true}),
  httpsAgent: new https.Agent({keepAlive: true}),
  insecureHTTPParser: false,
  transitional: {clarifyTimeoutError: true},
  headers: {
    'accept': 'application/json',
    'accept-encoding': 'gzip, deflate',
    'Content-Type': 'application/json; charset=utf-8',
    ...headers,
    // 'connection': 'keep-alive',
  },
})
