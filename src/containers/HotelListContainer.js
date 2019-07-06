import React from 'react';
import { List, Card, Row, Col, Rate, Badge } from 'antd';
import withDataFetching from '../hoc/withDataFetching';
// import DataFetching from '../gateways/DataFetching';

const listData = [];
for (let i = 0; i < 10; i++) {
  listData.push({
    href: `/hotels/${i}`,
    title: `Shinagawa Prince Hotel ${i}`,
    thumbnail: 'https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg',
    stars: 4,
    rating: 9.1,
    address:
      '107-6245 Tokyo Prefecture, Minato-ku, Akasaka 9-7-1 Tokyo Midtown, Japan'
  });
}

const HotelListContainer = props => {
  const {
    store: { data }
  } = props;

  console.log('data');
  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={data}
      renderItem={item => (
        <List.Item
          key={item.id}
          actions={[
            <Badge count={item.rating} />,
            <span>Location: {item.address}</span>
          ]}
          extra={<img width={272} alt="logo" src={item.photo} />}
        >
          <List.Item.Meta
            title={
              <a href={`/hotels/${item.id}`}>
                <p className="mb-0">{item.name}</p>
                <Rate disabled defaultValue={item.stars} />
              </a>
            }
          />
          <Row gutter={16}>
            <Col span={4}>
              <Card size="small" title="Booking.com" bordered={false}>
                S$ 100
              </Card>
            </Col>
            <Col span={4}>
              <Card size="small" title="Hotels.com" bordered={false}>
                S$ 100
              </Card>
            </Col>
            <Col span={4}>
              <Card size="small" title="Expedia" bordered={false}>
                S$ 100
              </Card>
            </Col>
            <Col span={4}>
              <Card size="small" title="Getaroom" bordered={false}>
                S$ 100
              </Card>
            </Col>
            <Col span={4}>
              <Card size="small" title="AMOMA" bordered={false}>
                S$ 100
              </Card>
            </Col>
            <Col span={4}>
              <Card size="small" title="Prestigia" bordered={false}>
                S$ 100
              </Card>
            </Col>
          </Row>
        </List.Item>
      )}
    />
  );
};

export default withDataFetching(HotelListContainer);
// export default enhance(HotelListContainer);
