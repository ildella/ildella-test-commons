# README

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/npm/v/ildella-test-commons.svg?style=flat-square)](https://npmjs.com/package/ildella-test-commons)
[![Build](https://github.com/ildella/ildella-test-commons/actions/workflows/build.yml/badge.svg)](https://github.com/ildella/ildella-test-commons/actions)

In this project I have a few key objectives: 

  * Having **integration tests** for different target technologies, working niceley together in a single project.
  * Some common code for tests and intgrations tests
  * A single dependency I can bring in a new project that will import all I need for linting and testing code. 
  
The linting part is mostly done in a [separate effort](https://github.com/ildella/eslint-config-node-opinionated) that can be used as a standalone lint config.

Those three main objectives could be split up in more projects of couse but for now having one for the lint config and one more for the rest is enough to support and provide decent separation. 

Oh: all of this works for Node.js projects, in *JavaScript*.

## Single Dependency

```shell
yarn add ildella-test-commons
# Or...
npm install ildella-test-commons
```

Or one can use this [template project](https://github.com/ildella/ildella-nodejs-template/) straight away. 

If you do not want to use my template project, which is reasonable, here's how to configure yours from scratchers
  
  * A sample [eslint.rc](./.eslintrc.js)
  * A sample [jest.config.js](./jest.config.js)
