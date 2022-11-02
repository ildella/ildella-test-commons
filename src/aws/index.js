module.exports = {
  awsInit: () => require('./aws-init'),
  awsSsmUtils: () => require('./kinesalite-jest'),
  kinesaliteJest: () => require('./aws-ssm-utils'),
}
