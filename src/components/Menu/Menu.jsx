import React, {useRef} from 'react';
import "./Menu.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Menu = () => {
  const navRef = useRef(null);

  const clickBurger = () => {
    if (navRef.current.className === "nav-container") {
      navRef.current.className += " responsive";
    } else {
      navRef.current.className = "nav-container";
    }
  }
  return (
    <div className="nav-container" ref={navRef}>
      <a href="/" className="menu-item first-item">HOME</a>
      <a href="https://docs.spectrocloud.com/" className="menu-item overflow-item">DOCS</a>
      <a href="https://www.spectrocloud.com/" className="menu-item overflow-item">PRODUCT</a>
      <a href="https://docs.spectrocloud.com/api/introduction" className="menu-item overflow-item">API</a>
      <div className="nav-burger-icon menu-item" onClick={clickBurger}>
        <FontAwesomeIcon icon={faBars} />
      </div>
    </div>
  );
};

export default Menu;