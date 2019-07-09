import React from 'react';
import { Layout, Menu } from 'antd';
import { DEFAULT_CURRENCY } from '../utilities/helper';

const { Header, Content } = Layout;
const { SubMenu } = Menu;

const withMainLayout = Component => props => {
  const handleCurrencySelect = currencySym => {
    localStorage.setItem('currency', currencySym);
    window.location.reload();
  };

  const currencySelect = localStorage.getItem('currency') || DEFAULT_CURRENCY;

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          onClick={e => handleCurrencySelect(e.key)}
          theme="dark"
          mode="horizontal"
          className="fl-r nav-menu"
          defaultSelectedKeys={[currencySelect]}
        >
          <SubMenu
            title={
              <span className="submenu-title-wrapper">{currencySelect}</span>
            }
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
          <Component {...props} currency={currencySelect} />
        </div>
      </Content>
    </Layout>
  );
};

export default withMainLayout;
