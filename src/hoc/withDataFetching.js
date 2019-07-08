import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import map from 'lodash/map';
import {
  currenciesList,
  filterPricesWithHotelIds,
  matchingHotelsWithPrices,
  sortHotels,
  HOTELS_DATA_URL,
  PRICE_DATA_URL
} from '../utilities/helper';
import DataGateway from '../gateways/DataGateway';
import DataStore from '../stores/DataStore';

const dataGateway = DataGateway();
const dataStore = DataStore(dataGateway);
const currencyStorage = localStorage.getItem('currency');

const withDataFetching = Component => props => {
  const { currency = currencyStorage } = props;
  const [hotels, setHotels] = useState([]);
  const [prices, setPrices] = useState([]);
  const [store, setStore] = useState({ loading: true, data: [] });

  // Get Hotels
  useEffect(() => {
    dataStore
      .fetchHotels(HOTELS_DATA_URL)
      .then(response => setHotels(response));
  }, [currency]);

  // Get Prices
  useEffect(() => {
    dataStore
      .fetchPrices(PRICE_DATA_URL, currenciesList[`${currency}`])
      .then(response => setPrices(response));
  }, [currency]);

  // Matching Hotels & Prices
  useEffect(() => {
    if (hotels.length > 0 && prices.length > 0) {
      const hotelIds = map(hotels, 'id');
      const combinedData = matchingHotelsWithPrices(
        hotels,
        filterPricesWithHotelIds(prices, hotelIds)
      );

      setStore({
        loading: false,
        data: sortHotels(combinedData)
      });
    }
  }, [hotels, prices]);

  if (store.loading === true) {
    return <Spin size="large" />;
  }
  return <Component {...props} store={store} />;
};

export default withDataFetching;
