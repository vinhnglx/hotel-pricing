import axios from 'axios';

const DataGateway = () => {
  const getHotels = hotelUrl => {
    return axios.get(hotelUrl);
  };

  const getPrices = (priceUrl, currency) => {
    return axios.get(`${priceUrl}/${currency.toUpperCase()}`);
  };

  return Object.freeze({
    getHotels,
    getPrices
  });
};

export default DataGateway;
