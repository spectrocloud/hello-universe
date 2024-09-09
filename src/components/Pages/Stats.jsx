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
        if (apiConnection.uri !== "") {
            setAPIStatus({
                status: APIStatus.OK, 
                error: null,
            })
        }
        const fetchData = async () => {
            const [moonVisitors, moonErr] = await GetVisitorCount({apiConnection, page: "moon"});
            if (moonErr != null) {
                setAPIStatus({
                    status: APIStatus.Error, 
                    error: moonErr,
                })
                return;
            }

            const [marsVisitors, marsErr] = await GetVisitorCount({apiConnection: apiConnection, page: "mars"});
            if (marsErr != null) {
                setAPIStatus({
                    status: APIStatus.Error, 
                    error: marsErr,
                })
                return;
            }

            if (parseInt(marsVisitors) > parseInt(moonVisitors)) {
                setMostPopularPage("Mars");
            }

            const [data, options] = SiteStats({moonVisitors: moonVisitors, marsVisitors: marsVisitors});
            setData(data);
            setOptions(options);
        }

        // Invoke the async fetches
        fetchData();

      }, [apiConnection, setMostPopularPage])

    // data not loaded yet
    if (data == null || options == null) {
        return (
            <div className="Header-items">
                <Title title = {`Spacetastic Site Statistics`} 
                    subtitle={
                    `Here you can see how many space explorers have visited us so far.`  
                    }/>
                <APIStatusIndicator api={apiStatus} />
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