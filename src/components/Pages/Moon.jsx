import React, { Component } from 'react';
import Title from './Elements/Title';
import LineChart from './Elements/LineChart';
import EarthToMoon from "../Data/EarthToMoon";

const facts = [
  'The Moon was likely formed after a Mars-sized body collided with Earth about 4.5 billion years ago.', 
  'The Moon has a day side and a night side, which change as it rotates. However, we always see the same face from Earth.', 
  'The Moon is Earth\'s only permanent natural satellite. It is also the fifth largest sattelite in the Solar system.', 
  'The Moon is 400 times smaller than the Sun, but also 400 times closer to Earth. This is why the Sun and Moon appear the same size when observed from Earth.',
  'The Moon has moonquakes, which are shorter and weaker than earthquakes. They are caused by the gravitational influence of the Earth.', 
  'There is water on the Moon! It is in the form of ice within dust and minerals on and under its surface.', 
  'The Moon is moving approximately 1.48 inches (3.8 cm) away from Earth every year.',
  'The Moon\'s distance to Earth varies. The two extreme points of the Moon\'s orbit each month are known as the lunar perigee and apogee. The Moon is closest at perigee and furthest at apogee.'
];

const INTERVAL_LENGTH = 5000;

class Moon extends Component {

  constructor() {
    super();
    const [data, options] = EarthToMoon();
    this.state = { factIndex: 0, data: data, options: options};
  }

  componentDidMount() {
    this.timeout = setInterval(() => {
      let currentIdx = this.state.factIndex;
      this.setState({ factIndex: currentIdx + 1 });
    }, INTERVAL_LENGTH);
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  render() {
    let fact = facts[this.state.factIndex % facts.length];

    return (
      <div className="Header-items">
        <Title title = {`Earth's Moon`} 
          subtitle={fact}/>
        <LineChart data={this.state.data} options={this.state.options}/>
      </div>
      );
    }

  };
  
  export default Moon;