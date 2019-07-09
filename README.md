# Hotel Pricing

A simplified version of a hotel result display upon getting the data after a RESTful API call to the backend.

## Getting Started

Follow steps to start the app

- Install dependencies

```
yarn install
```

- Start the application

```
yarn start
```

- Run the test

```
yarn test
```

## NOTE

- The [helper.js](src/utilities/helper.js) includes

  - all logic functions: pricing round, currency formatter, remove prices without hotel exist, combine hotel and price, sorting order, hotels sorting, price sorting, taxInclusive calculation

  - configuration: supported currenciesList, API endpoints, default currency, max pricing item that want to display on each hotel from index page and sorting order.

- I am using the [Puppeteer](https://github.com/GoogleChrome/puppeteer) for E2E test, hence please keep the development server running before running `yarn test`
