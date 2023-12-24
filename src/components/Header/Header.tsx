import './Header.scss';
import { Badge, Button, Drawer, Dropdown, Input, Menu, MenuProps } from 'antd';
import { BellOutlined, DownOutlined, MenuOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../../models/user';
import React, { useState } from 'react';
import logo from '../../assets/images/logo.png';

interface MenuItem {
  key: string;
  label: string;
  children?: MenuItem[];
}

type HeaderProps = {
  userInfo: User | undefined;
};

export const Header = (props: HeaderProps) => {
  const [searchActive, setSearchActive] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    { key: '/', label: 'Home' },
    {
      key: 'SubMenu',
      label: 'Genre',
      children: [
        {
          label: 'Action',
          key: '/genre/Action',
        },
        {
          label: 'Adventure',
          key: '/genre/Adventure',
        },
        {
          label: 'Animation',
          key: '/genre/Animation',
        },
        {
          label: 'Comedy',
          key: '/genre/Comedy',
        },
        {
          label: 'Drama',
          key: '/genre/Drama',
        },
        {
          label: 'Romance',
          key: '/genre/Romance',
        },
        {
          label: 'War',
          key: '/genre/War',
        },
        {
          label: 'Crime',
          key: '/genre/Crime',
        },
        {
          label: 'Documentary',
          key: '/genre/Documentary',
        },
        {
          label: 'Family',
          key: '/genre/Family',
        },
        {
          label: 'History',
          key: '/genre/History',
        },
        {
          label: 'Horror',
          key: '/genre/Horror',
        },
        {
          label: 'Thriller',
          key: '/genre/Thriller',
        },
        {
          label: 'Science Fiction',
          key: '/genre/Science Fiction',
        },
        {
          label: 'Music',
          key: '/genre/Music',
        },
        {
          label: 'Western',
          key: '/genre/Western',
        },
      ],
    },
    { key: '/movies', label: 'Movies' },
    { key: '/tv-shows', label: 'TV Shows' },
    { key: '/subscriptions', label: 'Subscriptions' },
    { key: '/my-account', label: 'My Account' },
  ];

  if (!props.userInfo) {
    menuItems.push({ key: '/login-register', label: 'Log in/Register' });
  }

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  const onSearch = (value: string) => {
    if (value.trim()) {
      navigate(`/search?query=${encodeURIComponent(value.trim())}`);
    }
  };

  const toggleSearch = () => setSearchActive(!searchActive);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const genreMenu = (
    <Menu>
      {/* Use genre names as keys or any other identifier you've set for genres */}
      <Menu.Item key="Action">Action</Menu.Item>
      <Menu.Item key="Adventure">Adventure</Menu.Item>
      <Menu.Item key="Animation">Animation</Menu.Item>
      <Menu.Item key="Comedy">Comedy</Menu.Item>
      <Menu.Item key="Crime">Crime</Menu.Item>
      <Menu.Item key="Documentary">Documentary</Menu.Item>
      <Menu.Item key="Drama">Drama</Menu.Item>
      <Menu.Item key="Family">Family</Menu.Item>
      <Menu.Item key="Fantasy">Fantasy</Menu.Item>
      <Menu.Item key="History">History</Menu.Item>
      <Menu.Item key="Horror">Horror</Menu.Item>
      <Menu.Item key="Music">Music</Menu.Item>
      <Menu.Item key="Mystery">Mystery</Menu.Item>
      <Menu.Item key="Romance">Romance</Menu.Item>
      <Menu.Item key="Science Fiction">Science Fiction</Menu.Item>
      <Menu.Item key="Thriller">Thriller</Menu.Item>
      <Menu.Item key="War">War</Menu.Item>
      <Menu.Item key="Western">Western</Menu.Item>
      {/* Add more genres as needed */}
    </Menu>
  );

  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <img src={logo} alt="Cinema Evolution" />
      </Link>

      <Button className="header-drawer-button" onClick={toggleDrawer}>
        <MenuOutlined />
      </Button>

      <Drawer title="Menu" placement="right" closable={true} onClose={toggleDrawer} open={drawerVisible}>
        <Menu onClick={onClick} theme="dark" mode="vertical" defaultSelectedKeys={['/']} className="header-menu" items={menuItems} />
      </Drawer>

      <nav className="menu-search">
        <Menu theme="dark" onClick={onClick} mode="horizontal" defaultSelectedKeys={['/']} className="header-menu" items={menuItems} />

        <div className="header-tools">
          {searchActive && (
            <Input placeholder="Search" onPressEnter={(e) => onSearch(e.currentTarget.value)} onBlur={() => setSearchActive(false)} autoFocus />
          )}
          <SearchOutlined onClick={toggleSearch} className="icon search-icon" />
        </div>
      </nav>
    </header>
  );
};
