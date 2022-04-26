module.exports = app => {
  app.get('/health', (request, reply) => {
    reply.send({
      api: 'Health',
      // version: '2019-07-09',
      status: 'ok',
      // documentation: '/docs',
    })
  })

  // DO NOT DO non-async routes that throw errors
  // app.post('/booom', (req, rep) => {
  //   throw new Error('big booom')
  // })

  // eslint-disable-next-line require-await
  app.post('/booom', async () => {
    // eslint-disable-next-line fp/no-throw
    throw new Error('big booom')
  })
  return app
}
