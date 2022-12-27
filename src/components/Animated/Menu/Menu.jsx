import React from 'react';
import "./Menu.css";

const Menu = () => {
  return (
    <nav>
      <ul>
        <li>
          <a href="https://docs.spectrocloud.com/" className="menu-item">DOCS</a>
        </li>
        <li>
          <a href="https://www.spectrocloud.com/" className="menu-item">PRODUCT</a>
        </li>
        <li>
          <a href="https://docs.spectrocloud.com/api/introduction" className="menu-item">API</a>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;