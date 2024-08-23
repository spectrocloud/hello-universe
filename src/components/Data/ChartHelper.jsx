
function GetStyledChart({labels, dataPoints, chartTitle, xLabel, yLabel}) {
    const data = {
        labels: labels,
        datasets: [
            {
                backgroundColor: "#72a8f5",
                borderColor: "#72a8f5",
                data: dataPoints,
            },
        ],
    };
    const options = { 
        plugins:{
            title: {
                display: true,
                position: 'top',
                text: chartTitle,
                color: '#72a8f5',
                font: {
                    family: 'Poppins,Arial,Helvetica,sans-serif,Russo One',
                    size: 24,
                    weight: '700',
                },
                padding: {top: 0, left: 0, right: 0, bottom: 20}
            },
            legend: {
                display: false,
                labels: {
                    font: {
                        size: 18,
                    },
                },
            },
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: xLabel,
                    color: '#9cc2f8',
                    font: {
                        family: 'Poppins,Arial,Helvetica,sans-serif,Russo One',
                        size: 20,
                        lineHeight: 1.2,
                    },
                    padding: {top: 24, left: 0, right: 0, bottom: 0}
                },
                ticks: {
                    color: '#9cc2f8',
                    font: {
                        size: 14,
                        family: 'Poppins,Arial,Helvetica,sans-serif,Russo One',
                    }
                }
            },
            y: {
                display: true,
                title: {
                display: true,
                text: yLabel,
                color: '#9cc2f8',
                font: {
                    family: 'Poppins,Arial,Helvetica,sans-serif,Russo One',
                    size: 20,
                    lineHeight: 1.2,
                },
                padding: {top: 0, left: 0, right: 0, bottom: 24}
                },
                ticks: {
                    color: '#9cc2f8',
                    font: {
                        size: 14,
                        family: 'Poppins,Arial,Helvetica,sans-serif,Russo One',
                    }
                }
            },
        },
        elements: {
            line: {
                tension: 0.5,
            }, 
            point: {
                radius: 0,
            }
        },
    };

    return [data, options];
}

export default GetStyledChart;