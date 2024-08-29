import React from "react";
import {
    Routes,
    Route,
  } from "react-router-dom";
import Home from "./Pages/Home";
import Mars from "./Pages/Mars";
import Moon from "./Pages/Moon";
import Stats from "./Pages/Stats";

function AppRoutes({apiConnection}) {
   return(
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/mars" element={<Mars apiConnection={apiConnection} />} />
        <Route path="/moon" element={<Moon apiConnection={apiConnection} />} />
        <Route path="/stats" element={<Stats apiConnection={apiConnection}/>} />
      </Routes>
    );
}

export default AppRoutes;