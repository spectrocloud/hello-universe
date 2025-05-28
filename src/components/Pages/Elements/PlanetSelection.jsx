import React from "react";
import "./Elements.css";

const PlanetSelection = () => {
  return (
    <div className="selection-container">
      <div className="selection-text">
        Pick a space destination you want to learn about. 👇{" "}
      </div>
      <div className="selection-all-button-container">
        <div className="selection-button-container">
          <a className="selection-button" href="/moon">
            Earth's Moon
          </a>
        </div>
        <div className="selection-button-container">
          <a className="selection-button" href="/mars">
            Mars
          </a>
        </div>
      </div>
      <div className="description-text">
        Curious about how popular our space destinations are? Check out the
        <a className="description-link" href="/stats">
          {" "}
          Spacetastic Site Statistics
        </a>{" "}
        page.
      </div>
    </div>
  );
};

export default PlanetSelection;
