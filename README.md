# README

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/npm/v/ildella-test-commons.svg?style=flat-square)](https://npmjs.com/package/ildella-test-commons)
[![Build](https://github.com/ildella/ildella-test-commons/actions/workflows/build.yml/badge.svg)](https://github.com/ildella/ildella-test-commons/actions)

**DEPRACETED. Please use the drop-in replacement: [moar-js-dev](https://github.com/ildella/moar-js-dev)**

In this project I have a few key objectives: 

  * A single dependency I can bring in a new project that will import all I need for linting and testing code. 
  * A project structure to mix up fast **unit** and **integration** and **functional tests** that can target different technologies and working niceley together, in a single project.
  * Common code for testing stuff, like an embedded http server with its client, a properly configured http-json client and more.
  
The linting part is mostly done in a [separate effort](https://github.com/ildella/eslint-config-node-opinionated) that can be used as standalone `eslint-config`.

All of this works for Node.js projects, in pure **JavaScript**.

## Single Dependency

```shell
yarn add ildella-test-commons
# Or...
npm install ildella-test-commons
```

You can use this [template project](https://github.com/ildella/ildella-nodejs-template/) straight away.

If you do not want to use my template project, here's how to configure yours from scratch.
  
  * A minimal [.eslintrc.js](./.eslintrc.js) config or even better you can create your own `.eslintrc.js` with the exact content of [this file](src/eslint/jest-fp-unicorn-eslint-config.js)
  * A sample [jest.config.js](./jest.config.js)
