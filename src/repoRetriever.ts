import { Buffer } from 'buffer';
import Chalk from 'chalk';
import Fs from 'fs-extra';
import { Octokit } from '@octokit/rest';
import yargs from 'yargs';

export interface ArgumentsI {
    repo: string;
    owner: string;
    branch: string;
    githubToken?: string;
}

yargs.options({
    repo: {
        description: 'The name of the repo are trying to retrieve.',
        alias: 'r',
        type: 'string',
        demandOption: 'Specify the name of the repo you are trying to retrieve.',
        demand: true,
        requiresArg: true,
    },
    owner: {
        description: 'The name of the owner of the repo you are trying to retrieve.',
        alias: 'o',
        type: 'string',
        demandOption:
            'Specify the owner of the repo you are trying to retrieve, so we can find the repo.',
        demand: true,
        requiresArg: true,
    },
    branch: {
        description: 'The name of the branch of the repo you are trying to retrieve.',
        alias: 'b',
        type: 'string',
        demandOption: 'Specify the branch so we can retrieve the code of that specific branch.',
        demand: true,
        requiresArg: true,
    },
    githubToken: {
        description: 'This is required when trying to retrieve private repos.',
        alias: 'ght',
        type: 'string',
    },
});

const userArguments: ArgumentsI = {
    owner: yargs.argv.owner as string,
    repo: yargs.argv.repo as string,
    branch: yargs.argv.branch as string,
    githubToken: yargs.argv.githubToken as string,
};
const github = new Octokit({
    auth: userArguments.githubToken,
});
const repoOptions = {
    owner: userArguments.owner,
    repo: userArguments.repo,
    archive_format: 'zipball',
    ref: userArguments.branch,
};

github.repos
    .downloadZipballArchive(repoOptions)
    .then((response) => {
        Fs.outputFile(userArguments.repo + '.zip', Buffer.from(response.data as string)).catch(
            (error) => {
                console.log(
                    Chalk.red(`Failed in retrieving the ${userArguments.repo} from Github.`),
                );
                console.log(error);
            },
        );
        console.log(Chalk.green(`Successfully retrieved the ${userArguments.repo} from Github.`));
    })
    .catch((error) => {
        console.log(Chalk.red('Error occurred when retrieving the repository.'));
        console.log(
            Chalk.red(
                'Please make sure to pass github token when trying to retrieve private repo.',
            ),
        );
        console.log(
            Chalk.red(
                'This authenticates with GitHub that you have the right to retrieve the repo.',
            ),
        );
        console.log(error);
        process.exit(1);
    });
