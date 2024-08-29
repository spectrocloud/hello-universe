import React, { useEffect, useState } from 'react';
import Title from './Elements/Title';
import LineChart from './Elements/LineChart';
import EarthToMoon from "../Data/EarthToMoon";
import { IncrementVisitorCount } from '../../utilities/counters';
import DisplayPicture from './Elements/DisplayPicture';
import Moon1 from "../../img/moon/moon-1.jpg";
import Moon2 from "../../img/moon/moon-2.webp";
import Moon3 from "../../img/moon/moon-3.webp";
import Moon4 from "../../img/moon/moon-4.webp";
import Moon5 from "../../img/moon/moon-5.webp";

const facts = [
  'The Moon was likely formed after a Mars-sized body collided with Earth about 4.5 billion years ago.', 
  'The Moon has a day side and a night side, which change as it rotates. However, we always see the same face from Earth.', 
  'The Moon is Earth\'s only permanent natural satellite. It is also the fifth largest sattelite in the Solar system.', 
  'The Moon is 400 times smaller than the Sun, but also 400 times closer to Earth. This is why the Sun and Moon appear the same size when observed from Earth.',
  'The Moon has moonquakes, which are shorter and weaker than earthquakes. They are caused by the gravitational influence of the Earth.', 
  'There is water on the Moon! It is in the form of ice within dust and minerals on and under its surface.', 
  'The Moon is moving approximately 1.48 inches (3.8 cm) away from Earth every year.',
  'The Moon\'s distance to Earth varies. The Moon is closest at perigee and furthest at apogee.'
];

const images = [Moon1, Moon2, Moon3, Moon4, Moon5];
const INTERVAL_LENGTH = 5000;

function Moon({apiConnection}) {
  const [factIndex, setFactIndex] = useState(0);
  const [hasIncremented, setHasIncremented] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [data, setData] = useState(null);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    const incrementVisitor = async () => {
      if (!hasIncremented) {
        await IncrementVisitorCount({apiConnection: apiConnection, page: "moon"});
        setHasIncremented(true);
      }
    }
    incrementVisitor();    
    const [data, options] = EarthToMoon();
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
  }, [hasIncremented, apiConnection, factIndex, imageIndex])

  let fact = facts[factIndex % facts.length];
  let image = images[imageIndex % images.length];

  // data not loaded yet
  if (data == null || options == null) {
    return (
      <div className="Header-items">
        <Title title = {`Earth's Moon`} 
          subtitle={fact}/>
      </div>
      );
  }

  return (
    <div className="Header-items">
      <Title title = {`Earth's Moon`} 
        subtitle={fact}/>
      <LineChart data={data} options={options}/>
      <DisplayPicture title="Our Stunning Moon 📸 " image={image} credit={"science.nasa.gov/moon"}/>
    </div>
    );
};
  
  export default Moon;