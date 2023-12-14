import './Header.scss';
import { Badge, Button, Drawer, Dropdown, Input, Menu } from 'antd';
import { BellOutlined, DownOutlined, MenuOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../../models/user';
import React, { useState } from 'react';
import logo from '../../assets/images/logo.png';

interface MenuItem {
  key: string;
  label: string;
  path: string;
}

type HeaderProps = {
  userInfo: User | undefined;
};

export const Header = (props: HeaderProps) => {
  const [searchActive, setSearchActive] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();

  const menuItems: MenuItem[] = props.userInfo
    ? [
        { key: '/', label: 'Home', path: '/' },
        { key: '1', label: 'Genre', path: '/genre' },
        { key: '2', label: 'Movies', path: '/movies' },
        { key: '3', label: 'TV Shows', path: '/tv-shows' },
        { key: '4', label: 'Subscriptions', path: '/subscriptions' },
        // { key: "5", label: "Log in/Register", path: "/login-register" },
      ]
    : [
        { key: '/', label: 'Home', path: '/' },
        { key: '1', label: 'Genre', path: '/genre' },
        { key: '2', label: 'Movies', path: '/movies' },
        { key: '3', label: 'TV Shows', path: '/tv-shows' },
        { key: '4', label: 'Subscriptions', path: '/subscriptions' },
        { key: '5', label: 'Log in/Register', path: '/login-register' },
      ];

  const onSearch = (value: string) => {
    if (value.trim()) {
      navigate(`/search?query=${encodeURIComponent(value.trim())}`);
    }
  };

  const toggleSearch = () => setSearchActive(!searchActive);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  // This function should only be declared once
  const handleMenuClick = (e: any) => {
    const menuItem = menuItems.find((item) => item.key === e.key);
    if (menuItem) {
      navigate(menuItem.path);
    } else {
      navigate(`/genre/${e.key}`);
    }
  };

  const genreMenu = (
    <Menu onClick={handleMenuClick}>
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

  // This map should be placed directly where you are going to use it
  const menuItemsComponents = menuItems.map((item) => {
    if (item.label === 'Genre') {
      return (
        <Dropdown overlay={genreMenu} trigger={['click']} key={item.key}>
          <a href="/" className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            Genre <DownOutlined />
          </a>
        </Dropdown>
      );
    }
    return (
      <Menu.Item key={item.key}>
        <Link to={item.path}>{item.label}</Link>
      </Menu.Item>
    );
  });

  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <img src={logo} alt="Cinema Evolution" />
      </Link>

      <Button className="header-drawer-button" onClick={toggleDrawer}>
        <MenuOutlined />
      </Button>

      <Drawer title="Menu" placement="right" closable={true} onClose={toggleDrawer} open={drawerVisible}>
        {props.userInfo && (
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/']} className="header-menu">
            {menuItemsComponents}
          </Menu>
        )}
      </Drawer>

      {props.userInfo ? (
        <nav>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/']} className="header-menu">
            {menuItemsComponents}
          </Menu>

          <div className="header-tools">
            {searchActive && (
              <Input placeholder="Search" onPressEnter={(e) => onSearch(e.currentTarget.value)} onBlur={() => setSearchActive(false)} autoFocus />
            )}
            <SearchOutlined onClick={toggleSearch} className="icon search-icon" />
            <Badge count={notificationCount}>
              <BellOutlined className="icon notification-icon" />
            </Badge>
          </div>
        </nav>
      ) : (
        <>
          <nav>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/']} className="header-menu">
              {menuItemsComponents}
            </Menu>

            <div className="header-tools">
              {searchActive && (
                <Input placeholder="Search" onPressEnter={(e) => onSearch(e.currentTarget.value)} onBlur={() => setSearchActive(false)} autoFocus />
              )}
              <SearchOutlined onClick={toggleSearch} className="icon search-icon" />
            </div>
          </nav>
        </>
      )}
    </header>
  );
};
