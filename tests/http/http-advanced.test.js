test.todo('startup speed: https://backend.cafe/how-to-unlock-the-fastest-fastify-server-startup')

test.todo('103 early hint: https://developer.chrome.com/blog/early-hints/')

/*
  Maybe fastify-app can be extracted in a services-commons package
  "Optimized" for backend service-to-service communication, with easy to use templates
  for different logging, make sre log local/CI/prod works, headers, config...

  Same with the axios http client with headers and config like
    insecureHTTPParser: false,
    transitional: {clarifyTimeoutError: true},
*/
test.todo('extract a sertice-to-service ready to use fastify-app to commons')
