import React, { useEffect, useState } from 'react';
import Title from './Elements/Title';
import TemperatureMars from '../Data/TemperatureMars'
import LineChart from './Elements/LineChart';
import { IncrementVisitorCount } from '../../utilities/counters';

const facts = [
  'Mars is about half the size of Earth. If Earth were the size of a nickel, Mars would be about as big as a raspberry.', 
  'NASA missions have found evidence that Mars was much wetter and warmer, with a thicker atmosphere, billions of years ago.', 
  'Mars\' signature colour comes from the large amount of iron oxide, or rust as you might know it, in its rocks and soil.', 
  'Mars is home to the highest mountain in our solar system, a volcano called Olympus Mons. It\'s about three times the height of Mount Everest!', 
  'A year on Mars lasts 687 Earth days! This is because Mars take a lot longer than Earth to complete its orbit around the Sun.',
  'Mars is one of the most explored planets in our solar system, and it\'s the only planet where we\'ve sent rovers to roam the alien landscape.', 
  'Similarly to Earth, Mars has four distinct seasons. However, each season lasts about twice as long because the Martian year is almost twice that of Earth.',
];

const INTERVAL_LENGTH = 5000;

function Mars() {
  
  const [factIndex, setFactIndex] = useState(0);
  const [data, setData] = useState(null);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    IncrementVisitorCount("Mars");
    const [data, options] = TemperatureMars();
    setData(data);
    setOptions(options);
    let intervalId = setInterval(() => {
      let currentIdx = factIndex;
      setFactIndex(currentIdx + 1);
    }, INTERVAL_LENGTH);
    return(() => {
      clearInterval(intervalId)
    })
  }, [factIndex]);

  let fact = facts[factIndex % facts.length];
  
  // data not loaded yet
  if (data == null || options == null) {
    return (
      <div className="Header-items">
        <Title title = {`Mars`} 
          subtitle={fact}/>
      </div>
    );
  }

  return (
    <div className="Header-items">
      <Title title = {`Mars`} 
        subtitle={fact}/>
      <LineChart data={data} options={options}/>
    </div>
  );
}
  
  export default Mars;