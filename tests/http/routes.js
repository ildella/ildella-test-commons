module.exports = app => {
  app.get('/health', request => {
    const ip = request.socket.remoteAddress
    return {
      api: 'Test Commons API',
      status: 'ok',
      documentation: '/docs',
      ip,
    }
  })

  // eslint-disable-next-line require-await
  app.get('/abooom', async () => {
    // eslint-disable-next-line fp/no-throw
    throw new Error('big booom')
  })
  app.get('/booom', () => {
    // console.log(request.headers)
    // eslint-disable-next-line fp/no-throw
    throw new Error('big booom')
  })
  return app}
