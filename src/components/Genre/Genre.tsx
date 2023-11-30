import React, { useEffect } from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import "./Genre.scss";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import {useState} from "react";


const Genre = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown}>Genre</button>
      {isOpen && (
        <ul className="genre-list">
          <li>Action</li>
          <li>Animation</li>
          <li>Crime</li>
          <li>Family</li>
          <li>Horror</li>
          <li>Romance</li>
          <li>Documentary</li>
          <li>Fantasy</li>
          <li>Kids</li>
          <li>News</li>
          <li>War</li>
          <li>History</li>
          <li>Comedy</li>
          <li>Drama</li>
          <li>Reality</li>
          <li>Thriller</li>
          <li>Politics</li>
        </ul>
      )}
    </div>
  );
};
export default Genre;