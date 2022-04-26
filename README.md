# README

Examples and some common code for **integration tests** with different technologies, working together in a single projects.

## More commons Docs

#### NPM company registry config

Generate your token here: https://www.npmjs.com/settings/{a-company-name}/tokens/ and then:

```shell
company={a-company-name}
token=xxxxxxxxxxxxxxxxxxx
npm config set @${company}:registry https://registry.npmjs.org
npm config set //registry.npmjs.org/:_authToken $token
```

#### CircleCI and GitHub configuration

We need to authorize CircleCI to write to the GitHub repository inorder to update versioning in the `package.json` when `yarn publish` has done it's job. 

Here is the [CircleCI Documentation](https://circleci.com/docs/2.0/gh-bb-integration/#creating-a-github-deploy-key) that has been followed, and another [similar here](https://circleci.com/docs/2.0/add-ssh-key/)

In a nutshell: create a new ssh key on a laptop, upload public to GitHub and private to the CircleCI project settings under "Additional SSH Keys". Finally updated the Circleci config.yml with the key fingerprint as displayed on CircleCI. 

#### Yarn

```shell
yarn config set version-tag-prefix "v"
```
