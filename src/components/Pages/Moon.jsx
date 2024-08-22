import React from 'react';
import Title from './Elements/Title';

const Moon = () => {
    return (
      <div className="Header-items">
      <Title title = {`Earth's Moon`} 
        subtitle={
        `The Moon was likely formed after a Mars-sized body collided with Earth several billion years ago.Like Earth, the Moon has a day side and a night side, which change as the Moon rotates.`  
        }/>
    </div>
    );
  };
  
  export default Moon;