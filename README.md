# List Files App
An app that lists the folders and files in a source folder

* list should be ordered by size, and it should return the size and last modification date of each element. Also, a count of the files and the total size should be provided

## Running Locally
There are 2 ways of using the app:
1. On a CLI
1. With a UI

### Run on a CLI
1. In the root, run `npm install`
1. Run `npm run cli-app`

### Run with UI
1. Create a `.env` file at the root of the project and add `PORT={port number}`
1. In the root, run `npm install`
1. Run `npm run local`
1. Navigate to the your `localhost:{port number}`

## Production
To run the built app: 
1. Add the `PORT={port number}` to your `.env` file
1. Run `docker-compose up`. Or `docker-compose up -d` if you want to run the app detached in the background.
1. Navigate to the your `localhost:{port number}`
