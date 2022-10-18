# README

In this project I have a few key objectives: 

  * Having **integration tests** for different target technologies, working niceley together in a single project.
  * Some common code for tests and intgrations tests
  * A single dependency I can bring in a new project that will import all I need for linting and testing code. 
  
The linting part is mostly done in a [separate effort](https://github.com/ildella/eslint-config-node-opinionated) that can be used as a standalone lint config.

Those three main objectives could be split up in more projects of couse but for now having one for the lint config and one more for the rest is enough to support and provide decent separation. 

Oh: all of this works for Node.js project, in *Javascript*.

## Single Dependency

```shell
npm install ildella-test-commons
# Or...
yarn add ildella-test-commons
```

Or one can use this [template project](https://github.com/ildella/ildella-nodejs-template/) straight away. 

If you do not want to use my template project, which is reasonable, here's how to configure yours from scratchers
  
  * A sample [eslint.rc](https://github.com/ildella/ildella-nodejs-template/blob/master/.eslintrc.js)
  * A sample [jest.config.js](https://github.com/ildella/ildella-nodejs-template/blob/master/jest.config.js)

## Integration Tests

TBD...

## Some more stuff...

#### NPM company registry config

Generate your token here: https://www.npmjs.com/settings/{a-company-name}/tokens/ and then:

```shell
company={a-company-name}
token=xxxxxxxxxxxxxxxxxxx
npm config set @${company}:registry https://registry.npmjs.org
npm config set //registry.npmjs.org/:_authToken $token
```

To publish to Github registry, other than using the straightforward GitHub action workflow, one must also set this in `package.json`:

```json
  "publishConfig": {
    "@${company}:registry": "https://npm.pkg.github.com/"
  },
```

#### CircleCI and GitHub configuration

We need to authorize CircleCI to write to the GitHub repository inorder to update versioning in the `package.json` when `yarn publish` has done it's job. 

Here is the [CircleCI Documentation](https://circleci.com/docs/2.0/gh-bb-integration/#creating-a-github-deploy-key) that has been followed, and another [similar here](https://circleci.com/docs/2.0/add-ssh-key/)

In a nutshell: create a new ssh key on a laptop, upload public to GitHub and private to the CircleCI project settings under "Additional SSH Keys". Finally updated the Circleci config.yml with the key fingerprint as displayed on CircleCI. 

#### Yarn

```shell
yarn config set version-tag-prefix "v"
```
