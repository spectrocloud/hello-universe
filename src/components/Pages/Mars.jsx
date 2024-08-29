import React, { useEffect, useState } from 'react';
import Title from './Elements/Title';
import TemperatureMars from '../Data/TemperatureMars'
import LineChart from './Elements/LineChart';
import { IncrementVisitorCount } from '../../utilities/counters';
import DisplayPicture from './Elements/DisplayPicture';
import Mars1 from "../../img/mars/mars-1.webp";
import Mars2 from "../../img/mars/mars-2.webp";
import Mars3 from "../../img/mars/mars-3.webp";
import Mars4 from "../../img/mars/mars-4.webp";
import Mars5 from "../../img/mars/mars-5.webp";

const facts = [
  'Mars is about half the size of Earth. If Earth were the size of a nickel, Mars would be about as big as a raspberry.', 
  'NASA missions have found evidence that Mars was much wetter and warmer, with a thicker atmosphere, billions of years ago.', 
  'Mars\' signature colour comes from the large amount of iron oxide, or rust as you might know it, in its rocks and soil.', 
  'Mars is home to the highest mountain in our solar system, a volcano called Olympus Mons. It\'s about three times the height of Mount Everest!', 
  'A year on Mars lasts 687 Earth days! This is because Mars take a lot longer than Earth to complete its orbit around the Sun.',
  'Mars is one of the most explored planets in our solar system, and it\'s the only planet where we\'ve sent rovers to roam the alien landscape.', 
  'Similarly to Earth, Mars has four distinct seasons. However, each season lasts about twice as long because the Martian year is almost twice that of Earth.',
];

const images = [Mars1, Mars2, Mars3, Mars4, Mars5];
const INTERVAL_LENGTH = 5000;

function Mars({apiConnection}) {
  const [factIndex, setFactIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [data, setData] = useState(null);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    const incrementVisitor = async () => {
      await IncrementVisitorCount({apiConnection: apiConnection, page: "Mars"});
    }
    incrementVisitor();
    const [data, options] = TemperatureMars();
    setData(data);
    setOptions(options);
    let factIntervalId = setInterval(() => {
      let currentIdx = factIndex;
      setFactIndex(currentIdx + 1);
    }, INTERVAL_LENGTH);
    let imageIntervalId = setInterval(() => {
      let currentIdx = imageIndex;
      setImageIndex(currentIdx + 1);
    }, INTERVAL_LENGTH);
    return(() => {
      clearInterval(factIntervalId);
      clearInterval(imageIntervalId);
    })
  }, [apiConnection, factIndex, imageIndex]);

  let fact = facts[factIndex % facts.length];
  let image = images[imageIndex % images.length];

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
      <DisplayPicture title="The Wonder of Mars 📸 " image={image} credit={"science.nasa.gov/mars"}/>
    </div>
  );
}
  
  export default Mars;