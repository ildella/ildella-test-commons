const tracer = require('tracer')

const standard = ({level = 'info'} = {}) => tracer.colorConsole({
  format: [
    '{{message}} (in {{file}}:{{line}})',
  ],
  level,
})

const local = ({level = 'info'} = {}) => tracer.colorConsole({
  format: [
    '{{timestamp}} {{message}} (in {{file}}:{{line}})',
  ],
  level,
  dateformat: 'HH:MM:ss',
  transport: [
    data => { process.stdout.write(`${data.output}\n`) },
  ],
})

module.exports = {
  standard,
  local,
}
