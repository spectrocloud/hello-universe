import React, { Component } from 'react';
import Title from './Elements/Title';
import TemperatureMars from '../Data/TemperatureMars'
import LineChart from './Elements/LineChart';

const facts = [
  'Mars is about half the size of Earth. If Earth were the size of a nickel, Mars would be about as big as a raspberry.', 
  'NASA missions have found evidence that Mars was much wetter and warmer, with a thicker atmosphere, billions of years ago. Life on Mars could have existed in those conditions!', 
  'Mars\' signature colour comes from the large amount of iron oxide, or rust as you might know it, in its rocks and soil.', 
  'Mars is home to the highest mountain in our solar system, a volcano called Olympus Mons. It\'s about three times the height of Mount Everest!', 
  'A year on Mars lasts 687 Earth days! This is because Mars take a lot longer than Earth to complete its orbit around the Sun.',
  'Mars is one of the most explored planets in our solar system, and it\'s the only planet where we\'ve sent rovers to roam the alien landscape.', 
  'Mars has two moons, Phobos and Deimos.',
];

const INTERVAL_LENGTH = 5000;

class Mars extends Component {
  
  constructor() {
    super();
    this.state = { factIndex: 0 };
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
    const [data, options] = TemperatureMars();

    return (
      <div className="Header-items">
        <Title title = {`Mars`} 
          subtitle={fact}/>
        <LineChart data={data} options={options}/>
      </div>
      );
    }
  };
  
  export default Mars;