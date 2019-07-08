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

const withDataFetching = Component => props => {
  const currency = localStorage.getItem('currency') || props.currency;
  const dataGateway = DataGateway();
  const dataStore = DataStore(dataGateway);

  const enhance = WrappedComponent => newProps => {
    const [hotels, setHotels] = useState([]);
    const [prices, setPrices] = useState([]);
    const [store, setStore] = useState({ loading: true, data: [] });

    // Get Hotels
    useEffect(() => {
      dataStore
        .fetchHotels(HOTELS_DATA_URL)
        .then(response => setHotels(response));
    }, []);

    // Get Prices
    useEffect(() => {
      dataStore
        .fetchPrices(PRICE_DATA_URL, currenciesList[`${currency}`])
        .then(response => setPrices(response));
    }, []);

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
    return <WrappedComponent {...newProps} store={store} />;
  };

  const WrappedComponent = enhance(Component);

  return <WrappedComponent {...props} />;
};

export default withDataFetching;
