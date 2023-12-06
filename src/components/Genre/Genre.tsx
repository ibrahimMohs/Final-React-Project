import React, { useEffect } from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import "./Genre.scss";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Link to="/">Action</Link>,
  },
  {
    key: "2",
    label: <Link to="/">Romance</Link>,

    disabled: true,
  },
  {
    key: "3",
    label: <Link to="/">Comedy</Link>,
    disabled: true,
  },
  {
    key: "4",

    label: <Link to="/">War</Link>,
    disabled: true,
  },
];

const Genre: React.FC = () => (
  <Dropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);
export default Genre;
