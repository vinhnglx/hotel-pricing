import _ from 'lodash';
import {
  roundedPricing,
  currenciesList,
  currencyFormatter,
  filterPricesWithHotelIds,
  matchingHotelsWithPrices,
  sortPricing,
  taxInclusive,
  sortHotels
} from './helper';

it('rounds a price by currency code', () => {
  const currencyCode = currenciesList['₩'];

  expect(roundedPricing(102328.23, currencyCode)).toEqual(102400);
});

it('formats the currency number', () => {
  const korCode = currenciesList['₩'];
  const usCode = currenciesList.$;
  const chCode = currenciesList['CN¥'];
  const sgCode = currenciesList.S$;

  const korRoundedPrice = roundedPricing(102328.23, korCode);
  const usRoundedPrice = roundedPricing(102328.23, usCode);
  const chRoundedPrice = roundedPricing(102328.23, chCode);
  const sgRoundedPrice = roundedPricing(102328.23, sgCode);

  expect(currencyFormatter(korRoundedPrice, korCode)).toEqual('₩ 102,400');
  expect(currencyFormatter(usRoundedPrice, usCode)).toEqual('$102,328');
  expect(currencyFormatter(chRoundedPrice, chCode)).toEqual('CN¥ 102,328');
  expect(currencyFormatter(sgRoundedPrice, sgCode)).toEqual('SGD 102,328');
});

it('removes price element if the hotel do not exist', () => {
  const hotels = [
    {
      id: 1,
      name: 'FooBar Hotel'
    },
    {
      id: 2,
      name: 'BarFoo Hotel'
    }
  ];

  const pricing = [
    {
      id: 1,
      price: 164
    },
    {
      id: 3,
      price: 293
    }
  ];

  expect(filterPricesWithHotelIds(pricing, _.map(hotels, 'id'))).toEqual([
    { id: 1, price: 164 }
  ]);
});

it('combine hotel and price and adding a new maxCompetitor field', () => {
  const hotels = [
    {
      id: 1,
      name: 'FooBar Hotel'
    },
    {
      id: 2,
      name: 'BarFoo Hotel'
    }
  ];

  const pricing = [
    {
      id: 1,
      price: 164
    },
    {
      id: 2,
      price: 164,
      competitors: {
        Traveloka: 190,
        Expedia: 163
      }
    }
  ];

  const combinedData = matchingHotelsWithPrices(hotels, pricing);

  expect(_.filter(combinedData, el => el.maxCompetitor).length).toEqual(1);
  expect(
    _.includes(_.map(combinedData, el => el.name), 'FooBar Hotel')
  ).toBeTruthy();
  expect(combinedData.length).toEqual(2);
});

it('combines tax-inclusive hotel and price and adding a new maxCompetitor field', () => {
  const hotels = [
    {
      id: 1,
      name: 'FooBar Hotel'
    },
    {
      id: 2,
      name: 'BarFoo Hotel'
    }
  ];

  const pricing = [
    {
      id: 1,
      price: 164
    },
    {
      id: 2,
      price: 164,
      competitors: {
        Traveloka: 190,
        Expedia: 163
      },
      taxes_and_fees: {
        tax: 13.12,
        hotel_fees: 16.4
      }
    }
  ];

  const combinedData = matchingHotelsWithPrices(hotels, pricing);

  expect(_.filter(combinedData, el => el.taxes_and_fees).length).toEqual(1);

  expect(combinedData).toEqual([
    { id: 1, maxCompetitor: undefined, name: 'FooBar Hotel', price: 164 },
    {
      id: 2,
      competitors: { Expedia: 163, Traveloka: 190 },
      maxCompetitor: 219.52,
      name: 'BarFoo Hotel',
      price: 164,
      taxes_and_fees: { hotel_fees: 16.4, tax: 13.12 }
    }
  ]);
});

it('sorts hotels by descending price', () => {
  const hotels = [
    {
      id: 1,
      name: 'FooBar Hotel'
    },
    {
      id: 2,
      name: 'BarFoo Hotel'
    }
  ];

  const pricing = [
    {
      id: 1,
      price: 162
    },
    {
      id: 2,
      price: 164,
      competitors: {
        Traveloka: 190,
        Expedia: 163
      }
    }
  ];

  const combinedData = matchingHotelsWithPrices(hotels, pricing);

  expect(_.map(sortHotels(combinedData), el => el.price)).toEqual([164, 162]);
});

it('sorts hotels by descending stars if same pricing', () => {
  const hotels = [
    {
      id: 1,
      name: 'First Hotel',
      stars: 4
    },
    {
      id: 2,
      name: 'Second Hotel',
      stars: 5
    }
  ];

  const pricing = [
    {
      id: 1,
      price: 162
    },
    {
      id: 2,
      price: 162,
      competitors: {
        Traveloka: 190,
        Expedia: 163
      }
    }
  ];

  const combinedData = matchingHotelsWithPrices(hotels, pricing);

  expect(_.map(sortHotels(combinedData), el => el.name)).toEqual([
    'Second Hotel',
    'First Hotel'
  ]);
});

it('sorts hotels by descending rating if same stars, pricing', () => {
  const hotels = [
    {
      id: 1,
      name: 'First Hotel',
      stars: 4,
      rating: 9.5
    },
    {
      id: 2,
      name: 'Second Hotel',
      stars: 4,
      rating: 9.9
    }
  ];

  const pricing = [
    {
      id: 1,
      price: 162
    },
    {
      id: 2,
      price: 162,
      competitors: {
        Traveloka: 190,
        Expedia: 163
      }
    }
  ];

  const combinedData = matchingHotelsWithPrices(hotels, pricing);

  expect(_.map(sortHotels(combinedData), el => el.name)).toEqual([
    'Second Hotel',
    'First Hotel'
  ]);
});

it('sorts price in a hotel without tax by ascending', () => {
  const hotels = [
    {
      id: 1,
      name: 'FooBar Hotel'
    },
    {
      id: 2,
      name: 'BarFoo Hotel'
    }
  ];

  const pricing = [
    {
      id: 1,
      price: 164
    },
    {
      id: 2,
      price: 164,
      competitors: {
        Traveloka: 190,
        Expedia: 163
      }
    }
  ];

  const priceHotel = _.find(
    matchingHotelsWithPrices(hotels, pricing),
    el => el.id === 2
  );

  expect(sortPricing(priceHotel)).toEqual({
    Expedia: 163,
    Hotel: 164,
    Traveloka: 190
  });
});

it('returns price with tax', () => {
  const hotels = [
    {
      id: 1,
      name: 'FooBar Hotel'
    },
    {
      id: 2,
      name: 'BarFoo Hotel'
    }
  ];

  const pricing = [
    {
      id: 1,
      price: 164
    },
    {
      id: 2,
      price: 164,
      competitors: {
        Traveloka: 190,
        Expedia: 163
      },
      taxes_and_fees: {
        tax: 13.12,
        hotel_fees: 16.4
      }
    }
  ];

  const priceHotel = _.find(
    matchingHotelsWithPrices(hotels, pricing),
    el => el.id === 2
  );

  expect(
    taxInclusive(sortPricing(priceHotel), priceHotel.taxes_and_fees)
  ).toEqual({
    Expedia: 192.52,
    Hotel: 193.52,
    Traveloka: 219.52
  });
});
