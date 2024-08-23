import React from 'react';
import Title from './Elements/Title';
import VisitorTable from './Elements/VisitorTable';

function Stats() {

    return (
    <div className="Header-items">
    <Title title = {`Spacetastic Site Statistics`} 
        subtitle={
        `Here you can see how many space explorers visit the site.`  
        }/>
    <VisitorTable />
    </div>
    );

  }
  
  export default Stats;