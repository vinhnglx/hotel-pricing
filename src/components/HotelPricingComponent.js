import React from 'react';
import { Card, Row, Col } from 'antd';
import take from 'lodash/take';
import TooltipComponent from './TooltipComponent';
import {
  MAX_PRICING_ITEM,
  currencyFormatter,
  currenciesList,
  roundedPricing
} from '../utilities/helper';

const roundedPrice = (price, currencyCode) => {
  return roundedPricing(price, currencyCode);
};

const priceDisplay = (price, currencyCode) => {
  return price ? currencyFormatter(price, currencyCode) : 'Rate Unavailable';
};

const HotelPricingComponent = props => {
  const { sortedPricing, maxPrice, currency } = props;

  return (
    <Row gutter={16}>
      {take(Object.keys(sortedPricing), MAX_PRICING_ITEM).map(key => {
        const hotelPrice = sortedPricing[key];
        const currencyCode = currenciesList[`${currency}`];

        const priceFormatted = hotelPrice
          ? roundedPrice(hotelPrice, currencyCode)
          : null;

        const maxPriceFormatted = maxPrice
          ? roundedPrice(maxPrice, currencyCode)
          : null;

        const savingPercentage =
          priceFormatted < maxPriceFormatted
            ? 100 - (priceFormatted / maxPriceFormatted) * 100
            : null;

        const highlightClassName =
          key === 'Hotel' && priceFormatted < maxPriceFormatted
            ? 'highlight ps-r'
            : 'ps-r';

        return (
          <Col span={4} key={key}>
            <Card
              className={highlightClassName}
              size="small"
              title={key}
              bordered={false}
            >
              {priceDisplay(priceFormatted, currencyCode)}
              {key === 'Hotel' && priceFormatted < maxPriceFormatted && (
                <TooltipComponent
                  title={`Saving ${Math.floor(
                    savingPercentage
                  )}% with the highest pricing`}
                  iconType="question-circle-o"
                />
              )}
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default HotelPricingComponent;
