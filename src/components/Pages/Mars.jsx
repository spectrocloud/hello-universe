import React from 'react';
import Title from './Elements/Title';

const Mars = () => {
    return (
      <div className="Header-items">
      <Title title = {`Mars`} 
        subtitle={
        `With a radius of 2,106 miles (3,390 kilometers), Mars is about half the size of Earth.  If Earth were the size of a nickel, Mars would be about as big as a raspberry.`  
        }/>
    </div>
    );
  };
  
  export default Mars;