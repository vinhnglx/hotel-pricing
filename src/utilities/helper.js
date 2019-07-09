// eslint-disable-next-line import/prefer-default-export

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
  'https://5c08f37bea3172001389ccbd.mockapi.io/hotels/tokyo/1';

export const DEFAULT_CURRENCY = '$';

export const MAX_PRICING_ITEM = 6;

export const SORTING_ORDER = ['price', 'stars', 'rating'];

// Rounded pricing
export const roundedPricing = (price, currency) => {
  return currency === 'KRW'
    ? Math.ceil(price / 100) * 100
    : Number(price.toFixed());
};

// Currency format
export const currencyFormatter = (roundedPrice, currency) => {
  let formattedPrice;
  switch (currency) {
    case 'KRW':
      formattedPrice = new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
        minimumFractionDigits: '0'
      }).format(roundedPrice);
      break;
    case 'CNY':
      formattedPrice = new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY',
        minimumFractionDigits: '0'
      }).format(roundedPrice);
      break;
    case 'SGD':
      formattedPrice = new Intl.NumberFormat('zh-SG', {
        style: 'currency',
        currency: 'SGD',
        currencyDisplay: 'code',
        minimumFractionDigits: '0'
      }).format(roundedPrice);
      break;
    default:
      formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: '0'
      }).format(roundedPrice);
  }
  return formattedPrice;
};

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
  // if there is tax then need to sum each competitor with tax before getting max competitor
  const updatedData = _.forOwn(comb, (value, key) => {
    let maxCompetitor;

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
    const newValue = value;
    newValue.maxCompetitor = maxCompetitor;

    return newValue;
  });

  return _.values(updatedData);
};

// Hotel sorting by price and stars and rating
export const sortHotels = hotels => {
  const nonPricingHotels = _.filter(hotels, el => {
    return !el.price;
  });

  const pricingHotelsDesc = _.orderBy(
    _.filter(hotels, el => {
      return el.price;
    }),
    SORTING_ORDER,
    ['desc', 'desc', 'desc']
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
