import React, {useEffect, useState} from 'react';
import Title from './Elements/Title';
import SiteStats from '../Data/SiteStats';
import BarChart from './Elements/BarChart';
import { GetVisitorCount } from "../../utilities/counters";


function Stats() {
    const [data, setData] = useState(null);
    const [options, setOptions] = useState(null);
    const [mostPopularPage, setMostPopularPage] = useState("Earth's Moon")

    
    useEffect(() => {
        let values = {};
        values.moonVisitors = GetVisitorCount("Moon");
        values.marsVisitors = GetVisitorCount("Mars");
        if (values.marsVisitors > values.moonVisitors) {
            setMostPopularPage("Mars");
        }
        
        const [data, options] = SiteStats(values);
        setData(data);
        setOptions(options);
      }, [])
    
    // data not loaded yet
    if (data == null || options == null) {
        return (
            <div className="Header-items">
                <Title title = {`Spacetastic Site Statistics`} 
                    subtitle={
                    `Here you can see how many space explorers have visited us so far.`  
                    }/>
            </div>
        );
    }

    return (
        <div className="Header-items">
            <Title title = {`Spacetastic Site Statistics`} 
                subtitle={
                `Here you can see how many space explorers have visited us so far. ${mostPopularPage} is our most popular destination! 🚀`  
                }/>
            <BarChart data={data} options={options}/>
        </div>
    );
  }
  
  export default Stats;