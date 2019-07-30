import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import HotelNameComponent from '../../../components/HotelNameComponent';

afterEach(cleanup);

describe('HotelNameComponent', () => {
  it('should contains link to hotel detail', () => {
    const { getByTestId } = render(<HotelNameComponent hotelId="1" />);
    expect(getByTestId('hotel-detail')).toHaveAttribute('href', '/hotels/1');
  });

  it('should contains a hotel name', () => {
    const { getByText } = render(
      <HotelNameComponent hotelId="1" hotelName="Marina Bay Sand" />
    );
    expect(getByText('Marina Bay Sand')).toBeDefined();
  });

  it('should show a Tax-Inclusive if taxInclusive exists', () => {
    const { getByTestId } = render(
      <HotelNameComponent
        hotelId="1"
        hotelName="Marina Bay Sand"
        taxInclusive
      />
    );

    expect(getByTestId('tooltip')).toBeDefined();
  });
});
