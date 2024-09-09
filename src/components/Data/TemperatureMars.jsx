import GetStyledChart from "./ChartHelper";

const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const tempData = new Map([
    ["Jan", {high: 6, mean: -7, low: -95}],
    ["Feb", {high: 6, mean: -20, low: -127}],
    ["Mar", {high: 1, mean: -23, low: -114}],
    ["Apr", {high: 0, mean: -20, low: -97}],
    ["May", {high: 7, mean: -4, low: -98}],
    ["Jun", {high: 14, mean: 0, low: -125}],
    ["Jul", {high: 20, mean: 2, low: -84}],
    ["Aug", {high: 19, mean: 1, low: -80}],
    ["Sep", {high: 7, mean: 1, low: -78}],
    ["Oct", {high: 7, mean: 4, low: -78}],
    ["Nov", {high: 8, mean: -1, low: -83}],
    ["Dec", {high: 8, mean: -3, low: -110}],
]);

function getLastTwelveMonths() {
    let labels = [];
    let highs = [];
    let lows = [];
    let means = [];
    let d = new Date();
    d.setDate(1);
    for (let i=0; i<=11; i++) {
        const month = monthName[d.getMonth()];
        const monthlyTemp = tempData.get(month);
        labels.push(month + ' ' + d.getFullYear());
        highs.push(monthlyTemp.high)
        means.push(monthlyTemp.mean)
        lows.push(monthlyTemp.low)
        d.setMonth(d.getMonth() - 1);
    }

    // reverse to bring data back to chronologically increasing order
    return [labels.reverse(), highs.reverse(), means.reverse(), lows.reverse()];
}

function TemperatureMars() {
    const [labels, highs, means, lows] = getLastTwelveMonths();
    const data = [
        {
            values: highs,
            color: "#8B0000",
            label: "Monthly Highs",
        }, 
        {
            values: means,
            color: "#ffc832",
            label: "Monthly Means",
        }, 
        {
            values: lows,
            color: "#72a8f5",
            label: "Monthly Lows",
        }, 
    ]

    return GetStyledChart({
        labels: labels,
        inputData: data, 
        chartTitle: 'Temperature on Mars',
        yLabel: 'Degrees Celsius',
    })
}

export default TemperatureMars;