import React from 'react';
import { Rate } from 'antd';
import TooltipComponent from './TooltipComponent';

const HotelNameComponent = props => {
  const { hotelName, taxInclusive, hotelStars, hotelId } = props;

  return (
    <a data-testid="hotel-detail" href={`/hotels/${hotelId}`}>
      <p className="mb-0">
        {hotelName}
        {taxInclusive && (
          <TooltipComponent
            title="Tax-Inclusive"
            iconType="question-circle-o"
          />
        )}
      </p>

      <Rate disabled defaultValue={hotelStars} />
    </a>
  );
};

export default HotelNameComponent;
