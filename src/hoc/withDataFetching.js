import React from 'react';
import { Spin } from 'antd';
import useApi from '../api/useApi';

const withDataFetching = Component => props => {
  const currencyStorage = localStorage.getItem('currency');
  const { currency = currencyStorage } = props;
  const [isLoading, store] = useApi(currency);

  if (isLoading === true) {
    return <Spin size="large" />;
  }
  return <Component {...props} store={store} />;
};

export default withDataFetching;
