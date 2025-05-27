import GetStyledChart from "./ChartHelper";

function SiteStats(visitors) {
  const labels = ["Earth's Moon", "Mars"];
  const values = [visitors.moonVisitors, visitors.marsVisitors];
  const data = [
    {
      values: values,
      color: "#44b2af",
      label: "# Earth Visitors",
    },
  ];

  return GetStyledChart({
    labels: labels,
    inputData: data,
    chartTitle: "",
    yLabel: "Visitors",
  });
}

export default SiteStats;
