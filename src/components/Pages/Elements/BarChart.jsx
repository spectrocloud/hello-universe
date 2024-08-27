import { Bar } from "react-chartjs-2";
/* eslint-disable no-unused-vars */
// This import is required for chart.js
import Chart, { plugins } from "chart.js/auto";

const BarChart = ({data, options}) => {
    return (
        <div className="chart-container">
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;
