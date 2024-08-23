import React from "react";
import {
    Routes,
    Route,
  } from "react-router-dom";
import Home from "./Pages/Home";
import Mars from "./Pages/Mars";
import Moon from "./Pages/Moon";
import Stats from "./Pages/Stats";

const AppRoutes = () => {
    return(
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/mars" element={<Mars />} />
        <Route path="/moon" element={<Moon />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    );
}

export default AppRoutes;