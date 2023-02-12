# Pricingo.app
Cloud application for dynamic pricing developed by https://strategio.digital.

## Installation
1. Install & use Node.JS 12 via nvm `nvm use 12`
1. Update npm to the latest version `npm i npm -g`
1. Install firebase as global `npm i firebase -g`
1. Install npm dependencies `npm i`
1. Go to functions folder `cd functions`
1. Install & build npm dependencies `npm i && npm run build`
1. Go back to project root `cd ..`
   
## Launch project
1. Start firebase emulators `firebase emulators:start`
1. Start vue.js server `npm run serve`
1. Visit emulators dashboard on http://localhost:4000.
1. Visit application website: http://localhost:8080 or http://localhost:5000 for production mode.

## How to develop crawler?
1. Go to functions folder `cd functions`
1. Run typescript watcher `npm run watch`
1. Run crawler test `node lib/extractor/test/HeurekaListingTest.js`

## Deploy to Google Cloud Platform
1. Build sources `npm run build`
1. Deploy only hosting `firebase deploy --only hosting`
1. Deploy full stack `firebase deploy`