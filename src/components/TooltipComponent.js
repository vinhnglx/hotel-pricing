import React from 'react';
import { Tooltip, Icon } from 'antd';

const TooltipComponent = props => {
  const { title, iconType } = props;
  return (
    <span data-testid="tooltip" className="tooltip">
      <Tooltip placement="right" title={title}>
        <Icon type={iconType} />
      </Tooltip>
    </span>
  );
};

export default TooltipComponent;
