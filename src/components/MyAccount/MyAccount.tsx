import { AppstoreOutlined, CreditCardOutlined, PlayCircleOutlined, MailOutlined, SettingOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import React from 'react';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: 'group'): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('My Account', 'grp', null, [getItem('Profile Information', '13')], 'group'),

  getItem('My Movies', 'sub1', <VideoCameraOutlined />, [
    getItem('Watchlist', 'sub5', null, [getItem('Watchlist 1', '1'), getItem('Watchlist 2', '2')]),
    getItem('Favorites', 'sub6', null, [getItem('Recently Added', '3')]),
  ]),

  getItem('Subscription Details', 'sub2', <CreditCardOutlined />, [
    getItem('View Subscription Plan', '5'),
    getItem('Update Payment Method', '6'),
    // getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),

  { type: 'divider' },

  // getItem('Navigation Three', 'sub4', <SettingOutlined />, [
  //   getItem('Option 9', '9'),
  //   getItem('Option 10', '10'),
  //   getItem('Option 11', '11'),
  //   getItem('Option 12', '12'),
  // ]),


];

const MyAccount: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return <Menu onClick={onClick} style={{ width: 256 }} defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" items={items} />;
};

export default MyAccount;
