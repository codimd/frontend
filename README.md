# THE MASTER BRANCH IS DEPRECATED. PLEASE USE OUR NEW MAIN BRANCH "MAIN"

# CodiMD - React Client

![lint and build](https://github.com/codimd/react-client/workflows/lint%20and%20build/badge.svg)
![e2e](https://github.com/codimd/react-client/workflows/e2e/badge.svg)

This is the new, improved and better looking frontend for CodiMD 2.0.
Our goal is to recreate the current frontend in react and to improve it.

## Preparation
You'll need at least Node 10 (we recommend 12). We use [yarn](https://yarnpkg.com/) for our dependencies.

## Development mode

1. Clone this repo (e.g. `git clone https://github.com/codimd/react-client.git codimd-react-client`)
2. Go inside the repo (e.g. `cd codimd-react-client`)
3. Run `yarn install`
4. Either run
    - `yarn start:dev` (expects [a server](https://github.com/codimd/server/tree/develop) running under [http://localhost:3000](http://localhost:3000))
    - `yarn start` (makes all api calls to the same domain the react-client runs on (normally [http://localhost:3001](http://localhost:3001) ))

This should run the app in the development mode and open [http://localhost:3001](http://localhost:3001) in your browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### Tests

#### Unit

Unit testing is done via jest.

1. Run `yarn test`

#### End2End

We use [cypress](https://cypress.io) for e2e tests.

1. Start the frontend with `yarn start`
2. Run `yarn cy:open` to open the cypress test loader
3. Choose your browser and test
4. Let the tests run

## Production mode

1. Clone this repo (e.g. `git clone https://github.com/codimd/react-client.git codimd-react-client`)
2. Go inside the repo (e.g. `cd codimd-react-client`)
3. Run `yarn install`
4. Run `yarn build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include a hash value of the content.
