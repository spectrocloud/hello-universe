import React, { useEffect, useState } from 'react';
import { GetVisitorCount } from '../../../utilities/counters';
import "./Elements.css"

function VisitorTable() {
    const [homeVisitors, setHomeVisitors] = useState(0);
    const [moonVisitors, setMoonVisitors] = useState(0);
    const [marsVisitors, setMarsVisitors] = useState(0);
  
    useEffect(() => {
        setHomeVisitors(GetVisitorCount("Home"));
        setMoonVisitors(GetVisitorCount("Moon"));
        setMarsVisitors(GetVisitorCount("Mars"));
    }, [])

    return (
        <div className='title-container'>
            <table className="visitors-table" id="visitors">
            <tr className='visitors-table-heading'>
                <th>Page</th>
                <th># Earth Visitors</th>
            </tr>
            <tr className='visitors-table-row'>
                <td>Home</td>
                <td>{homeVisitors}</td>
            </tr>
            <tr className='visitors-table-row'>
                <td>Moon</td>
                <td>{moonVisitors}</td>
            </tr>
            <tr className='visitors-table-row'>
                <td>Mars</td>
                <td>{marsVisitors}</td>
            </tr>
        
            </table>
        </div>
    );
}

export default VisitorTable;