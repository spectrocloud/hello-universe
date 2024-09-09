import React from 'react';
import Title from './Elements/Title';
import PlanetSelection from './Elements/PlanetSelection';

function Home () {
  return (
      <div className="Header-items">
      <Title title = {`Welcome to Spacetastic!`} 
        subtitle={
        `We are on a mission to inspire the next generation of space dreamers by showing them the marvels of space.`  
        }/>
      <PlanetSelection />
      </div>
  );
}
  
export default Home;