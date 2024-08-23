import React from "react";
import { Line } from "react-chartjs-2";
/* eslint-disable no-unused-vars */
// This import is required for char.js
import Chart, { plugins } from "chart.js/auto";
import EarthToMoon from "../../Data/EarthToMoon";

const LineChart = () => {
    const [data, options] = EarthToMoon();
    return (
        <div className="line-chart-container">
            <Line data={data} options={options} />
        </div>
    );
};
export default LineChart;