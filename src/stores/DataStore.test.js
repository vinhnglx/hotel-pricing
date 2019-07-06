import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import DataGateway from '../gateways/DataGateway';
import DataStore from './DataStore';
import { HOTELS_DATA_URL, PRICE_DATA_URL } from '../utilities/helper';

it('returns a hotels list', async () => {
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
  const dataStore = DataStore(dataGateway);

  const response = await dataStore.fetchHotels(HOTELS_DATA_URL);
  expect(response.length).toBe(2);
});

it("returns an empty hotels list if can't call the API", async () => {
  const mock = new MockAdapter(axios);
  mock.onGet(HOTELS_DATA_URL).replyOnce(500);

  const dataGateway = DataGateway();
  const dataStore = DataStore(dataGateway);

  const response = await dataStore.fetchHotels(HOTELS_DATA_URL);

  expect(response).toEqual([]);
});

it('returns a pricing list', async () => {
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
  const dataStore = DataStore(dataGateway);

  const response = await dataStore.fetchPrices(PRICE_DATA_URL, 'usd');
  expect(response.length).toBe(1);
});

it('returns an empty list for unsupported currency', async () => {
  const mock = new MockAdapter(axios);

  mock.onGet(`${PRICE_DATA_URL}/VND`).replyOnce(500);
  const dataGateway = DataGateway();
  const dataStore = DataStore(dataGateway);

  const response = await dataStore.fetchPrices(PRICE_DATA_URL, 'vnd');
  expect(response).toEqual([]);
});
