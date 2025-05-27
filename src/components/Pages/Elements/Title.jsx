import React from "react";
import "./Elements.css";

function Title({ title, subtitle }) {
  return (
    <div className="title-container">
      <div className="title">{title}</div>
      <div className="subtitle">{subtitle}</div>
    </div>
  );
}

export default Title;
