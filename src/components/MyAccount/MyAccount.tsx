import { Menu, MenuProps } from 'antd';
import { VideoCameraOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ProfileInformation from '../ProfileInformation/ProfileInformation';
import Ratings from '../Ratings/Ratings';
import React, { useEffect, useState } from 'react';
import Watchlist from '../WatchList/WatchList';

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
  getItem('My Account', 'grp', null, [getItem('Profile Information', '/my-account/profile-information')], 'group'),

  getItem('My Movies', 'sub1', <VideoCameraOutlined />, [getItem('My Watchlist', 'watchlist', null), getItem('My Ratings', 'ratings', null)]),

  { type: 'divider' },
];

const MyAccount = () => {
  const [activeComponent, setActiveComponent] = useState('profile');

  // Handle menu click
  const onClick: MenuProps['onClick'] = (e) => {
    setActiveComponent(e.key);
  };

  // Render the component based on activeComponent state
  let contentComponent;
  switch (activeComponent) {
    case 'profile':
      contentComponent = <ProfileInformation />;
      break;
    case 'watchlist':
      contentComponent = <Watchlist />;
      break;
    case 'ratings':
      contentComponent = <Ratings />;
      break;
    // ... other cases
    default:
      contentComponent = <ProfileInformation />;
  }

  return (
    <div style={{ display: 'flex' }}>
      <Menu onClick={onClick} style={{ width: 256 }} mode="inline" items={items} />
      <div className="content-area" style={{ flexGrow: 1, padding: '20px' }}>
        {contentComponent}
      </div>
    </div>
  );
};

export default MyAccount;
