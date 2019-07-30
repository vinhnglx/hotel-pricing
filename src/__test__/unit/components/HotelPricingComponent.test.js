import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import HotelPricingComponent from '../../../components/HotelPricingComponent';

afterEach(cleanup);

const sortedPricing = {
  JinJiang: 900.9,
  Shangrila: 990.9,
  RosewoodGroup: 1000,
  Hotel: 1066.83
};

const sortedPricingNotHighlight = {
  Hotel: 1066.83
};

const sortedPricingHighlight = {
  Hotel: 653.87,
  Prestigia: 800
};

describe('HotelPricingComponent', () => {
  it('should return list of hotel and competitor prices', () => {
    const { getByText } = render(
      <HotelPricingComponent sortedPricing={sortedPricing} currency="$" />
    );
    expect(getByText('Hotel')).toBeDefined();
    expect(getByText('$1,067')).toBeDefined();
    expect(getByText('JinJiang')).toBeDefined();
    expect(getByText('$901')).toBeDefined();
    expect(getByText('Shangrila')).toBeDefined();
    expect(getByText('$991')).toBeDefined();
    expect(getByText('RosewoodGroup')).toBeDefined();
    expect(getByText('$1,000')).toBeDefined();
  });

  it('will not highlight hotel price if hotel price larger than max competitor price or no competitor price', () => {
    const { getByTestId } = render(
      <HotelPricingComponent
        sortedPricing={sortedPricingNotHighlight}
        currency="$"
      />
    );

    expect(getByTestId('card-price')).toHaveAttribute(
      'class',
      'ant-card ps-r ant-card-small'
    );
  });

  it('should highlight hotel price when comparing with max competitor price if hotel price smaller than max competitor price', () => {
    const maxCompetitorPrice = Math.max(
      ...Object.values(sortedPricingHighlight)
    );
    const { getAllByTestId } = render(
      <HotelPricingComponent
        sortedPricing={sortedPricingHighlight}
        currency="$"
        maxPrice={maxCompetitorPrice}
      />
    );

    expect(
      getAllByTestId('card-price')[0].classList.contains('highlight')
    ).toBeTruthy();
    expect(getAllByTestId('card-price').length).toEqual(2);
  });

  it('should returns tooltip with saving message if max price exist and hotel price smaller than competitor price', () => {
    const maxCompetitorPrice = Math.max(
      ...Object.values(sortedPricingHighlight)
    );
    const { getByTestId } = render(
      <HotelPricingComponent
        sortedPricing={sortedPricingHighlight}
        currency="$"
        maxPrice={maxCompetitorPrice}
      />
    );

    expect(getByTestId('tooltip')).toBeDefined();
  });
});
