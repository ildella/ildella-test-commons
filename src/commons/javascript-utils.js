/*
  eslint-disable security/detect-non-literal-fs-filename
*/

const {EOL} = require('os')
const fsp = require('fs/promises')

const toMap = json => new Map(Object.entries(json))

const readJson = async (path, options) => {
  const buffer = await fsp.readFile(path, options)
  return JSON.parse(buffer.toString())
}

const writeJson = async (path, json) => {
  await fsp.writeFile(
    path,
    `${JSON.stringify(json)}${EOL}`
  )
  return json
}

module.exports = {
  toMap,
  readJson,
  writeJson,
}
