// eslint-disable-next-line import/prefer-default-export

import values from 'lodash/values';
import filter from 'lodash/filter';
import orderBy from 'lodash/orderBy';

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

// Remove prices if the hotel do not exist
export const filterPricesWithHotelIds = (prices, hotelIds) => {
  return prices.filter(item => {
    return hotelIds.indexOf(item.id) !== -1;
  });
};

// Matching hotels and prices based on ID
export const matchingHotelsWithPrices = (hotels, prices) => {
  return values(
    hotels.concat(prices).reduce((acc, x) => {
      acc[x.id] = Object.assign(acc[x.id] || {}, x);
      return acc;
    }, {})
  );
};

// Hotel sorting by prices
export const sortHotels = hotels => {
  const nonPricingHotels = filter(hotels, el => {
    return !el.price;
  });

  const pricingHotelsDesc = orderBy(
    filter(hotels, el => {
      return el.price;
    }),
    ['price'],
    ['desc']
  );

  return pricingHotelsDesc.concat(nonPricingHotels);
};
