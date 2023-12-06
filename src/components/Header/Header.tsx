import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../models/user";
import { Menu, Input, Badge, Button, Drawer } from "antd";
import type { MenuProps } from "antd";
import { MenuOutlined, SearchOutlined, BellOutlined } from "@ant-design/icons";
import "./Header.scss";
import logo from "../../assets/images/loggo.jpg";

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

  const menuItems: MenuProps["items"] = props.userInfo
    ? [
        { key: "/", label: "Home" },
        {
          key: "SubMenu",
          label: "Genre",
          children: [
            {
              type: "group",
              label: "Item 1",
              children: [
                {
                  label: "Option 1",
                  key: "setting:1",
                },
                {
                  label: "Option 2",
                  key: "setting:2",
                },
              ],
            },
            {
              type: "group",
              label: "Item 2",
              children: [
                {
                  label: "Option 3",
                  key: "setting:3",
                },
                {
                  label: "Option 4",
                  key: "setting:4",
                },
              ],
            },
          ],
        },
        { key: "/movies", label: "Movies" },
        { key: "/tv-shows", label: "TV Shows" },
        { key: "/support", label: "Support" },
        { key: "/subscriptions", label: "Subscriptions" },
        // { key: "5", label: "Log in/Register", path: "/login-register" },
      ]
    : [
        { key: "/", label: "Home" },
        { key: "/genre", label: "Genre" },
        { key: "/movies", label: "Movies" },
        { key: " /tv-shows", label: "TV Shows" },
        { key: "/support", label: "Support" },
        { key: "/subscriptions", label: "Subscriptions" },
        { key: "/login-register", label: "Log in/Register" },
      ];

  const onSearch = (value: string) => {
    console.log("Search:", value);
    // Implement search functionality here
  };

  const toggleSearch = () => setSearchActive(!searchActive);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const handleMenuClick = (e: any) => {
    const menuItem = menuItems.find((item: any) => item.key === e.key);
    if (menuItem) {
      //navigate(menuItem.key!);
    }
  };

  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <img src={logo} alt="Cinema Evolution" />
      </Link>

      <Button className="header-drawer-button" onClick={toggleDrawer}>
        <MenuOutlined />
      </Button>

      <Drawer
        title="Menu"
        placement="right"
        closable={true}
        onClose={toggleDrawer}
        open={drawerVisible}
      >
        {props.userInfo && (
          <Menu
            theme="dark"
            mode="vertical"
            defaultSelectedKeys={["/"]}
            onClick={handleMenuClick}
          >
            {menuItems.map((item) => ( <></>
             // <Menu.Item key={item.key}>{item.label}</Menu.Item>
            ))}
          </Menu>
        )}
      </Drawer>

      {props.userInfo ? (
        <nav>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["/"]}
            onClick={handleMenuClick}
            className="header-menu"
          >
            {menuItems.map((item) => (<></>
             // <Menu.Item key={item.key}>{item.label}</Menu.Item>
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
            <SearchOutlined
              onClick={toggleSearch}
              className="icon search-icon"
            />
            <Badge count={notificationCount}>
              <BellOutlined className="icon notification-icon" />
            </Badge>
          </div>
        </nav>
      ) : (
        <>
          <nav>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["/"]}
              onClick={handleMenuClick}
              className="header-menu"
            >
              {menuItems.map((item) => (<></>
             //   <Menu.Item key={item.key}>{item.label}</Menu.Item>
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
              <SearchOutlined
                onClick={toggleSearch}
                className="icon search-icon"
              />
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
