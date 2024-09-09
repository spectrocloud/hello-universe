
import GetStyledChart from "./ChartHelper";

const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const distances = new Map([
    ["Jan", [405, 362, 406]],
    ["Feb", [358, 406]],
    ["Mar", [357, 406]],
    ["Apr", [359, 405]],
    ["May", [363, 404]],
    ["Jun", [368, 404, 369]],
    ["Jul", [404, 365]],
    ["Aug", [405, 360]],
    ["Sep", [406, 357]],
    ["Oct", [406, 357, 406]],
    ["Nov", [360, 405]],
    ["Dec", [365, 404]],
]);

function getLastTwelveMonths() {
    let labels = [];
    let data = [];
    let d = new Date();
    d.setDate(1);
    for (let i=0; i<=11; i++) {
        const month = monthName[d.getMonth()];
        const monthlyDist = distances.get(month);
        monthlyDist.forEach(element => {
            labels.push(month + ' ' + d.getFullYear());
            data.push(element);
        });
        d.setMonth(d.getMonth() - 1);
    }

    // reverse to bring data back to chronologically increasing order
    return [labels.reverse(), data.reverse()];
}

function EarthToMoon() {
    const [labels, moonData] = getLastTwelveMonths();
    const data = [
        {
            values: moonData,
            color: "#72a8f5",
            label: "Distance",
        }, 
    ]

    return GetStyledChart({
        labels: labels, 
        inputData: data,
        chartTitle: 'Distance to the Moon',
        yLabel: '1000s Kilometers',
    })
}

export default EarthToMoon;