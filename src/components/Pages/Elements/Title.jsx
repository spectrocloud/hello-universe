import React, { useState, useEffect } from 'react';
import "./Elements.css";
import logo from "../../../img/spectronaut.png";

const Image = React.memo(function Image({ src }) {
  return <img src={src} className="title-logo" alt="logo" />;
});

function Title ({title, subtitle}) {
  
  return (
    <div className="title-container">
        <div className="title">{title}
            <div className="title-logo">
              <Image src={logo}/>
            </div>
        </div>
        <div className="subtitle">{subtitle}</div>
    </div>
  );
};

export default Title;