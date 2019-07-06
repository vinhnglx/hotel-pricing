import React from 'react';
import DOMPurify from 'dompurify';
import { Descriptions, Carousel } from 'antd';

const HotelDetailContainer = props => {
  return (
    <div>
      <Descriptions title="Shinagawa Prince Hotel">
        <Descriptions.Item label="Stars">4</Descriptions.Item>
        <Descriptions.Item label="Rating">7.7</Descriptions.Item>
        <Descriptions.Item label="Address">
          108-8611 Tokyo Prefecture, Minato-ku, Takanawa 4-10-30, Japan
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize('<b>Hello</b>')
            }}
          />
        </Descriptions.Item>
      </Descriptions>
      <Carousel autoplay>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Carousel>
    </div>
  );
};

export default HotelDetailContainer;
