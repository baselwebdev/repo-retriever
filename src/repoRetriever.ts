import Chalk from 'chalk';
import { Buffer } from 'buffer';
import { Octokit } from '@octokit/rest';
import Fs from 'fs-extra';

const githubToken = USER_ARGUMENT;
const branch = USER_ARGUMENT;

const github = new Octokit({
    auth: githubToken,
});
const repoOptions = {
    owner: 'baselwebdev',
    repo: 'life-plus',
    archive_format: 'zipball',
    ref: branch,
};

github.repos
    .downloadZipballArchive(repoOptions)
    .catch((error) => {
        console.log(Chalk.red('Error occurred when retrieving the repository.'));
        console.log(error);
        process.exit(8);
    })
    .then((response) => {
        Fs.outputFile('LifePlus.zip', Buffer.from(response.data as string)).catch(
            (error) => {
                console.log(error);
            },
        );
        console.log(Chalk.green('Successfully retrieved the Life Plus from Github.'));
    });
