#!/bin/bash

set -euxo pipefail

version=$(< "package.json" jq -r .version)
tag=v$version
gh release create "$tag"
