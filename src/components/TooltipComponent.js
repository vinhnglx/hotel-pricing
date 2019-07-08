import React from 'react';
import { Tooltip, Icon } from 'antd';

const TooltipComponent = props => {
  const { title, iconType } = props;
  return (
    <span className="tooltip">
      <Tooltip placement="right" title={title}>
        <Icon type={iconType} />
      </Tooltip>
    </span>
  );
};

export default TooltipComponent;
