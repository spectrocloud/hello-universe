import React from 'react';
import "./Elements.css";

const PlanetSelection = () => {
  return (
    <div className="selection-container">
      <div className="selection-text">Pick a space destination you want to learn about. 👇 </div>
      <div className="selection-all-button-container">
        <div className="selection-button-container">
          <a className="selection-button" href="/moon">Earth's Moon</a>
        </div>
        <div className="selection-button-container">
          <a className="selection-button" href="/mars">Mars</a>
        </div>
      </div>
    </div>
  );
};

export default PlanetSelection;