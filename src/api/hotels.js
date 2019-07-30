import Api from './Api';

// eslint-disable-next-line import/prefer-default-export
export const listHotels = () => {
  return Api().get('tokyo');
};
