import React, {useEffect, useState} from 'react';
import Title from './Elements/Title';
import SiteStats from '../Data/SiteStats';
import BarChart from './Elements/BarChart';
import { GetVisitorCount } from "../../utilities/counters";
import {APIStatus, APIStatusIndicator} from "./Elements/APIStatus";


function Stats({apiConnection}) {
    const [data, setData] = useState(null);
    const [options, setOptions] = useState(null);
    const [mostPopularPage, setMostPopularPage] = useState("Earth's Moon");
    const [apiStatus, setAPIStatus] = useState([APIStatus.NotSet, null]);
    
    useEffect(() => {
        const [moonVisitors, moonErr] = GetVisitorCount({apiConnection: apiConnection, page: "Moon"});
        const [marsVisitors, marsErr] = GetVisitorCount({apiConnection: apiConnection, page: "Mars"});
        if (moonErr != null) {
            setAPIStatus({
                status: APIStatus.Error, 
                error: moonErr,
            })
        }
        if (marsErr != null) {
            setAPIStatus({
                status: APIStatus.Error, 
                error: marsErr,
            })
        }
        let values = {
            moonVisitors: moonVisitors,
            marsVisitors: marsVisitors,
        };
        if (values.marsVisitors > values.moonVisitors) {
            setMostPopularPage("Mars");
        }
        
        const [data, options] = SiteStats(values);
        setData(data);
        setOptions(options);
      }, [apiConnection])
    
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
            <APIStatusIndicator api={apiStatus} />
            <BarChart data={data} options={options} />
        </div>
    );
  }
  
  export default Stats;