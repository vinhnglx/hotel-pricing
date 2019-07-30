import { useState, useEffect } from 'react';
import map from 'lodash/map';
import { listHotels } from './hotels';
import { listPrices } from './prices';
import {
  currenciesList,
  filterPricesWithHotelIds,
  matchingHotelsWithPrices,
  sortHotels
} from '../utilities/helper';

const useApi = currency => {
  const [hotels, setHotels] = useState([]);
  const [prices, setPrices] = useState([]);
  const [store, setStore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    listHotels().then(({ data }) => {
      setHotels(data);
    });

    const currencyCode = currenciesList[`${currency}`].toUpperCase();

    listPrices(currencyCode).then(({ data }) => {
      setPrices(data);
    });
  }, [currency]);

  useEffect(() => {
    if (hotels.length > 0 && prices.length > 0) {
      const hotelIds = map(hotels, 'id');
      const combinedData = matchingHotelsWithPrices(
        hotels,
        filterPricesWithHotelIds(prices, hotelIds)
      );

      setIsLoading(false);

      setStore(sortHotels(combinedData));
    }
  }, [hotels, prices]);

  return [isLoading, store];
};

export default useApi;
