import React from 'react';
import { List, Badge } from 'antd';
import HotelNameComponent from '../components/HotelNameComponent';
import HotelPricingComponent from '../components/HotelPricingComponent';
import withDataFetching from '../hoc/withDataFetching';
import { sortPricing, taxInclusive } from '../utilities/helper';

const HotelListContainer = props => {
  const {
    // store: { data },
    store,
    currency
  } = props;

  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={store}
      renderItem={item => {
        const sortedPricing = item.taxes_and_fees
          ? taxInclusive(sortPricing(item), item.taxes_and_fees)
          : sortPricing(item);
        return (
          <List.Item
            key={item.id}
            actions={[
              <Badge count={item.rating} />,
              <span>Location: {item.address}</span>
            ]}
            extra={<img width={272} alt="logo" src={item.photo} />}
          >
            <List.Item.Meta
              className="ps-r"
              title={
                <HotelNameComponent
                  hotelName={item.name}
                  hotelId={item.id}
                  hotelStars={item.stars}
                  taxInclusive={!!item.taxes_and_fees}
                />
              }
            />
            <HotelPricingComponent
              sortedPricing={sortedPricing}
              maxPrice={item.maxCompetitor}
              currency={currency}
            />
          </List.Item>
        );
      }}
    />
  );
};

export default withDataFetching(HotelListContainer);
