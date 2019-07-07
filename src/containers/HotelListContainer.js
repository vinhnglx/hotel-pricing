import React from 'react';
import { List, Card, Row, Col, Rate, Badge, Tooltip, Icon } from 'antd';
import take from 'lodash/take';
import withDataFetching from '../hoc/withDataFetching';
import {
  sortPricing,
  taxInclusive,
  MAX_PRICING_ITEM
} from '../utilities/helper';

const HotelListContainer = props => {
  const {
    store: { data },
    currency
  } = props;

  console.log('data', data);

  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={data}
      renderItem={item => {
        let sortedPricing;

        if (item.taxes_and_fees) {
          sortedPricing = taxInclusive(sortPricing(item), item.taxes_and_fees);
        } else {
          sortedPricing = sortPricing(item);
        }
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
                <a href={`/hotels/${item.id}`}>
                  <p className="mb-0">
                    {item.name}
                    {item.taxes_and_fees && (
                      <span className="tooltip">
                        <Tooltip placement="right" title="Tax-Inclusive">
                          <Icon type="question-circle-o" />
                        </Tooltip>
                      </span>
                    )}
                  </p>

                  <Rate disabled defaultValue={item.stars} />
                </a>
              }
            />
            <Row gutter={16}>
              {take(Object.keys(sortedPricing), MAX_PRICING_ITEM).map(key => {
                const hotelPrice = sortedPricing[key];
                const maxPrice = item.maxCompetitor;

                return (
                  <Col span={4} key={key}>
                    <Card
                      size="small"
                      title={key}
                      bordered={false}
                      className="ps-r"
                    >
                      {(hotelPrice && `${currency}${hotelPrice}`) ||
                        'Rate Unavailable'}
                      {maxPrice && key === 'Hotel' && hotelPrice < maxPrice && (
                        <span className="tooltip">
                          <Tooltip
                            placement="right"
                            title={`Saving ${100 -
                              (hotelPrice / maxPrice) * 100}%`}
                          >
                            <Icon type="question-circle-o" />
                          </Tooltip>
                        </span>
                      )}
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </List.Item>
        );
      }}
    />
  );
};

export default withDataFetching(HotelListContainer);
