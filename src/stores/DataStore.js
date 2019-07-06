const DataStore = gateway => {
  const setLocalData = response => {
    return response.data;
  };

  const catchError = error => {
    console.log(error.response);
    return [];
  };

  const fetchHotels = hotelUrl => {
    return gateway
      .getHotels(hotelUrl)
      .then(setLocalData)
      .catch(catchError);
  };
  const fetchPrices = (priceUrl, currency) => {
    return gateway
      .getPrices(priceUrl, currency)
      .then(setLocalData)
      .catch(catchError);
  };

  return Object.freeze({
    fetchHotels,
    fetchPrices
  });
};

export default DataStore;
