# repo-retriever

Retrieve and store GitHub repo as a zip archive.

## TODO

- [ ] Add tests and get 100% test coverage

- [ ] Add other distributed version control and source management support

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install github-repo-retriever
```

## Usage

Using the CLI

```sh
$ node bin/repoRetriever.js --help
Options:
  --help                Show help                                      [boolean]
  --version             Show version number                            [boolean]
  --repo, -r            The name of the repo are trying to retrieve.
                                                             [string] [required]
  --owner, -o           The name of the owner of the repo you are trying to
                        retrieve.                            [string] [required]
  --branch, -b          The name of the branch of the repo you are trying to
                        retrieve.                            [string] [required]
  --githubToken, --ght  This is required when trying to retrieve private repos.
                                                                        [string]
```

## About

### Contributing

Pull requests are always welcome. 

For bugs and feature requests, [please create an issue](../../issues/new).

### Author

**Basel Ahmed**

* [github/baselwebdev](https://github.com/baselwebdev)
* [twitter/baselwebdev](https://twitter.com/baselwebdev)

### License

Copyright © 2020, [Basel Ahmed](https://github.com/baselwebdev).
Released under the [MIT License](LICENSE).
