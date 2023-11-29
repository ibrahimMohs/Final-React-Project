import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {User} from '../../models/user';
import { Menu, Input, Badge, Button, Drawer } from 'antd';
import { MenuOutlined, SearchOutlined, BellOutlined } from '@ant-design/icons';
import './Header.scss'; 
import logo from '../../assets/images/icon.jpg'; 

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

  const menuItems: MenuItem[] = [
    { key: '1', label: 'Home', path: '/' },
    { key: '2', label: 'Movies & Shows', path: '/movies-shows' },
    { key: '3', label: 'Support', path: '/support' },
    { key: '4', label: 'Subscriptions', path: '/subscriptions' },
    { key: '5', label: 'Log in/Register', path: '/login-register' },
  ];

  const onSearch = (value: string) => {
    console.log('Search:', value);
    // Implement search functionality here
  };

  const toggleSearch = () => setSearchActive(!searchActive);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const handleMenuClick = (e: any) => {
    const menuItem = menuItems.find(item => item.key === e.key);
    if (menuItem) {
      navigate(menuItem.path);
    }
  };

  return (
    <header className="header">
      <div className="header-logo" onClick={() => navigate('/')}>
        <img src={logo} alt="Cinema Evolution" />
      </div>
  
      <Button className="header-drawer-button" onClick={toggleDrawer}>
        <MenuOutlined />
      </Button>
  
      <Drawer
        title="Menu"
        placement="right"
        closable={true}
        onClose={toggleDrawer}
        visible={drawerVisible}
      >
        {props.userInfo && (
          <Menu
            theme="dark"
            mode="vertical"
            defaultSelectedKeys={['1']}
            onClick={handleMenuClick}
          >
            {menuItems.map(item => (
              <Menu.Item key={item.key}>{item.label}</Menu.Item>
            ))}
          </Menu>
        )}
      </Drawer>
  
      {props.userInfo ? (
        <nav>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} onClick={handleMenuClick} className="header-menu">
            {menuItems.map(item => (
              <Menu.Item key={item.key}>{item.label}</Menu.Item>
            ))}
          </Menu>
  
          <div className="header-tools">
            {searchActive && (
              <Input
                placeholder="Search"
                onPressEnter={(e) => onSearch(e.currentTarget.value)}
                onBlur={() => setSearchActive(false)}
                autoFocus
              />
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
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} onClick={handleMenuClick} className="header-menu">
            {menuItems.map(item => (
              <Menu.Item key={item.key}>{item.label}</Menu.Item>
            ))}
          </Menu>
  
          <div className="header-tools">
            {searchActive && (
              <Input
                placeholder="Search"
                onPressEnter={(e) => onSearch(e.currentTarget.value)}
                onBlur={() => setSearchActive(false)}
                autoFocus
              />
            )}
            <SearchOutlined onClick={toggleSearch} className="icon search-icon" />
            <Badge count={notificationCount}>
              <BellOutlined className="icon notification-icon" />
            </Badge>

          </div>
        </nav>
        </>
      )}
    </header>
  );  
 };
  