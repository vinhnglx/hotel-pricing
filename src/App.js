import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import withMainLayout from './layout/withMainLayout';
import HotelListContainer from './containers/HotelListContainer';
import HotelDetailContainer from './containers/HotelDetailContainer';
import './assets/App.css';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route
            path="/hotels/:id"
            component={withMainLayout(HotelDetailContainer)}
          />
          <Route
            default
            path="/"
            component={withMainLayout(HotelListContainer)}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
