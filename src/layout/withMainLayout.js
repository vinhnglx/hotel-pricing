import React, { useState } from 'react';
import { Layout, Menu } from 'antd';

const { Header, Content } = Layout;
const { SubMenu } = Menu;

const withMainLayout = Component => props => {
  const enhance = WrappedComponent => newProps => {
    const [currency, setCurrency] = useState('$');

    const handleCurrencySelect = currencySym => {
      return setCurrency(currencySym);
    };

    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            onClick={e => handleCurrencySelect(e.key)}
            theme="dark"
            mode="horizontal"
            className="fl-r nav-menu"
            defaultSelectedKeys={[currency]}
          >
            <SubMenu
              title={<span className="submenu-title-wrapper">{currency}</span>}
            >
              <Menu.Item key="$">$ U.S. Dollars</Menu.Item>
              <Menu.Item key="S$">S$ Singapore Dollars</Menu.Item>
              <Menu.Item key="CN¥">CN¥ Chinese yuan</Menu.Item>
              <Menu.Item key="₩">₩ South Korean won</Menu.Item>
            </SubMenu>
            <Menu.Item key="/register">Register / Sign In</Menu.Item>
          </Menu>
        </Header>
        <Content className="pd-l-50 pd-r-50">
          <div className="layout-content">
            <WrappedComponent {...newProps} />
          </div>
        </Content>
      </Layout>
    );
  };

  const WrappedComponent = enhance(Component);

  return <WrappedComponent {...props} />;
};

export default withMainLayout;
