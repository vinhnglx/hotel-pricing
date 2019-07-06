import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import DataGateway from './DataGateway';
import { HOTELS_DATA_URL, PRICE_DATA_URL } from '../utilities/helper';

it('returns a hotels list with the correct hotel url', async () => {
  const mock = new MockAdapter(axios);

  mock.onGet(HOTELS_DATA_URL).reply(200, [
    {
      id: 1,
      name: 'FooBar Hotel',
      rating: 7.7,
      stars: 4,
      address: 'Singapore',
      photo: 'https://foo.bar/example.jpg',
      description: '<p>Hello World.</p>'
    },
    {
      id: 2,
      name: 'BarFoo Hotel',
      rating: 5.7,
      stars: 3,
      address: 'Singapore',
      photo: 'https://bar.foo/example.jpg',
      description: '<p>Hi World.</p>'
    }
  ]);

  const dataGateway = DataGateway();
  const response = await dataGateway.getHotels(HOTELS_DATA_URL);
  expect(response.data.length).toBe(2);
});

it('returns a pricing list from a currency', async () => {
  const mock = new MockAdapter(axios);

  mock.onGet(`${PRICE_DATA_URL}/USD`).reply(200, [
    {
      id: 1,
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
  ]);

  const dataGateway = DataGateway();
  const response = await dataGateway.getPrices(PRICE_DATA_URL, 'usd');
  expect(response.data.length).toBe(1);
});
