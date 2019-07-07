// eslint-disable-next-line import/prefer-default-export

// import values from 'lodash/values';
// import filter from 'lodash/filter';
// import orderBy from 'lodash/orderBy';

import _ from 'lodash';

export const currenciesList = {
  $: 'USD',
  S$: 'SGD',
  'CN¥': 'CNY',
  '₩': 'KRW'
};

export const HOTELS_DATA_URL =
  'https://5c08f37bea3172001389ccbd.mockapi.io/hotels/tokyo';

export const PRICE_DATA_URL =
  'http://5c08f37bea3172001389ccbd.mockapi.io/hotels/tokyo/1';

export const MAX_PRICING_ITEM = 6;

// Remove prices if the hotel do not exist
export const filterPricesWithHotelIds = (prices, hotelIds) => {
  return prices.filter(item => {
    return hotelIds.indexOf(item.id) !== -1;
  });
};

// Matching hotels and prices based on ID
export const matchingHotelsWithPrices = (hotels, prices) => {
  // Combine by id
  const comb = hotels.concat(prices).reduce((acc, x) => {
    acc[x.id] = Object.assign(acc[x.id] || {}, x);
    return acc;
  }, {});

  // Add maxCompetitor pricing if there is
  // BUG: If there is tax then values must be calculated with tax before get max
  const updatedData = _.forOwn(comb, (value, key) => {
    let maxCompetitor;
    // let newValue;
    if (value.competitors) {
      const taxesFees = value.taxes_and_fees;
      const valuesCompetitors = taxesFees
        ? _.map(
            _.values(value.competitors),
            el => el + taxesFees.tax + taxesFees.hotel_fees
          )
        : _.values(value.competitors);
      maxCompetitor = _.max(valuesCompetitors);
    }
    // value.maxCom = maxCompetitor;
    const newValue = value;
    newValue.maxCompetitor = maxCompetitor;

    return newValue;
  });

  return _.values(updatedData);
};

// Hotel sorting by prices
export const sortHotels = hotels => {
  const nonPricingHotels = _.filter(hotels, el => {
    return !el.price;
  });

  const pricingHotelsDesc = _.orderBy(
    _.filter(hotels, el => {
      return el.price;
    }),
    ['price'],
    ['desc']
  );

  return pricingHotelsDesc.concat(nonPricingHotels);
};

// Pricing sorting in a hotel
export const sortPricing = hotel => {
  const { price, competitors = {} } = hotel;
  competitors.Hotel = price;

  const pairs = Object.entries(competitors);

  const sortedPairs = pairs.sort((a, b) => a[1] - b[1]);

  return _.fromPairs(sortedPairs);
};

// Including tax and fee if there is
export const taxInclusive = (pricing, taxFee) => {
  const { tax, hotel_fees } = taxFee;
  const pricingTaxInclusive = {};

  Object.keys(pricing).forEach(key => {
    pricingTaxInclusive[key] = pricing[key] + tax + hotel_fees;
  });

  return pricingTaxInclusive;
};
