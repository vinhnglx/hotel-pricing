import Api from './Api';

// eslint-disable-next-line import/prefer-default-export
export const listPrices = currency => {
  return Api().get(`tokyo/1/${currency}`);
};
